const HDWalletProvider = require('@truffle/hdwallet-provider')
const fs = require('fs')

const NETWORK = {
    ETHMAINET: 'ETHMAINET',
    RINKEBY: 'RINKEBY'
}

// Is production
const IS_PRODUCTION = false

const PROVIDER = {
    ['ETHMAINET']: 'https://mainnet.infura.io/v3/7ed0fdf273014d3a87102e0cf6df5d90',
    ['RINKEBY']: 'https://rinkeby.infura.io/v3/7ed0fdf273014d3a87102e0cf6df5d90'
}

// Danger zone
const MNEMONIC = '../mnemonic'

// Utilities
function safeReadFile(path) {
    try {
        return fs.readFileSync(path, 'utf8').trim()
    } catch (error) {
        console.error('An error occurred in safeReadFile("' + path + '"):\n', error)
    }
}

function getProvider(network) {
    const devMnemonic = safeReadFile(MNEMONIC)
    console.log('Dev mnemonic OK:', devMnemonic != undefined)

    return new HDWalletProvider(devMnemonic, PROVIDER[network])
}

// Export
module.exports = {
    CHAIN_ID,
    IS_PRODUCTION,
    getProvider
}
