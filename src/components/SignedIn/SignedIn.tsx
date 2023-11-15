import { useContext } from "react";
import { UALContext } from "ual-reactjs-renderer";
import { useBalances } from "hooks";
import { Badge } from "components/Badge";
import { Button } from "components/Button";
import { Skeleton } from "components/Skeleton";
import { useToast } from "hooks";
import { Balance } from "components/Balance";
import { Input } from "components/Input";

export const SignedIn = () => {
  const { activeUser } = useContext(UALContext) as any;
  const { accountName } = activeUser;
  const { isLoading, balances, checkBalances } = useBalances({ activeUser });
  const { toast } = useToast();

  return (
    <section className="flex justify-center items-center flex-col w-full border">
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
              // toast({
              //   title: "Scheduled: Catch up",
              //   description: "Friday, February 10, 2023 at 5:57 PM",
              // });
            }}
          >
            Check Balances
          </Button>
        </div>
      )}
      {isLoading && (
        <div className="flex flex-col mb-10 w-full space-y-4">
          <Skeleton className="h-[50px] w-[420px]" />
          <Skeleton className="h-[50px] w-[420px]" />
        </div>
      )}

      {balances && (
        <div className="flex flex-col justify-center items-center w-full space-y-4 border">
          <Balance
            label="GROW"
            balance={balances.grow}
            table="accgrowdb"
            accountName={accountName}
          />
          <Balance
            label="STAKED"
            balance={balances.staked}
            table="accstakedb"
            accountName={accountName}
          />
        </div>
      )}

      {balances && (
        <div className="text-white w-full space-y-5">
          <div className="border w-full my-10 text-white" />

          <div className="flex items-center flex-col">
            <h3 className="text-white pb-4 text-2xl">UNGROW EMT</h3>
            <div className="flex space-x-4">
              <Input className="w-40" placeholder="ex: 100 EMT" />
              <Button variant="outline">UNGROW</Button>
            </div>
          </div>

          <div className="flex items-center flex-col">
            <h3 className="text-white pb-4 text-2xl">UNSTAKE EMT</h3>
            <div className="flex space-x-4">
              <Input className="w-40" placeholder="ex: 100 EMT" />
              <Button variant="outline">UNSTAKE</Button>
            </div>
          </div>
        </div>
      )}

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
