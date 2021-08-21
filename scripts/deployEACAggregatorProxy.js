const Web3 = require('web3')

const { IS_PRODUCTION, NETWORK, getProvider } = require('./const')
const eacAggregatorProxy = require('../artifacts/contracts/chainLink/EACAggregatorProxy.sol/EACAggregatorProxy.json')

const aggregator = '';//Deploy AccessControlledOffChainAgg
const accessController = 0x0000000000000000000000000000000000000000;

const network = IS_PRODUCTION ? NETWORK.ETHMAINET : NETWORK.RINKEBY

const provider = getProvider(network)

const web3 = new Web3(provider)

const deployEACAggregatorProxy = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to deploy EACAggregatorProxy from the account', accounts[0])

        const deployedToken = await new web3.eth.Contract(eacAggregatorProxy.abi)
            .deploy({
                data: eacAggregatorProxy.bytecode,
                arguments: [
                  aggregator,
                  accessController
                ]
            })
            .send({
                from: accounts[0]
            })

        console.log('Token deployed to', deployedToken.options.address)
    } catch (error) {
        console.error('An error occurred in deployAccessControlledOffchainAggregator():\n', error)
    }
}

deployEACAggregatorProxy()
