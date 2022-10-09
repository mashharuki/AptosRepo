# AptosRepo
Aptosの学習・Dapp開発用のリポジトリ

### Aptosとは

Aptosは、開発中のL1(Layer 1)ブロックチェーンやそのプロジェクトの総称。  
高処理能力・低遅延を強みとしており、スマートコントラクトを扱うこともできるため、AvalancheやSolanaといったチェーンと競合するプロジェクトである。  
Aptosは、Diemの元メンバーであるMo Shaikh氏・Avery Ching氏が中心となって開発がスタートしている。

### Moveとは
Diemのプロジェクトで開発されていたプログラミング言語のこと。  
スマートコントラクトのプラットフォームとしてMove VM(MVM)を採用している。

### Move言語の特徴

- 取引ロジックとスマートコントラクトを分離するために、トランザクションスクリプトとモジュールに分割されている。
- Libra自体がRust言語で作られていることもあり、Move言語もRustの文法に似ている。
- コンパイラによって、文法だけでなく、リソースの複製や再利用、破棄などのロジックに対してもチェックされる。
- eventによるトランザクション制御やGasによる実行制御の機能があり、Ethereumのスマートコントラクトと似ている。

### Aptos BFTとは
コンセンサスアルゴリズム「Aptos BFT」を採用している。HotStuffとは、BFT(ビザンチン将軍問題に耐性を持つ)コンセンサスプロトコルのこと。安全性向上のため秘密鍵をローテンションさせる機能や、紛失による損失を防止するために秘密鍵をリカバリー(復元)する新たな機能も開発している。

#### aptos cli install

下記サイトの指示に従ってインストールする。  

[install-aptos-cli](https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli)

CLIのインストールがうまくいけば`aptos -h`と入力した時に次のようにターミナルに出力される。

```zsh
Command Line Interface (CLI) for developing and interacting with the Aptos blockchain

USAGE:
    aptos <SUBCOMMAND>

OPTIONS:
    -h, --help       Print help information
    -V, --version    Print version information

SUBCOMMANDS:
    account       Tool for interacting with accounts
    config        Tool for interacting with configuration of the Aptos CLI tool
    genesis       Tool for setting up an Aptos chain Genesis transaction
    governance    Tool for on-chain governance
    help          Print this message or the help of the given subcommand(s)
    info          Show build information about the CLI
    init          Tool to initialize current directory for the aptos tool
    key           Tool for generating, inspecting, and interacting with keys
    move          Tool for Move related operations
    node          Tool for operations related to nodes
    stake         Tool for manipulating stake
```

###　チェーン情報

#### Aptos testnet
- REST API Open API spec: https://fullnode.testnet.aptoslabs.com/v1/spec#/
- REST service: https://fullnode.testnet.aptoslabs.com/v1
- Faucet service: https://faucet.testnet.aptoslabs.com
- Genesis: https://testnet.aptoslabs.com/genesis.blob
- Genesis and waypoint: https://github.com/aptos-labs/aptos-genesis-waypoint/tree/main/testnet
- ChainID: https://explorer.aptoslabs.com/?network=testnet

#### Aptos devnet
- REST API Open API spec: https://fullnode.devnet.aptoslabs.com/v1/spec#/
- REST service: https://fullnode.devnet.aptoslabs.com/v1
- Faucet service: https://faucet.devnet.aptoslabs.com
- Genesis: https://devnet.aptoslabs.com/genesis.blob
- Waypoint: https://devnet.aptoslabs.com/waypoint.txt
- ChainID: https://explorer.aptoslabs.com/?network=devnet

#### Aptos SDK インストール方法

`npm i aptos`

##### transfer coinのテストコマンド

`cd sample && npm run transfer_coin`  

レスポンス例
```zsh
> sample@1.0.0 transfer_coin
> ts-node transfer_coin.ts

=== Addresses ===
Alice: 0x14b30e5b42a94247c1dd97d4f24d01449cc5e85b02ebcb7fc0281f915fefb963
Bob: 0x121ba4c14d9fba0bc89b201e467771a274547379c03b1bd082abba751c012994

=== Initial Balances ===
Alice: 100000000
Bob: 0

=== Intermediate Balances ===
Alice: 99972800
Bob: 1000

=== Final Balances ===
Alice: 99945600
Bob: 2000
```

##### simple_nft コマンド

`npm run simple_nft`  

レスポンスの例
```zsh
> sample@1.0.0 simple_nft
> ts-node simple_nft.ts

=== Addresses ===
Alice: 0x979600b20654944c269abf3ba52d06dfae1d98c74bead66d5ad0d3561d26cd2c
Bob: 0xcfb65b98f4a3277d04e18f864219ae65e28e03c817754a72345ac6d8eaf9bdea

=== Initial Coin Balances ===
Alice: 100000000
Bob: 100000000

=== Creating Collection and Token ===
Alice's collection: {
    "description": "Alice's simple collection",
    "maximum": "18446744073709551615",
    "mutability_config": {
        "description": false,
        "maximum": false,
        "uri": false
    },
    "name": "Alice's",
    "supply": "1",
    "uri": "https://alice.com"
}
Alice's token balance: 1
Alice's token data: {
    "default_properties": {
        "map": {
            "data": []
        }
    },
    "description": "Alice's simple token",
    "largest_property_version": "0",
    "maximum": "18446744073709551615",
    "mutability_config": {
        "description": false,
        "maximum": false,
        "properties": false,
        "royalty": false,
        "uri": false
    },
    "name": "Alice's first token",
    "royalty": {
        "payee_address": "0x979600b20654944c269abf3ba52d06dfae1d98c74bead66d5ad0d3561d26cd2c",
        "royalty_points_denominator": "0",
        "royalty_points_numerator": "0"
    },
    "supply": "1",
    "uri": "https://aptos.dev/img/nyan.jpeg"
}

=== Transferring the token to Bob ===
Alice's token balance: 0
Bob's token balance: 1

=== Transferring the token back to Alice using MultiAgent ===
Alice's token balance: 1
Bob's token balance: 0
```

##### Create an account and fund it

`aptos init`  

レスポンス例
```zsh
Configuring for profile default
Enter your rest endpoint [Current: None | No input: https://fullnode.devnet.aptoslabs.com/v1]

No rest url given, using https://fullnode.devnet.aptoslabs.com/v1...
Enter your faucet endpoint [Current: None | No input: https://faucet.devnet.aptoslabs.com | 'skip' to not use a faucet]

No faucet url given, using https://faucet.devnet.aptoslabs.com...
Enter your private key as a hex literal (0x...) [Current: None | No input: Generate new key (or keep one if present)]

No key given, generating key...
Account 9b6a840164c194a78218ad758c11b82f68af49469d121a1048ce2f1585c5f1d4 doesn't exist, creating it and funding it with 10000 Octas
Aptos is now set up for account 9b6a840164c194a78218ad758c11b82f68af49469d121a1048ce2f1585c5f1d4!  Run `aptos help` for more information about commands
{
  "Result": "Success"
}
```

##### fund account

`cd move-example && aptos account fund-with-faucet --account default`  

レスポンス例
```zsh
{
  "Result": "Added 500000 Octas to account 9b6a840164c194a78218ad758c11b82f68af49469d121a1048ce2f1585c5f1d4"
}
```

##### Compile the module

`aptos move compile --named-addresses hello_blockchain=default`  

レスポンス例
```zsh
{
  "Result": [
    "9b6a840164c194a78218ad758c11b82f68af49469d121a1048ce2f1585c5f1d4::message"
  ]
}
```

##### test the module

`aptos move test --named-addresses hello_blockchain=default`  

レスポンス例
```zsh
NCLUDING DEPENDENCY AptosFramework
INCLUDING DEPENDENCY AptosStdlib
INCLUDING DEPENDENCY MoveStdlib
BUILDING Examples
Running Move unit tests
[ PASS    ] 0x9b6a840164c194a78218ad758c11b82f68af49469d121a1048ce2f1585c5f1d4::message_tests::sender_can_set_message
[ PASS    ] 0x9b6a840164c194a78218ad758c11b82f68af49469d121a1048ce2f1585c5f1d4::message::sender_can_set_message
Test result: OK. Total tests: 2; passed: 2; failed: 0
{
  "Result": "Success"
}
```

##### publish the module

`aptos move publish --named-addresses hello_blockchain=default`  

レスポンス例
```zsh
{
  "Result": {
    "transaction_hash": "0x9b67f66e7e1de409f2c48cf7e9e5686d3d56ace65fe7c97c85158276e74f25bb",
    "gas_used": 1435,
    "gas_unit_price": 100,
    "sender": "9b6a840164c194a78218ad758c11b82f68af49469d121a1048ce2f1585c5f1d4",
    "sequence_number": 0,
    "success": true,
    "timestamp_us": 1665283845025970,
    "version": 13692896,
    "vm_status": "Executed successfully"
  }
}
```

#### run function of module

`aptos move run --function-id 'default::message::set_message' --args 'string:hello, blockchain'`  

レスポンス例
```zsh
{
  "Result": {
    "transaction_hash": "0x07b152760532ffbe0e9e21799fd57b12d922194ccc477ba26625f0332565fd8f",
    "gas_used": 257,
    "gas_unit_price": 100,
    "sender": "9b6a840164c194a78218ad758c11b82f68af49469d121a1048ce2f1585c5f1d4",
    "sequence_number": 1,
    "success": true,
    "timestamp_us": 1665284009089041,
    "version": 13696951,
    "vm_status": "Executed successfully"
  }
}
```

`https://fullnode.devnet.aptoslabs.com/v1/accounts/a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a/resource/0xa345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a::message::MessageHolder`

#### React (Typescript版)のテンプレ作成コマンド

`npx create-react-app first-dapp --template typescript`

#### windows aptos

Metamaskの場合は、window.ethereumオブジェクトを利用することになるがAptosの場合は、window.aptosとなる。  

TypeScriptで接続する場合の書き方はこう

```ts
  const init = async() => {
    // connect
    await window.aptos.connect();
    const data = await window.aptos.account(); 
    // set address
    setAddress(data.address);
  }
```

### Reference
1. [Aptos Developer Docs](https://aptos.dev/guides/getting-started/)
2. [【仮想通貨】Aptos(アプトス)とは？今後の見通しや将来性を徹底解説！](https://fisco.jp/media/aptos-about/#:~:text=Aptos%EF%BC%88%E3%82%A2%E3%83%97%E3%83%88%E3%82%B9%EF%BC%89%E3%81%AF%E3%80%81Meta,%E3%82%92%E8%A1%A8%E6%98%8E%E3%81%97%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82)
3. [Aptos OfficialSite](https://aptoslabs.com/)
4. [Martian](https://martianwallet.xyz/)
5. [話題のL1チェーン「Aptos」とは？概要や特徴を徹底解説【480億円調達済】](https://crypto-times.jp/what-is-aptos/)
6. [liquidswap](https://liquidswap.trade/)
7. [liquidswap App](https://eth.liquidswap.trade/swap?outputCurrency=0x7fe8dac51394157811c71bbf74c133a224a9ff44)
8. [Aptos Explorer](https://explorer.aptoslabs.com/)
9. [White Paper](https://aptos.dev/aptos-white-paper/aptos-white-paper-index/)
10. [Aptos Faucet](https://lib.rs/crates/aptos-faucet)
11. [install-aptos-cli](https://aptos.dev/cli-tools/aptos-cli-tool/install-aptos-cli)
12. [開発元が未確認のMacアプリケーションを開く](https://support.apple.com/ja-jp/guide/mac-help/mh40616/mac)
13. [Discussion Forum](https://forum.aptoslabs.com/top?period=monthly)
14. [aptos-core](https://github.com/aptos-labs/aptos-core)
15. [The Move Book](https://move-language.github.io/move/introduction.html)
