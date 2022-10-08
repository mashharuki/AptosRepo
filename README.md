# AptosRepo
Aptosの学習・Dapp開発用のリポジトリ

### Aptosとは

Aptosは、開発中のL1(Layer 1)ブロックチェーンやそのプロジェクトの総称。  
高処理能力・低遅延を強みとしており、スマートコントラクトを扱うこともできるため、AvalancheやSolanaといったチェーンと競合するプロジェクトである。  
Aptosは、Diemの元メンバーであるMo Shaikh氏・Avery Ching氏が中心となって開発がスタートしている。

### Moveとは
Diemのプロジェクトで開発されていたプログラミング言語のこと。  
スマートコントラクトのプラットフォームとしてMove VM(MVM)を採用している。

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
