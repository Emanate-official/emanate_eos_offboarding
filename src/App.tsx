import React from "react";
import "./App.css";
import { UALContext } from "ual-reactjs-renderer";
import { JsonRpc, Api } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

// Connect a Wallet, Check a Balance

function App() {
  const context = React.useContext(UALContext) as any;
  const rpc = new JsonRpc("https://eos.greymass.com");

  const privateKey = "5KdeoVouxvBDU6mF3dQUc6XLpxATu2zzcP6y2wysnzSFfLmnmbM"; // use the private key of the person trying to unStake
  const privateKeys = [privateKey];
  const signatureProvider = new JsSignatureProvider(privateKeys); // Account paying for transaction
  const api = new Api({ rpc, signatureProvider });

  return (
    <div className="flex min-h-screen flex-col items-center p-24 bg-black text-white space-y-4">
      <button
        className="border p-3 rounded"
        onClick={() => context.showModal()}
      >
        Connect Wallet
      </button>
      <button
        className="border p-3 rounded"
        onClick={async () => {
          const result = await api.transact({
            actions: [
              {
                account: "emanateoneos",
                name: "",
                authorization: [],
                data: {},
              },
            ],
          });
          // const response = await rpc.get_table_rows({
          //   json: true,
          //   code: "emanateoneos",
          //   scope: "emanateoneos",
          //   table: "accgrowdb",
          //   lower_bound: "11times1is11",
          //   limit: 1,
          //   reverse: false,
          //   show_payer: true,
          // });
          // console.log(response);
        }}
      >
        Check Balance
      </button>
    </div>
  );
}

export default App;
