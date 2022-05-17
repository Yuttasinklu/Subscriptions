import Web3 from "web3";

console.log("start subscriptions");
// const web3 = new Web3("wss://matic-testnet-archive-ws.bwarelabs.com");
// const web3 = new Web3("wss://smartbch.regtest.actorforth.org/ws/");
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://smartbch.regtest.actorforth.org/ws/"
  )
);
// const provider = new Web3.providers.HttpProvider(
//   "https://smartbch.fountainhead.cash/mainnet"
// );
// const web3 = new Web3(provider);
// const web3socket = new Web3(
//   new Web3.providers.WebsocketProvider(
//     "wss://smartbch.regtest.actorforth.org/ws/"
//   )
// );

const contract = new web3.eth.Contract(
  [
    { name: "AuctionPaused", inputs: [], anonymous: false, type: "event" },
    { name: "AuctionUnpaused", inputs: [], anonymous: false, type: "event" },
    { name: "AuctionClosed", inputs: [], anonymous: false, type: "event" },
    {
      name: "BidAdded",
      inputs: [
        { name: "_operator", type: "address", indexed: true },
        { name: "_bidId", type: "uint256", indexed: true },
        { name: "_value", type: "uint256", indexed: false },
      ],
      anonymous: false,
      type: "event",
    },
    {
      name: "BidIncreased",
      inputs: [
        { name: "_operator", type: "address", indexed: true },
        { name: "_bidId", type: "uint256", indexed: true },
        { name: "_value", type: "uint256", indexed: false },
      ],
      anonymous: false,
      type: "event",
    },
    {
      name: "BidRemoved",
      inputs: [
        { name: "_operator", type: "address", indexed: true },
        { name: "_bidId", type: "uint256", indexed: true },
      ],
      anonymous: false,
      type: "event",
    },
    {
      stateMutability: "nonpayable",
      type: "constructor",
      inputs: [
        { name: "_auctionName", type: "string" },
        { name: "_tokenContract", type: "address" },
        { name: "_tokenType", type: "uint256" },
        { name: "_minTokenId", type: "uint256" },
        { name: "_maxTokenId", type: "uint256" },
        { name: "_currencyAddress", type: "address" },
        { name: "_minimumBid", type: "uint256" },
        { name: "_minimumBidIncrement", type: "uint256" },
        { name: "_startDate", type: "uint256" },
        { name: "_endDate", type: "uint256" },
        { name: "_extendingTime", type: "uint256" },
        { name: "_suddenDeathStartTime", type: "uint256" },
      ],
      outputs: [],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "getBids",
      inputs: [
        { name: "_startPosition", type: "uint256" },
        { name: "_size", type: "uint256" },
      ],
      outputs: [{ name: "", type: "uint256[3][]" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "getAddressBids",
      inputs: [{ name: "_address", type: "address" }],
      outputs: [{ name: "", type: "uint256[3][]" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "getState",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "currentSeaLevel",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "maxSeaLevel",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "nonpayable",
      type: "function",
      name: "addBids",
      inputs: [
        { name: "_value", type: "uint256" },
        { name: "_count", type: "uint256" },
      ],
      outputs: [],
    },
    {
      stateMutability: "nonpayable",
      type: "function",
      name: "increaseBids",
      inputs: [
        { name: "_bidIds", type: "uint256[100]" },
        { name: "_value", type: "uint256" },
      ],
      outputs: [],
    },
    {
      stateMutability: "nonpayable",
      type: "function",
      name: "removeBid",
      inputs: [{ name: "_bidId", type: "uint256" }],
      outputs: [],
    },
    {
      stateMutability: "nonpayable",
      type: "function",
      name: "batchRemoveBid",
      inputs: [{ name: "_bidIds", type: "uint256[100]" }],
      outputs: [],
    },
    {
      stateMutability: "nonpayable",
      type: "function",
      name: "pauseAuction",
      inputs: [],
      outputs: [],
    },
    {
      stateMutability: "nonpayable",
      type: "function",
      name: "resumeAuction",
      inputs: [],
      outputs: [],
    },
    {
      stateMutability: "nonpayable",
      type: "function",
      name: "closeAuction",
      inputs: [],
      outputs: [],
    },
    {
      stateMutability: "nonpayable",
      type: "function",
      name: "promoteBid",
      inputs: [
        { name: "_bidId", type: "uint256" },
        { name: "_height", type: "int128" },
      ],
      outputs: [],
    },
    {
      stateMutability: "nonpayable",
      type: "function",
      name: "destroyContract",
      inputs: [],
      outputs: [],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "open",
      inputs: [],
      outputs: [{ name: "", type: "bool" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "paused",
      inputs: [],
      outputs: [{ name: "", type: "bool" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "startDate",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "endDate",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "extendedEnd",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "extendingTime",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "suddenDeathStartTime",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "tokenQty",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "totalValue",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "totalRemovedValue",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "totalRemovedBids",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "bidCount",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "bidIdCount",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "highestBidId",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "medianBidId",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "lowestWinningBidId",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "minimumBid",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "minimumBidIncrement",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "auctionName",
      inputs: [],
      outputs: [{ name: "", type: "string" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "contractOwner",
      inputs: [],
      outputs: [{ name: "", type: "address" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "bidList",
      inputs: [{ name: "arg0", type: "uint256" }],
      outputs: [
        {
          name: "",
          type: "tuple",
          components: [
            { name: "value", type: "uint256" },
            { name: "prevBid", type: "uint256" },
            { name: "nextBid", type: "uint256" },
          ],
        },
      ],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "bids",
      inputs: [{ name: "arg0", type: "uint256" }],
      outputs: [{ name: "", type: "address" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "minTokenId",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "maxTokenId",
      inputs: [],
      outputs: [{ name: "", type: "uint256" }],
    },
    {
      stateMutability: "view",
      type: "function",
      name: "currencyAddress",
      inputs: [],
      outputs: [{ name: "", type: "address" }],
    },
  ],
  "0xc7B4C1cD5adCF3AaD8d41c5Bc82B6e3CE891Ac62"
);

console.log("option", contract.options.address);

const subscription = web3.eth.subscribe(
  "pendingTransactions",
  function (error, result) {
    if (!error) {
      //   console.log("hello");
      console.log(result);

      return;
    }

    console.error(error);
  }
);
console.log("subs", subscription);
