import { useEffect, useContext, useState } from "react";
import "./App.css";
import { UALContext } from "ual-reactjs-renderer";
import { JsonRpc, Api } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";

// Connect a Wallet, Check a Balance

function App() {
  const [balances, setBalances] = useState<{
    staked: null | string;
    grow: null | string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(UALContext) as any;
  // const rpc = new JsonRpc("https://eos.greymass.com");

  const { activeUser } = context;
  console.log("Active User: ", activeUser);
  console.log("context: ", context);

  // useEffect(() => {
  //   context.logout();
  // }, []);

  // const privateKey = "5KdeoVouxvBDU6mF3dQUc6XLpxATu2zzcP6y2wysnzSFfLmnmbM"; // use the private key of the person trying to unStake
  // const privateKeys = [privateKey];
  // const signatureProvider = new JsSignatureProvider(privateKeys); // Account paying for transaction
  // const api = new Api({ rpc, signatureProvider });

  const checkBalances = async (accountName: string) => {
    setIsLoading(true);
    const [stakedResponse, growResponse] = await Promise.all([
      fetchStakedBalance(accountName),
      fetchGrowBalance(accountName),
    ]);

    console.log("stakedResponse: ", stakedResponse);

    console.log("growResponse: ", growResponse);

    const stakedBalance =
      stakedResponse.rows?.length > 0
        ? stakedResponse.rows[0]?.data?.balance
        : null;
    const growBalance =
      growResponse.rows?.length > 0
        ? growResponse.rows[0]?.data?.balance
        : null;

    console.log("growBalance: ", growBalance);

    setBalances({
      staked: stakedBalance,
      grow: growBalance,
    });

    setIsLoading(false);
  };

  const fetchStakedBalance = async (accountName: string) => {
    return await activeUser.rpc.get_table_rows({
      json: true,
      code: "emanateoneos",
      scope: "emanateoneos",
      table: "accstakedb",
      lower_bound: "airportseos1",
      upper_bound: "airportseos1",
      limit: 1,
      reverse: false,
      show_payer: true,
    });
  };

  const fetchGrowBalance = async (accountName: string) => {
    return await activeUser.rpc.get_table_rows({
      json: true,
      code: "emanateoneos",
      scope: "emanateoneos",
      table: "accgrowdb",
      lower_bound: "airportseos1",
      upper_bound: "airportseos1",
      limit: 1,
      reverse: false,
      show_payer: true,
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24 bg-black text-white space-y-4">
      {!activeUser && (
        <button
          className="border p-3 rounded"
          onClick={() => context.showModal()}
        >
          Connect Wallet
        </button>
      )}
      {activeUser && (
        <div>
          Logged in as:
          <input
            className="text-black ml-4"
            readOnly
            value={activeUser.accountName}
          />
        </div>
      )}
      {activeUser && !isLoading && balances === null && (
        <button
          className="border p-3 rounded"
          onClick={async () => {
            // const result = await api.transact({
            //   actions: [
            //     {
            //       account: "emanateoneos",
            //       name: "",
            //       authorization: [],
            //       data: {},
            //     },
            //   ],
            // });
            console.log("accountName: ", activeUser.accountName);
            if (activeUser?.accountName) {
              checkBalances(activeUser.accountName as string);
            }
          }}
        >
          Check Balance
        </button>
      )}
      {isLoading && <div>Loading...</div>}
      {balances && (
        <div>
          <div className="flex">
            Staked Balance:{" "}
            <input
              className="text-black ml-4 h-8"
              readOnly
              value={balances.staked ?? "0"}
            />
            <button className="ml-4 border px-4">Un-stake</button>
          </div>
          <div className="mt-4 flex">
            Grow Balance:{" "}
            <input
              className="text-black ml-4 flex-shrink-0 h-8"
              readOnly
              value={balances.grow ?? "0"}
            />
            <button className="ml-4 border px-4">Un-grow</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
