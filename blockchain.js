const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(id, date, data, previousHash = "") {
        this.id = id;
        this.date = date;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calcHash();
    }

    calcHash() {
        return SHA256(this.id + this.date + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.genesisBlock()];
    }

    genesisBlock() {
        return new Block('0', '10/02/2020', 'origin block', '000');
    }

    lastBlock() {
        return this.chain[this.chain.length - 1]
    }

    createBlock(newblock) {
        newblock.previousHash = this.lastBlock().hash;
        newblock.hash = newblock.calcHash();
        this.chain.push(newblock);
    }
    isValidBlock(){
        for (let i=1; i<this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if (currentBlock.previousHash != previousBlock.hash){
                return false;

            } else if (currentBlock.hash != currentBlock.calcHash()){
                return  false;
            } else  {
                return  true;
            }

        }
    }


}

let firstCrypto = new BlockChain;
firstCrypto.createBlock(new Block('01', '11/02/2020', {
    transaction: 10,
    from: 'X',
    to: 'Y'
}));
firstCrypto.createBlock(new Block('02', '12/02/2020', {
    transaction: 15,
    from: 'Z',
    to: 'W'
}));
// trying to modify data to check chain checker function
firstCrypto.chain[1].date = '27/12/2019';
console.log('this chain is valid = ' + firstCrypto.isValidBlock());
console.log(JSON.stringify(firstCrypto, null, 4));
