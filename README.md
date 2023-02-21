# Dapp Demo

## Contract Deployment

To deploy the contract install all dependencies and run the following commands:

```shell
npx hardhat compile
npx hardhat run ./scripts/deploy.js
```

To execute the above commands you would need a `.env` file in your project's root directory

```js
//.env example

//private key of the account from which the contract will be deployed
PRIVATE_KEY=''
//infura key for RPC url
INFURA_KEY=''
```

### Deployed contract details

Address: `0x4a3878ffC952481cB2BdDDDF39E1583E07A49E6d`<br/>
Block number: `7992303`

## Run UI

1. Change directory to `ui`
2. Run `npm install`. This installs all required dependecies.
3. Run `npm start`. The app will run port 3000, by default.
