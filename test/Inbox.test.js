const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let coinbase;
let inbox;

beforeEach(async () => {
  coinbase = await web3.eth.getCoinbase();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there'] })
    .send({ from: coinbase, gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', done => {
    console.log(inbox);
  });
});
