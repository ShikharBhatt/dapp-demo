require('dotenv').config({path: '.env'});
require("@nomiclabs/hardhat-ethers");

module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}