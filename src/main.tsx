import './polyfills';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet } from 'wagmi/chains';
import { ConnectKitProvider } from "connectkit";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";


const alchemyId = process.env.ALCHEMY_ID;

const ethermintChain = {
  id: 69420,
  name: "Ethermint",
  nativeCurrency: {
    decimals: 18,
    name: "Ethermint",
    symbol: "CTE",
  },
  rpcUrls: {
    default: "http://159.65.252.178:8545/",
  },
  testnet: false,
};

const { provider, chains } = configureChains(
  [mainnet, ethermintChain as any],
  [
    alchemyProvider({ apiKey: alchemyId }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== ethermintChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ],
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains: chains,
    }),
    new WalletConnectConnector({
      chains: chains,
      options: {
        qrcode: false,
      },
    }),
  ],
  provider,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="midnight">
        <App />
    </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)