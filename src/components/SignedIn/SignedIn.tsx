import { useContext } from "react";
import { UALContext } from "ual-reactjs-renderer";
import { useBalances } from "hooks";
import { Badge } from "components/Badge";
import { Button } from "components/Button";
import { Skeleton } from "components/Skeleton";

export const SignedIn = () => {
  const { activeUser } = useContext(UALContext) as any;
  const { accountName } = activeUser;
  const { isLoading, balances, checkBalances } = useBalances({ activeUser });

  return (
    <section className="flex justify-center items-center flex-col">
      <div className="flex space-x-6">
        <span>Logged in as:</span>
        <Badge variant="outline" className="font-bold text-blue-400 text-sm">
          {accountName}
        </Badge>
      </div>
      <div className="border w-full my-10"></div>

      {activeUser && !isLoading && balances === null && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              // Only check balances if accountName is not null
              // Triggering with an undefined or null value will cause an error.
              if (accountName) {
                checkBalances(activeUser.accountName as string);
              }
            }}
          >
            Check Balances
          </Button>
        </div>
      )}
      {/* {isLoading && <div>Loading...</div>} */}
      <div className="flex space-x-2">
        <Skeleton className="w-[100px] h-[30px] rounded-full" />
        <Skeleton className="w-[100px] h-[30px]" />
        <Skeleton className="w-[100px] h-[30px]" />
      </div>
      {/* {balances && (
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
