const Web3 = require('web3')

const { IS_PRODUCTION, NETWORK, getProvider } = require('./const')
const accessControlledOffchainAggregator = require('../artifacts/contracts/aggregator/AccessControlledOffchainAggregator.sol/AccessControlledOffchainAggregator.json')

const network = IS_PRODUCTION ? NETWORK.ETHMAINET : NETWORK.RINKEBY

const provider = getProvider(network)

const web3 = new Web3(provider)

const maximumGasPrice = 1; // IDK
const reasonableGasPrice = 10; // IDK
const microLinkPerEth = 1000000; // IDK
const linkGweiPerObservation = 500; // IDK
const linkGweiPerTransmission = 300;// IDK
const link = 0x514910771AF9Ca656af840dff83E8264EcF986CA; // LINK TOKEN ETHMAINET
const validator = 0x0000000000000000000000000000000000000000 ;
const minAnswer = 1000000000000; //It depend 1000000000000000  
const maxAnswer = 100000000000000000; // 100000000000000000000
const billingAccessController = 0x9db83CEf9f68b63989E4E82D65D549e7fF2aCda9 // ETHMAINET ADDR
const requesterAccessController=  0x641B698aD1C6E503470520B0EeCb472c0589dfE6 // ETHMAINET ADDR
const decimals = 8; // ou 18
const description = "AKITA / ETH";

const deployAccessControlledOffchainAggregator = async () => {
    try {
        const accounts = await web3.eth.getAccounts()

        console.log('Attempting to deploy AccessControlledOffchainAggregator from the account', accounts[0])

        const deployedToken = await new web3.eth.Contract(accessControlledOffchainAggregator.abi)
            .deploy({
                data: accessControlledOffchainAggregator.bytecode,
                arguments: [
                    maximumGasPrice,
                    reasonableGasPrice,
                    microLinkPerEth,
                    linkGweiPerObservation,
                    linkGweiPerTransmission,
                    link,
                    validator,
                    minAnswer,
                    maxAnswer,
                    billingAccessController,
                    requesterAccessController,
                    decimals,
                    description,
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

deployAccessControlledOffchainAggregator()
