const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const provider = ganache.provider();
const web3 = new Web3(provider);

let coinbase;
let inbox;

beforeEach(async () => {
  coinbase = await web3.eth.getCoinbase();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there'] })
    .send({ from: coinbase, gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('it has an initial message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there');
  });

  it('can set a message', async () => {
    await inbox.methods.setMessage('Bye there').send({ from: coinbase });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Bye there');
  });
});
