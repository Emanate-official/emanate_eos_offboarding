import React from "react";
import "./App.css";
import { UALContext } from "ual-reactjs-renderer";

function App() {
  const context = React.useContext(UALContext) as any;
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">
      <button
        className="border p-3 rounded"
        onClick={() => context.showModal()}
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default App;
