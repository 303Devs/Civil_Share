import { ethers } from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import "@nomicfoundation/hardhat-chai-matchers";

chai.use(chaiAsPromised);
import { expect } from "chai";
// import { CivilShare } from "../typechain-types";

describe("CivilShare", function () {
  let civilShare: any;

  beforeEach(async function () {
    const CivilShare = await ethers.getContractFactory("CivilShare");
    civilShare = await CivilShare.deploy();
    await civilShare.waitForDeployment();
  });

  describe("Deployment", function () {
    it("should deploy and set the correct admin role", async function () {
      const [deployer] = await ethers.getSigners();
      const hasAdminRole = await civilShare.hasRole(await civilShare.ADMIN_ROLE(), deployer.address);
      expect(hasAdminRole).to.be.true;
    });

    it("should start unpaused", async function () {
      expect(await civilShare.paused()).to.be.false;
    });
  });

  describe("Campaign Creation", function () {
    it("should create a new campaign with valid data", async function () {
      const [deployer] = await ethers.getSigners();

      const tx = await civilShare.createCampaign(
        deployer.address,
        "Test Campaign",
        "This is a test campaign.",
        ethers.parseEther("1"),
        Math.floor(Date.now() / 1000) + 86400, // deadline: +1 day
        "https://example.com/image.png",
        "TestCategory",
        "https://example.com/metadata.json",
        false,
        []
      );

      await tx.wait();

      const campaign = await civilShare.campaigns(0);
      expect(campaign.title).to.equal("Test Campaign");
      expect(campaign.owner).to.equal(deployer.address);
    });

    it("should revert if title is empty", async function () {
      const [deployer] = await ethers.getSigners();

      await expect(
        civilShare.createCampaign(
          deployer.address,
          "",
          "Missing title",
          ethers.parseEther("1"),
          Math.floor(Date.now() / 1000) + 86400,
          "https://example.com/image.png",
          "TestCategory",
          "https://example.com/metadata.json",
          false,
          []
        )
      ).to.be.revertedWith("Title is required.");
    });
  });

  describe("ETH Donations", function () {
    it("should accept ETH donations for active campaigns", async function () {
      const [deployer, donor] = await ethers.getSigners();

      await civilShare.createCampaign(
        deployer.address,
        "Donation Campaign",
        "Accept ETH",
        ethers.parseEther("1"),
        Math.floor(Date.now() / 1000) + 86400,
        "https://example.com/image.png",
        "Category",
        "https://example.com/metadata.json",
        false,
        []
      );

      await civilShare.connect(donor).donateWithEth(0, { value: ethers.parseEther("0.5") });

      const campaign = await civilShare.campaigns(0);
      expect(campaign.amountCollected).to.equal(ethers.parseEther("0.5"));
    });

    it("should revert if donating to an inactive campaign", async function () {
      const [deployer, donor] = await ethers.getSigners();

      await civilShare.createCampaign(
        deployer.address,
        "Inactive Campaign",
        "This one will be inactive",
        ethers.parseEther("1"),
        Math.floor(Date.now() / 1000) + 86400,
        "https://example.com/image.png",
        "Category",
        "https://example.com/metadata.json",
        false,
        []
      );

      await civilShare.deactivateCampaign(0);

      await expect(
        civilShare.connect(donor).donateWithEth(0, { value: ethers.parseEther("0.1") })
      ).to.be.revertedWith("Campaign is not active.");
    });
  });

  describe("Refunds", function () {
    it("should allow refund after deactivation for escrowed ETH", async function () {
      const [deployer, donor] = await ethers.getSigners();

      await civilShare.createCampaign(
        deployer.address,
        "Escrow Campaign",
        "ETH held in escrow",
        ethers.parseEther("1"),
        Math.floor(Date.now() / 1000) + 86400,
        "https://example.com/image.png",
        "Refundable",
        "https://example.com/metadata.json",
        true,
        []
      );

      await civilShare.connect(donor).donateWithEth(0, { value: ethers.parseEther("0.5") });

      await civilShare.deactivateCampaign(0);

      const tx = await civilShare.connect(donor).claimEthRefund(0);
      await tx.wait();

      const refund = await civilShare.ethRefunds(0, donor.address);
      expect(refund).to.equal(0);
    });

    it("should revert if trying to claim a refund twice", async function () {
      const [deployer, donor] = await ethers.getSigners();

      await civilShare.createCampaign(
        deployer.address,
        "One-Time Refund",
        "Test double refund prevention",
        ethers.parseEther("1"),
        Math.floor(Date.now() / 1000) + 86400,
        "https://example.com/image.png",
        "Refund",
        "https://example.com/metadata.json",
        true,
        []
      );

      await civilShare.connect(donor).donateWithEth(0, { value: ethers.parseEther("0.3") });
      await civilShare.deactivateCampaign(0);

      await civilShare.connect(donor).claimEthRefund(0);

      await expect(
        civilShare.connect(donor).claimEthRefund(0)
      ).to.be.revertedWith("No refund available.");
    });
  });

  describe("Milestones", function () {
    it("should release milestone ETH when goal is met", async function () {
      const [deployer, donor] = await ethers.getSigners();

      await civilShare.createCampaign(
        deployer.address,
        "Milestone Campaign",
        "Campaign with milestone payouts",
        ethers.parseEther("1"),
        Math.floor(Date.now() / 1000) + 86400,
        "https://example.com/image.png",
        "Milestones",
        "https://example.com/metadata.json",
        true,
        []
      );

      // Add one milestone
      await civilShare.addMilestone(0, "Milestone 1", ethers.parseEther("0.5"));

      // Fund it with enough ETH
      await civilShare.connect(donor).donateWithEth(0, { value: ethers.parseEther("0.5") });

      // Attempt to claim the milestone
      const tx = await civilShare.claimMilestone(0);
      await tx.wait();

      const milestone = await civilShare.getMilestone(0, 0);
      expect(milestone.isReleased).to.be.true;
    });

    it("should revert if milestone funds are not yet reached", async function () {
      const [deployer, donor] = await ethers.getSigners();

      await civilShare.createCampaign(
        deployer.address,
        "Unfunded Milestone",
        "Should not be able to claim yet",
        ethers.parseEther("1"),
        Math.floor(Date.now() / 1000) + 86400,
        "https://example.com/image.png",
        "Milestones",
        "https://example.com/metadata.json",
        true,
        []
      );

      await civilShare.addMilestone(0, "Milestone A", ethers.parseEther("0.8"));

      await civilShare.connect(donor).donateWithEth(0, { value: ethers.parseEther("0.3") });

      await expect(
        civilShare.claimMilestone(0)
      ).to.be.revertedWith("Not enough funds for milestone.");
    });
  });

  describe("Admin Functions", function () {
    it("should allow ADMIN_ROLE to pause and unpause", async function () {
      const [admin] = await ethers.getSigners();

      await civilShare.connect(admin).togglePause();
      expect(await civilShare.paused()).to.be.true;

      await civilShare.connect(admin).togglePause();
      expect(await civilShare.paused()).to.be.false;
    });

    it("should revert if non-admin tries to pause", async function () {
      const [, nonAdmin] = await ethers.getSigners();

      await expect(
        civilShare.connect(nonAdmin).togglePause()
      ).to.be.revertedWith("Missing role");
    });

    it("should allow ADMIN_ROLE to set allowed tokens", async function () {
      const [admin, tokenOwner] = await ethers.getSigners();

      const TestToken = await ethers.getContractFactory("MockERC20");
      const token = await TestToken.connect(tokenOwner).deploy("TestToken", "TTK", 18);
      await token.waitForDeployment();

      await civilShare.connect(admin).setAllowedToken(await token.getAddress(), true);
      const isAllowed = await civilShare.allowedTokens(await token.getAddress());
      expect(isAllowed).to.be.true;
    });
  });

  describe("Upvotes", function () {
    it("should allow one upvote per user", async function () {
      const [deployer] = await ethers.getSigners();

      await civilShare.createCampaign(
        deployer.address,
        "Upvote Campaign",
        "Upvote test",
        ethers.parseEther("1"),
        Math.floor(Date.now() / 1000) + 86400,
        "https://image.com",
        "Category",
        "https://meta.com",
        false,
        []
      );

      await civilShare.upvoteCampaign(0);

      await expect(civilShare.upvoteCampaign(0)).to.be.revertedWith("Already upvoted");
    });
  });

  describe("Views & Pagination", function () {
    it("should return stats and allowed tokens", async function () {
      const [deployer] = await ethers.getSigners();

      const TestToken = await ethers.getContractFactory("MockERC20");
      const token = await TestToken.deploy("Token", "TKN", 18);
      await token.waitForDeployment();

      await civilShare.setAllowedToken(await token.getAddress(), true);

      const stats = await civilShare.getStats();
      expect(stats.totalCampaigns).to.be.gte(0);
      expect(stats.totalETH).to.be.gte(0);
      expect(stats.totalTx).to.be.gte(0);

      const allowed = await civilShare.getAllowedTokens();
      expect(allowed).to.include(await token.getAddress());
    });
  });

  describe("Upgradeability", function () {
    it("should restrict _authorizeUpgrade to ADMIN_ROLE", async function () {
      const [, user] = await ethers.getSigners();
      await expect(
        civilShare.connect(user).upgradeTo(await civilShare.getAddress())
      ).to.be.revertedWith("AccessControl: account");
    });
  });
});