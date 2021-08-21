require("@nomiclabs/hardhat-waffle");

require("solidity-coverage");

const fs = require('fs');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const mnemonic = fs.existsSync('./.mnemonic') ? fs.readFileSync('./.mnemonic', 'utf-8').trim() : ''
if (!mnemonic)
  console.log('Missing mnemonic')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.16"
      },
      {
        version: "0.6.4"
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      },
      {
        version: "0.6.11"
      },
      {
        version: "0.6.12"
      },
      {
        version: "0.7.4"
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      }
    ],
    overrides: {
      "contracts/Airdrop.sol": {
        version: "0.8.0",
        settings: {}
      }
    }
  },
  networks: {
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      // gasPrice: 225000000000,
      chainId: 43113,
      accounts: {
        mnemonic
      },
    },
  },
  namedAccounts: {
    deployer: {
      fuji: '0x3b69b2ADCbF43DbaBdF6A14634045b5035Db188C',
    },
    devTeam: {
      fuji: '0x7198c0F3b129e4220E5bFfc5579Aab07016a02CE',
    }
  }
};
