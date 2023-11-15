import { useContext, useState, useEffect } from "react";
import { UALContext } from "ual-reactjs-renderer";
import { SignedOut } from "components/SignedOut";
import { SignedIn } from "components/SignedIn";
import { Toaster } from "components/Toast";

function App() {
  const { activeUser, logout } = useContext(UALContext) as any;

  useEffect(() => {
    // This logs the user out whenever they visit this page.
    // In effect this disconnects the wallet from the UAL provider.
    logout();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-10 md:p-24 bg-black text-white">
      <div className="flex flex-col items-center justify-center max-w-2xl">
        <h1 className="text-4xl pb-10 text-center">
          Emanate EMT Off Boarding{" "}
        </h1>
        <h4 className="pb-10 text-center">
          As an additional tool, for users facing EOS resource limitations that
          prevent them from executing necessary transactions, we offer
          assistance through the free EOS tool at{" "}
          <a
            className="hover:underline text-blue-700"
            href="https://eospowerup.io/free"
            target="_blank"
          >
            https://eospowerup.io/free
          </a>
          .
        </h4>
        {!activeUser ? <SignedOut /> : <SignedIn />}
      </div>
      {/* TODO: Fix Toast Position on Mobile */}
      <Toaster />
    </main>
  );
}

export default App;
