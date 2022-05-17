import Web3 from "web3";

console.log("start subscriptions");
// const web3 = new Web3("wss://smartbch.regtest.actorforth.org/ws/");
const web3 = new Web3("wss://matic-testnet-archive-ws.bwarelabs.com");
const subscription = web3.eth.subscribe(
  "pendingTransactions",
  function (error, result) {
    if (!error) {
      console.log(result);

      return;
    }

    console.error(error);
  }
);
