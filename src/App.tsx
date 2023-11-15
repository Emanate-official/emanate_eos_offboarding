import { useContext, useState, useEffect } from "react";
import { UALContext } from "ual-reactjs-renderer";
import { SignedOut } from "components/SignedOut";
import { SignedIn } from "components/SignedIn";

// Connect a Wallet, Check a Balance

function App() {
  const [balances, setBalances] = useState<{
    staked: null | string;
    grow: null | string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { showModal, activeUser, logout } = useContext(UALContext) as any;
  // const rpc = new JsonRpc("https://eos.greymass.com");

  // useEffect(() => {
  //   logout();
  // }, []);

  console.log("Active User: ", activeUser);

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
      staked: stakedBalance ?? "0 EMT",
      grow: growBalance ?? "0 EMT",
    });

    setIsLoading(false);
  };

  const fetchStakedBalance = async (accountName: string) => {
    return await activeUser.rpc.get_table_rows({
      json: true,
      code: "emanateoneos",
      scope: "emanateoneos",
      table: "accstakedb",
      lower_bound: accountName,
      upper_bound: accountName,
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
      lower_bound: accountName,
      upper_bound: accountName,
      limit: 1,
      reverse: false,
      show_payer: true,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-black text-white">
      <h1 className="text-4xl pb-10">Emanate EMT Off Boarding </h1>
      {!activeUser ? <SignedOut /> : <SignedIn />}
    </main>
  );
}

export default App;
