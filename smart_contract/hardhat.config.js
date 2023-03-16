
// https://eth-goerli.g.alchemy.com/v2/MpNtpYFS43jEbYDt-yUkzKfZZjQ63Krp

require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {

  solidity: "0.8.0",
  networks:{
    goerli:{
      url:'https://eth-goerli.g.alchemy.com/v2/MpNtpYFS43jEbYDt-yUkzKfZZjQ63Krp',
      account: ['839594b560aba5fa37e0ca01a53547133fba1468cd4169dbda23859524b7dd65']
    }
  }
};
