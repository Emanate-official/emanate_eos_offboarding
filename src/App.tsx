import { useContext, useState, useEffect } from "react";
import { UALContext } from "ual-reactjs-renderer";
import { SignedOut } from "components/SignedOut";
import { SignedIn } from "components/SignedIn";

// Connect a Wallet, Check a Balance

function App() {
  const { activeUser } = useContext(UALContext) as any;
  // const rpc = new JsonRpc("https://eos.greymass.com");

  // useEffect(() => {
  //   logout();
  // }, []);

  console.log("Active User: ", activeUser);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-black text-white">
      <h1 className="text-4xl pb-10">Emanate EMT Off Boarding </h1>
      {!activeUser ? <SignedOut /> : <SignedIn />}
    </main>
  );
}

export default App;
