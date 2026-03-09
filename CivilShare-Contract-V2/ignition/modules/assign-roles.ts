import { ethers } from 'hardhat';

async function main() {
  const civilShareAddress = '0xYourDeployedContract';
  const gnosisSafe = '0xfE305D245EE604d9b97066cb02098374436f64a8';
  const governorAddress = '0xYourGovernorContract';

  const civilShare = await ethers.getContractAt(
    'CivilShare',
    civilShareAddress
  );

  const ADMIN_ROLE = await civilShare.ADMIN_ROLE();
  const DAO_ROLE = await civilShare.DAO_ROLE();

  console.log('Granting ADMIN_ROLE to Gnosis Safe...');
  const tx1 = await civilShare.grantRole(ADMIN_ROLE, gnosisSafe);
  await tx1.wait();

  console.log('Granting DAO_ROLE to Governor...');
  const tx2 = await civilShare.grantRole(DAO_ROLE, governorAddress);
  await tx2.wait();

  const [deployer] = await ethers.getSigners();
  console.log('Revoking ADMIN_ROLE from deployer (optional)...');
  const tx3 = await civilShare.revokeRole(ADMIN_ROLE, deployer.address);
  await tx3.wait();

  console.log('✅ Role migration complete.');
}

main().catch((error) => {
  console.error('❌ Role migration failed:', error);
  process.exitCode = 1;
});
