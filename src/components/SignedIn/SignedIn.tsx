import { Badge } from "components/Badge";
import { Button } from "components/Button";
import { useContext } from "react";
import { UALContext } from "ual-reactjs-renderer";

export const SignedIn = () => {
  const { activeUser } = useContext(UALContext) as any;
  const { accountName } = activeUser;
  return (
    <section>
      <div className="flex space-x-6">
        <span>Logged in as:</span>
        <Badge variant="outline" className="font-bold text-blue-400 text-sm">
          {accountName}
        </Badge>
      </div>
      <div className="flex justify-center mt-10">
        <Button variant="outline">Check Balance</Button>
      </div>
      {/* {activeUser && !isLoading && balances === null && (
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
      )} */}
    </section>
  );
};
