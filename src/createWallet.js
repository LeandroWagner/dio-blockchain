/*
Gerador de Carteiras
*/

//Importando as depedencias
const bip32   = require('bip32')
const bip39   = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//Definir a rede
//testnet (rede de teste de bitcoinks)
//bitcoin (rede do principal bitcoin mainnet)
const network = bitcoin.networks.testnet

//Derivação de carteiras HD
const path = `m/49'/1'/0'/0`

//Criando o mnemocic para a seed (palavras de senha dos) 
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Criando a raiz da carteira HD
let root = bip32.fromSeed(seed,network)

//Criando uma conta - par pvtpubl keys
let account = root.derivePath(path)

//Gerando o no a partir da conta raiz
let node = account.derive(0).derive(0)

//Gerar um endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

//escrevendo os dados na carterira
console.log("Carteira gerada")
console.log("Endereço:",btcAddress)
console.log("Chave privada:",node.toWIF())
console.log("Seed:",mnemonic)