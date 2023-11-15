import { useContext } from "react";
import { UALContext } from "ual-reactjs-renderer";

import { useToast, useBalances } from "hooks";

import { Input } from "components/Input";
import { Badge } from "components/Badge";
import { Button } from "components/Button";
import { Balance } from "components/Balance";
import { Skeleton } from "components/Skeleton";
import { ActionOptions } from "components/ActionOptions";

export const SignedIn = () => {
  const { activeUser } = useContext(UALContext) as any;
  const { accountName } = activeUser;
  const { isLoading, balances, checkBalances } = useBalances({ activeUser });

  return (
    <section className="flex justify-center items-center flex-col w-full">
      {/* Logged in as Information */}
      <div className="flex space-x-6">
        <span>Logged in as:</span>
        <Badge variant="outline" className="font-bold text-blue-400 text-sm">
          {accountName}
        </Badge>
      </div>

      {/* Border Spacer */}
      <div className="border w-full my-10"></div>

      {/* Check Balance Button */}
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
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="flex flex-col items-center mb-10 w-full space-y-4">
          <Skeleton className="h-[50px] w-[420px]" />
          <Skeleton className="h-[50px] w-[420px]" />
        </div>
      )}

      {/* Balances Information */}
      {balances && (
        <div className="flex flex-col justify-center items-center w-full space-y-4">
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

      {/* UNSTAKE / UNGROW Options */}
      {balances && <ActionOptions />}
    </section>
  );
};
