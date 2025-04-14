/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork: 'base',
    networks: {
      hardhat: {},
      base: {
        url: 'https://rpc.ankr.com/base/0b15171368f7e85296ec4531e972f15ab0674bcfa55164af7f86e78f05dd7e37',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
