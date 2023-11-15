import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UALProvider, withUAL } from "ual-reactjs-renderer";
import { Anchor } from "ual-anchor";

const myChain = {
  chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
  rpcEndpoints: [
    {
      protocol: "https",
      host: "eos.eosphere.io",
      port: 443,
    },
    {
      protocol: "http",
      host: "api.eostitan.com",
      port: 80,
    },
    {
      protocol: "https",
      host: "eos.greymass.com",
      port: 443,
    },
    {
      protocol: "http",
      host: "eos.eoscafeblock.com",
      port: 80,
    },
  ],
};

const anchor = new Anchor([myChain], { appName: "Emanate" });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const AppConsumer = withUAL(App);
AppConsumer.displayName = "AppConsumer";

root.render(
  <UALProvider chains={[myChain]} authenticators={[anchor]} appName={"Emanate"}>
    <AppConsumer />
  </UALProvider>
);
