
##  [Submodule] web service(user interface with StayKing contracts on EVMOS chain) of StayKing House

It is a web service that allows users to interact with DeFi contracts on EVMOS chain using Chrome browser and Metamask wallet
 


## How to work

- Testnet
    - https://evmos.stayking.xyz

      - You can test with our service with test accounts we provided below
        - Lender ( Bob ) PK
            ```
            53242286ee73afefa2bd5522e2937b13f46a71f9fb7ab186e12d5b55818b029b
            ```
        - Staker ( Alice ) PK
            ```
            491bbf9237c55c649d41f5a105cc89e3bcba1337af236d4f681491e2061489f1
            ```
      - If there is no tEVMOS or USDC token in the accounts above, please email us `gloryan@icloud.com`. we'll fill the tokens in the accounts
- Localnet
  - you first go [defi-contract](https://github.com/evmos-stayking-house/defi-contract) submodule and run commands `npm run node ` and `npm deploy:localhost` 
  - then, you should start with `./start.sh` in the root folder and it will start server with port `3101`
  - you can connect a web `http://localhost:3101` locally
