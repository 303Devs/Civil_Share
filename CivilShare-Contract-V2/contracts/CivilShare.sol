// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract CivilShare is Initializable, AccessControlUpgradeable, ReentrancyGuardUpgradeable, UUPSUpgradeable {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant DAO_ROLE = keccak256("DAO_ROLE");
    uint16 public upvoteThreshold;
    uint256 public campaignCreationCooldown;
    address public trustedForwarder;


    enum CampaignStatus { Inactive, Active, Completed, Verified }
    struct Campaign {
        uint256 id;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        uint256 createdAt;
        uint256 nextMilestoneIndex;
        uint256 ethEscrowed;
        uint256 donationCount;
        address owner;
        CampaignStatus status;
        bool isEscrow;
        address[] acceptedTokens;
        string title;
        string description;
        string image;
        string category;
        string metadataURI;
    }
    // Mapping from campaignId => donor => donation amount
    mapping(uint256 => mapping(address => uint256)) public campaignDonations;

    struct Milestone {
        string name;
        uint256 amount;
        bool isReleased;
    }

    mapping(uint256 => Milestone[]) public campaignMilestones;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => bool) public campaignExists;
    mapping(address => uint256) public lastCreated;
    mapping(address => uint256[]) public userCampaigns;
    // mapping(address => uint256) public totalDonated; // removed
    uint256 public totalAmountDonated;
    // uint256 public totalDonationCount; // removed
    mapping(address => bool) public allowedTokens;
    mapping(uint256 => mapping(address => bool)) public campaignAllowedTokens;
    mapping(uint256 => mapping(address => uint256)) public tokenEscrowed;
    mapping(uint256 => mapping(address => uint256)) public tokenAmountCollected;
    mapping(uint256 => mapping(address => mapping(address => uint256))) public refunds;
    mapping(uint256 => mapping(address => uint256)) public ethRefunds;
    uint256 public numberOfCampaigns = 0;

    mapping(uint256 => address) public topDonors;
    mapping(uint256 => uint256) public topDonationAmount;
    mapping(uint256 => uint256) public upvotes;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    bool public paused;

    // mapping(address => mapping(address => uint256)) public tokenDonated; // removed
    // mapping(address => uint256) public tokenTotalDonated; // removed
    mapping(uint256 => mapping(address => bool)) public isCampaignDonor;
    mapping(uint256 => mapping(address => bool)) public hasDonatedToCampaign;

    event CampaignCreated(uint256 id, address indexed owner);
    event ETHDonationReceived(uint256 indexed id, address indexed donor, uint256 amount);
    event TreasuryTokenDonation(address indexed donor, address indexed token, uint256 amount);
    event CampaignTokenDonation(uint256 indexed id, address indexed donor, address indexed token, uint256 amount);
    event CampaignDeactivated(uint256 id);
    event CampaignVerified(uint256 id); // Added CampaignVerified event
    event CampaignDeactivatedWithRefund(uint256 id, address donor, uint256 amount);
    event MilestoneReleased(uint256 campaignId, uint256 milestoneIndex, uint256 amount);
    event CampaignWithdrawn(uint256 id, uint256 amount);
    event TreasuryWithdrawn(address to, uint256 amount);
    event CampaignCompleted(uint256 indexed id);
    event PausedToggled(bool isPaused);
    event TokenAllowlistUpdated(address indexed token, bool isAllowed);
    event TrustedForwarderUpdated(address indexed forwarder);
    event RefundClaimed(uint256 indexed id, address indexed user, uint256 amount);
    event CampaignUpvoted(uint256 indexed id, address indexed voter, uint256 newTotal);
    event ETHRefundClaimed(uint256 indexed campaignId, address indexed user, uint256 amount);
    event TokenRefundClaimed(uint256 indexed campaignId, address indexed user, address indexed token, uint256 amount);
    event MilestoneETHReleased(uint256 indexed campaignId, uint256 indexed milestoneIndex, uint256 amount);
    event MilestoneTokenReleased(uint256 indexed campaignId, uint256 indexed milestoneIndex, address indexed token, uint256 amount);
    event CampaignETHWithdrawn(uint256 indexed campaignId, uint256 amount);
    event CampaignTokenWithdrawn(uint256 indexed campaignId, address indexed token, uint256 amount);
    event Donated(uint256 indexed campaignId, address indexed donor, uint256 amount, address token, bool isEth);

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    function initialize() public initializer {
        __AccessControl_init();
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(DAO_ROLE, msg.sender);
        upvoteThreshold = 100;
        campaignCreationCooldown = 1 days;
    }

    function setCampaignCreationCooldown(uint256 _seconds) public onlyRole(DAO_ROLE) {
        require(_seconds > 0, "Cooldown must be greater than 0");
        campaignCreationCooldown = _seconds;
    }

    function setUpvoteThreshold(uint16 newThreshold) public onlyRole(DAO_ROLE) {
        require(newThreshold > 0, "Threshold must be positive");
        upvoteThreshold = newThreshold;
    }

    function setTrustedForwarder(address _forwarder) public onlyRole(ADMIN_ROLE) {
        trustedForwarder = _forwarder;
        emit TrustedForwarderUpdated(_forwarder);
    }

    function togglePause() public {
        require(
            hasRole(ADMIN_ROLE, msg.sender) || hasRole(DAO_ROLE, msg.sender),
            "Missing role"
        );
        paused = !paused;
        emit PausedToggled(paused);
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image,
        string memory _category,
        string memory _metadataURI,
        bool _isEscrow,
        address[] memory _acceptedTokens
    ) public whenNotPaused returns (uint256) {
        require(block.timestamp - lastCreated[_owner] > campaignCreationCooldown, "You can only create one campaign per cooldown period.");
        require(bytes(_title).length > 0, "Title is required.");
        require(bytes(_description).length > 0, "Description is required.");
        require(_target > 0, "Target must be greater than 0.");
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");
        require(bytes(_image).length > 0, "Image is required.");
        require(bytes(_category).length > 0, "Category is required.");

        uint256 campaignId = numberOfCampaigns;
        Campaign storage campaign = campaigns[campaignId];

        campaign.id = campaignId;
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.category = _category;
        campaign.metadataURI = _metadataURI;
        campaign.isEscrow = _isEscrow;
        campaign.createdAt = block.timestamp;
        campaign.status = CampaignStatus.Active;
        campaign.nextMilestoneIndex = 0;

        userCampaigns[_owner].push(campaignId);
        campaignExists[campaignId] = true;
        lastCreated[_owner] = block.timestamp;
        for (uint i = 0; i < _acceptedTokens.length; i++) {
            require(allowedTokens[_acceptedTokens[i]], "Token not globally allowed");
            campaignAllowedTokens[campaignId][_acceptedTokens[i]] = true;
            campaign.acceptedTokens.push(_acceptedTokens[i]);
        }
        emit CampaignCreated(campaignId, _owner);
        numberOfCampaigns++;

        return campaignId;
    }

    function donateWithEth(uint256 _id) public payable whenNotPaused nonReentrant {
        uint256 campaignId = _id;
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[campaignId];
        mapping(address => uint256) storage campaignDonorAmounts = campaignDonations[campaignId];

        require(campaign.status == CampaignStatus.Active, "Campaign is not active.");
        require(campaign.deadline > block.timestamp, "Campaign has expired.");

        // Removed donor tracking logic (campaignDonors)
        campaignDonorAmounts[msg.sender] += amount;
        if (!hasDonatedToCampaign[campaignId][msg.sender]) {
            hasDonatedToCampaign[campaignId][msg.sender] = true;
        }
        // Removed global stats aggregation for donation count and totalDonated[msg.sender]

        if (campaign.isEscrow) {
            campaign.amountCollected += amount;
            campaign.ethEscrowed += amount;
        } else {
            (bool sent,) = payable(campaign.owner).call{value: amount}("");
            require(sent, "Direct donation failed");
            campaign.amountCollected += amount;
        }

        unchecked {
            campaign.donationCount++;
            totalAmountDonated += amount;
        }
        emit ETHDonationReceived(campaignId, msg.sender, amount);
        emit Donated(campaignId, msg.sender, amount, address(0), true);

        if (campaign.isEscrow) {
            for (uint i = campaign.nextMilestoneIndex; i < campaignMilestones[campaignId].length;) {
                Milestone storage m = campaignMilestones[campaignId][i];
                if (!m.isReleased && campaign.amountCollected >= m.amount) {
                    m.isReleased = true;
                    (bool success,) = payable(campaign.owner).call{value: m.amount}("");
                    require(success, "Milestone payout failed");
                    campaign.amountCollected -= m.amount;
                    campaign.ethEscrowed -= m.amount;
                    campaign.nextMilestoneIndex++;
                    emit MilestoneETHReleased(campaignId, i, m.amount);
                } else {
                    break;
                }
                unchecked { i++; }
            }
        }
    }

    function validateMetadataURI(uint256 id, bytes32 expectedHash) public view returns (bool) {
        require(campaignExists[id], "Campaign does not exist.");
        return keccak256(abi.encodePacked(campaigns[id].metadataURI)) == expectedHash;
    }

    // getDonators and getDonatorsPaginated removed; donor data is now off-chain via events.

    function getCampaignById(uint256 _id) external view returns (Campaign memory) {
        require(campaignExists[_id], "Campaign does not exist.");
        return campaigns[_id];
    }

    function getActiveCampaigns(uint256 start, uint256 end) public view returns (Campaign[] memory) {
        require(end > start && end <= numberOfCampaigns, "Invalid range");
        Campaign[] memory temp = new Campaign[](end - start);
        uint256 count = 0;
        for (uint i = start; i < end;) {
            if (campaigns[i].deadline > block.timestamp && campaigns[i].status == CampaignStatus.Active) {
                temp[count] = campaigns[i];
                count++;
            }
            unchecked { i++; }
        }
        Campaign[] memory result = new Campaign[](count);
        for (uint i = 0; i < count;) {
            result[i] = temp[i];
            unchecked { i++; }
        }
        return result;
    }

    function getExpiredCampaigns(uint256 start, uint256 end) public view returns (Campaign[] memory) {
        require(end > start && end <= numberOfCampaigns, "Invalid range");
        Campaign[] memory temp = new Campaign[](end - start);
        uint256 count = 0;
        for (uint i = start; i < end;) {
            if (campaigns[i].deadline <= block.timestamp && campaigns[i].status == CampaignStatus.Active) {
                temp[count] = campaigns[i];
                count++;
            }
            unchecked { i++; }
        }
        Campaign[] memory result = new Campaign[](count);
        for (uint i = 0; i < count;) {
            result[i] = temp[i];
            unchecked { i++; }
        }
        return result;
    }

    function deactivateCampaign(uint256 _id) public {
        require(campaignExists[_id], "Campaign does not exist.");
        Campaign storage campaign = campaigns[_id];

        require(
            msg.sender == campaign.owner || hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized"
        );

        if (campaign.isEscrow && campaign.amountCollected > 0 && campaign.status != CampaignStatus.Completed) {
            // Mark campaign as completed; refunds can be claimed via claimRefund/claimTokenRefund
            campaign.status = CampaignStatus.Completed;
        } else {
            campaign.status = CampaignStatus.Inactive;
        }

        emit CampaignDeactivated(_id);
    }

    function markAsCompleted(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(campaign.status == CampaignStatus.Active, "Campaign is not active.");
        require(campaign.status != CampaignStatus.Completed, "Campaign already completed.");
        require(campaign.amountCollected >= campaign.target, "Target not yet met.");
        campaign.status = CampaignStatus.Completed;
        emit CampaignCompleted(_id);
    }

    function getCompletedCampaigns(uint256 start, uint256 end) public view returns (Campaign[] memory) {
        require(end > start && end <= numberOfCampaigns, "Invalid range");
        Campaign[] memory temp = new Campaign[](end - start);
        uint256 count = 0;
        for (uint i = start; i < end;) {
            if (campaigns[i].status == CampaignStatus.Completed) {
                temp[count] = campaigns[i];
                count++;
            }
            unchecked { i++; }
        }
        Campaign[] memory result = new Campaign[](count);
        for (uint i = 0; i < count;) {
            result[i] = temp[i];
            unchecked { i++; }
        }
        return result;
    }

    function getUserCampaigns(address _user) external view returns (Campaign[] memory) {
        uint256[] memory userIds = userCampaigns[_user];
        Campaign[] memory result = new Campaign[](userIds.length);

        for (uint i = 0; i < userIds.length;) {
            result[i] = campaigns[userIds[i]];
            unchecked { i++; }
        }

        return result;
    }

    function getLastCreated(address _user) external view returns (uint256) {
        return lastCreated[_user];
    }

    function getCampaignRange(uint256 start, uint256 end) external view returns (Campaign[] memory) {
        require(end > start, "End index must be greater than start");
        require(end <= numberOfCampaigns, "End index out of bounds");

        Campaign[] memory range = new Campaign[](end - start);
        uint256 index = 0;
        for (uint256 i = start; i < end;) {
            range[index] = campaigns[i];
            index++;
            unchecked { i++; }
        }

        return range;
    }

    function upvote(uint256 _id) public {
        require(!hasVoted[_id][msg.sender], "Already voted");
        hasVoted[_id][msg.sender] = true;
        upvotes[_id]++;
        emit CampaignUpvoted(_id, msg.sender, upvotes[_id]);
        
        // Auto-verification logic
        if (upvotes[_id] >= upvoteThreshold && campaigns[_id].status != CampaignStatus.Verified) {
            campaigns[_id].status = CampaignStatus.Verified;
            emit CampaignVerified(_id);
        }
    }

    function getStats() public view returns (
        uint256 totalCampaigns,
        uint256 totalETH
    ) {
        return (numberOfCampaigns, totalAmountDonated);
    }

    function setAllowedToken(address token, bool isAllowed) public {
        require(
            hasRole(ADMIN_ROLE, msg.sender) || hasRole(DAO_ROLE, msg.sender),
            "Missing role"
        );
        allowedTokens[token] = isAllowed;
        emit TokenAllowlistUpdated(token, isAllowed);
    }


    function donateWithToken(uint256 _id, address tokenAddress, uint256 amount) public whenNotPaused nonReentrant {
        require(campaignExists[_id], "Campaign does not exist.");
        Campaign storage campaign = campaigns[_id];
        require(campaign.status == CampaignStatus.Active, "Campaign is not active.");
        require(campaign.deadline > block.timestamp, "Campaign has expired.");
        require(allowedTokens[tokenAddress], "Token not supported");
        require(campaignAllowedTokens[_id][tokenAddress], "Token not accepted by this campaign");

        IERC20 token = IERC20(tokenAddress);
        bool success = token.transferFrom(msg.sender, address(this), amount);
        require(success, "Token transfer failed");

        // Note: token amounts are not normalized by decimals. Frontend should handle this for accurate display.
        _trackTokenDonation(_id, msg.sender, tokenAddress, amount);

        if (campaign.isEscrow) {
            _handleTokenMilestones(_id, tokenAddress, campaign, campaignMilestones[_id]);
        }
    }


    function donateTokenToTreasury(address token, uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        require(allowedTokens[token], "Token not allowed");
        bool success = IERC20(token).transferFrom(msg.sender, address(this), amount);
        require(success, "Token transfer failed");
        emit TreasuryTokenDonation(msg.sender, token, amount);
    }

    function withdrawCampaignFunds(uint256 _id, address token) public nonReentrant {
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.owner, "Only owner can withdraw");
        if (token == address(0)) {
            uint256 amount = campaign.ethEscrowed;
            require(amount > 0, "No ETH to withdraw");
            campaign.ethEscrowed = 0;
            (bool sent, ) = payable(msg.sender).call{value: amount}("");
            require(sent, "Withdraw failed");
            emit CampaignETHWithdrawn(_id, amount);
        } else {
            uint256 tokenAmount = tokenEscrowed[_id][token];
            require(tokenAmount > 0, "No token to withdraw");
            tokenEscrowed[_id][token] = 0;
            IERC20(token).transfer(msg.sender, tokenAmount);
            emit CampaignTokenWithdrawn(_id, token, tokenAmount);
        }
    }

    function withdrawTreasuryBalance(address payable to, address token, uint256 amount) public nonReentrant {
        require(
            hasRole(ADMIN_ROLE, msg.sender) || hasRole(DAO_ROLE, msg.sender),
            "Missing role"
        );
        if (token == address(0)) {
            require(amount <= address(this).balance, "Insufficient ETH balance");
            (bool sent, ) = to.call{value: amount}("");
            require(sent, "ETH withdraw failed");
            emit TreasuryWithdrawn(to, amount);
        } else {
            IERC20(token).transfer(to, amount);
            emit TreasuryWithdrawn(to, amount);
        }
    }

    function verifyCampaign(uint256 _id) external {
        require(
            hasRole(ADMIN_ROLE, msg.sender) || hasRole(DAO_ROLE, msg.sender),
            "Missing role"
        );
        require(campaignExists[_id], "Campaign does not exist.");
        campaigns[_id].status = CampaignStatus.Verified;
        emit CampaignVerified(_id);
    }

    function getAllowedTokens() public view returns (address[] memory) {
        uint256 count = 0;
        address[] memory all = new address[](numberOfCampaigns * 5); // estimated upper bound
        for (uint i = 0; i < numberOfCampaigns;) {
            address[] memory tokens = campaigns[i].acceptedTokens;
            for (uint j = 0; j < tokens.length;) {
                address token = tokens[j];
                if (allowedTokens[token]) {
                    all[count] = token;
                    count++;
                }
                unchecked { j++; }
            }
            unchecked { i++; }
        }
        address[] memory result = new address[](count);
        for (uint i = 0; i < count;) {
            result[i] = all[i];
            unchecked { i++; }
        }
        return result;
    }

    function claimRefund(uint256 _id) public nonReentrant {
        uint256 refund = ethRefunds[_id][msg.sender];
        require(refund > 0, "No refund available");
        ethRefunds[_id][msg.sender] = 0;
        (bool sent,) = payable(msg.sender).call{value: refund}("");
        require(sent, "Refund failed");
        emit ETHRefundClaimed(_id, msg.sender, refund);
    }

    function claimTokenRefund(uint256 _id, address token) public nonReentrant {
        uint256 refund = refunds[_id][msg.sender][token];
        require(refund > 0, "No refund available");
        refunds[_id][msg.sender][token] = 0;
        IERC20(token).transfer(msg.sender, refund);
        emit TokenRefundClaimed(_id, msg.sender, token, refund);
    }

    function claimMilestone(uint256 campaignId, uint256 milestoneIndex) public nonReentrant {
        Campaign storage campaign = campaigns[campaignId];
        require(msg.sender == campaign.owner, "Only owner can claim");
        require(campaign.isEscrow, "Not an escrow campaign");

        Milestone storage m = campaignMilestones[campaignId][milestoneIndex];
        require(!m.isReleased, "Already released");
        require(campaign.amountCollected >= m.amount, "Insufficient funds");

        m.isReleased = true;
        campaign.amountCollected -= m.amount;
        campaign.ethEscrowed -= m.amount;
        campaign.nextMilestoneIndex++;

        (bool sent,) = payable(campaign.owner).call{value: m.amount}("");
        require(sent, "Milestone payout failed");

        emit MilestoneETHReleased(campaignId, milestoneIndex, m.amount);
    }

    function claimMilestoneToken(uint256 campaignId, uint256 milestoneIndex, address token) public nonReentrant {
        Campaign storage campaign = campaigns[campaignId];
        require(msg.sender == campaign.owner, "Only owner can claim");
        require(campaign.isEscrow, "Not an escrow campaign");

        Milestone storage m = campaignMilestones[campaignId][milestoneIndex];
        require(!m.isReleased, "Already released");
        require(tokenEscrowed[campaignId][token] >= m.amount, "Insufficient token funds");

        m.isReleased = true;
        tokenEscrowed[campaignId][token] -= m.amount;
        tokenAmountCollected[campaignId][token] -= m.amount;
        campaign.nextMilestoneIndex++;

        IERC20(token).transfer(campaign.owner, m.amount);
        emit MilestoneTokenReleased(campaignId, milestoneIndex, token, m.amount);
    }

    // Internal helper to handle token milestone releases for escrow campaigns
    function _handleTokenMilestones(
        uint256 campaignId,
        address tokenAddress,
        Campaign storage campaign,
        Milestone[] storage milestones
    ) internal {
        for (uint i = campaign.nextMilestoneIndex; i < milestones.length;) {
            Milestone storage m = milestones[i];
            if (!m.isReleased && tokenEscrowed[campaignId][tokenAddress] >= m.amount) {
                m.isReleased = true;
                IERC20(tokenAddress).transfer(campaign.owner, m.amount);
                tokenEscrowed[campaignId][tokenAddress] -= m.amount;
                tokenAmountCollected[campaignId][tokenAddress] -= m.amount;
                campaign.nextMilestoneIndex++;
                emit MilestoneTokenReleased(campaignId, i, tokenAddress, m.amount);
            } else {
                break;
            }
            unchecked { i++; }
        }
    }

    function _trackTokenDonation(
        uint256 _id,
        address donor,
        address token,
        uint256 amount
    ) private {
        tokenEscrowed[_id][token] += amount;
        tokenAmountCollected[_id][token] += amount;
        campaignDonations[_id][donor] += amount;

        if (!hasDonatedToCampaign[_id][donor]) {
            hasDonatedToCampaign[_id][donor] = true;
        }

        unchecked {
            campaigns[_id].donationCount++;
        }

        uint256 total = campaignDonations[_id][donor];
        if (total > topDonationAmount[_id]) {
            topDonationAmount[_id] = total;
            topDonors[_id] = donor;
        }

        emit CampaignTokenDonation(_id, donor, token, amount);
        emit Donated(_id, donor, amount, token, false);
    }

    function _msgSender() internal view override returns (address sender) {
        if (msg.sender == trustedForwarder) {
            assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 20)))
            }
        } else {
            sender = msg.sender;
        }
    }

    // Storage gap for upgradeability
    uint256[50] private __gap;

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(ADMIN_ROLE) {}

    // function getTokenTotalDonated(address token) external view returns (uint256) {
    //     return tokenTotalDonated[token];
    // }
    
    receive() external payable {}
    fallback() external payable {}

    function getTotalDonatedForCampaign(uint256 id) external view returns (
        uint256 eth,
        address[] memory tokens,
        uint256[] memory amounts
    ) {
        require(campaignExists[id], "Campaign does not exist.");
        Campaign storage campaign = campaigns[id];
        eth = campaign.amountCollected;

        address[] memory tokenList = campaign.acceptedTokens;
        uint256[] memory tokenValues = new uint256[](tokenList.length);
        for (uint i = 0; i < tokenList.length;) {
            tokenValues[i] = tokenAmountCollected[id][tokenList[i]];
            unchecked { i++; }
        }

        return (eth, tokenList, tokenValues);
    }
}