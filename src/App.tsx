import { useContext, useState, useEffect } from "react";
import { UALContext } from "ual-reactjs-renderer";

// Connect a Wallet, Check a Balance

function App() {
  const [balances, setBalances] = useState<{
    staked: null | string;
    grow: null | string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { showModal, activeUser, logout } = useContext(UALContext) as any;
  // const rpc = new JsonRpc("https://eos.greymass.com");

  useEffect(() => {
    logout();
  }, []);

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
    <div className="flex min-h-screen flex-col items-center p-24 bg-black text-white space-y-4">
      {!activeUser && (
        <button className="border p-3 rounded" onClick={() => showModal()}>
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
              value={balances.staked ?? "0 EMT"}
            />
            <button
              className="ml-4 border px-4"
              onClick={async () => {
                try {
                  const response = await activeUser.signTransaction(
                    {
                      actions: [
                        {
                          account: "emanateoneos",
                          name: "unstake",
                          authorization: [
                            {
                              actor: activeUser.accountName,
                              permission: "active",
                            },
                          ],
                          data: {
                            owner: "11times1is11",
                            balance: "10 EMT" ?? "0 EMT",
                          },
                        },
                      ],
                    },
                    {
                      blocksBehind: 3,
                      expireSeconds: 120,
                    }
                  );

                  console.log("Response: ", response);
                } catch (error: any) {
                  console.log("Error: ", error);
                }
              }}
            >
              Un-stake
            </button>
          </div>
          <div className="mt-4 flex">
            Grow Balance:{" "}
            <input
              className="text-black ml-4 flex-shrink-0 h-8"
              readOnly
              value={balances.grow ?? "0 EMT"}
            />
            <button
              onClick={async () => {
                try {
                  const response = await activeUser.signTransaction(
                    {
                      actions: [
                        {
                          account: "emanateoneos",
                          name: "ungrow",
                          authorization: [
                            {
                              actor: activeUser.accountName,
                              permission: "active",
                            },
                          ],
                          data: {
                            owner: activeUser.accountName,
                            balance: balances.grow ?? "0 EMT",
                          },
                        },
                      ],
                    },
                    {
                      blocksBehind: 3,
                      expireSeconds: 120,
                    }
                  );

                  console.log("Response: ", response);
                } catch (error: any) {
                  console.log("Error: ", error);
                }
              }}
              className="ml-4 border px-4"
            >
              Un-grow
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
