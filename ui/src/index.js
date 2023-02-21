const ethers = require('ethers')

const contractArtifact = require('./CTF.json')
const contractAbi = contractArtifact.abi

let theContract
let provider
let address = '0xca0dDaB967016eeA142bFC11c2a5AA5D69A8fEDa'
async function initContract() {

    if (!window.ethereum) {
        window.alert('Metamask not found')
        throw new Error('provider not found')
    }
    window.ethereum.on('accountsChanged', () => {
        console.log('acct');
        window.location.reload()
    })
    window.ethereum.on('chainChanged', () => {
        console.log('chainChained');
        window.location.reload()
    })
    const networkId = await window.ethereum.request({method: 'net_version'})
    console.log(networkId)
    if (networkId !== '5') {
        window.alert('Switch to Goerli Network on Metamask!')
        throw new Error('Switch to Goerli Network on Metamask!');
    }
    provider = new ethers.providers.Web3Provider(window.ethereum)

    const network = await provider.getNetwork()
    // const artifactNetwork = contractArtifact.networks[networkId]
    // if (!artifactNetwork)
    //     throw new Error('Can\'t find deployment on network ' + networkId)
    const contractAddress = address
    theContract = new ethers.Contract(
        contractAddress, contractAbi, provider.getSigner())
    await refreshLogs()
    await listenToEvents()
    return {contractAddress, network}
}

async function contractCall() {
    await window.ethereum.send('eth_requestAccounts')
    try {
        const txOptions = {gasPrice: await provider.getGasPrice()}
        const transaction = await theContract.captureFlag(txOptions)
        const hash = transaction.hash
        console.log(`Transaction ${hash} sent`)
        const receipt = await transaction.wait()
        console.log(`Mined in block: ${receipt.blockNumber}`)
    } catch( err ) {
        // window.alert(err);
        console.log(err.message);
        const t = err.message.split('(reason="execution reverted: ')
        if (t.length > 1) {
        // console.log(t[1]);
        const x= t[1].split('",')
        window.alert(x[0]);
        }
    }

    
}

let logview

async function listenToEvents() {

    theContract.on('FlagCaptured', (previousHolder, currentHolder, rawEvent) => {
        // log(`Flag Captured from&nbsp;${previousHolder} by&nbsp;${currentHolder}`)
        refreshLogs()
        console.log(`Flag Captured from ${previousHolder} by ${currentHolder}`)
    })
}

async function eventLogs(logs) {
    let message = ''
    if (!logview) {
        logview = document.getElementById('logview')
    }
    if (logs.length === 0) {
        message = 'Flag not captured yet!'
    } else {
        let i = logs.length - 1;
        message=`<table style="width:100%"><tr><th>Sr. No.</th><th>Captured From</th><th>Captured By</th><th>Timestamp</th></tr>`
        while(i >= 0) {
            const block = await logs[i].getBlock();
            console.log(block);
            console.log(block.timestamp);
            message = message + `<tr><td>${i+1}</td><td><i>${logs[i]['args'][0]}</i></td><td><i>${logs[i]['args'][1]}</i></td><td><i>${(new Date(block.timestamp * 1000)).toLocaleString()}</i></td></tr>`;
            i = i - 1;
        }
    }
    message = message + "</table>"    
    logview.innerHTML = message
}

async function refreshLogs() {
    const logs = await theContract.queryFilter('FlagCaptured');
    // const blockinfo  = await logs[0].getBlock();
    // console.log(blockinfo); 
    // console.log(logs);
    await eventLogs(logs);
}
window.app = {
    initContract,
    contractCall,
    refreshLogs,
    eventLogs
}

