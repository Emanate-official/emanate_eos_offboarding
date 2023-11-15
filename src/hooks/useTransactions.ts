import type { AnchorUser } from "ual-anchor";
import type { SignTransactionResponse } from "universal-authenticator-library";
import { useToast } from "./useToast";
import { getErrorMessage } from "utils";
import { useMemo, useState } from "react";

export const useTransactions = ({ activeUser }: { activeUser: AnchorUser }) => {
  const { toast } = useToast();
  const [growResponse, setGrowResponse] =
    useState<SignTransactionResponse | null>(null);
  const [stakeResponse, setStakeResponse] =
    useState<SignTransactionResponse | null>(null);

  const unstakeAction = async (accountName: string, balance: string) => {
    if (!balance.includes("EMT")) {
      toast({
        title: "Whoops...",
        variant: "error",
        description: `Please include token symbol in input field with a space. Ex: 100 EMT`,
      });
      return;
    }

    try {
      const response = await activeUser.signTransaction(
        {
          actions: [
            {
              account: "emanateoneos",
              name: "unstake",
              authorization: [
                {
                  actor: accountName,
                  permission: "active",
                },
              ],
              data: {
                owner: accountName,
                balance: balance,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 120,
        }
      );
      setStakeResponse(response);
      toast({
        title: "Success",
        variant: "success",
        description: "Transaction Successful",
      });
    } catch (error) {
      toast({
        title: "Whoops...",
        variant: "error",
        description: `Error: \n\n${getErrorMessage(error)}`,
      });
    }
  };

  const ungrowAction = async (accountName: string, balance: string) => {
    if (!balance.includes("EMT")) {
      toast({
        title: "Whoops...",
        variant: "error",
        description: `Please include token symbol in input field with a space. Ex: 100 EMT`,
      });
      return;
    }

    try {
      const response = await activeUser.signTransaction(
        {
          actions: [
            {
              account: "emanateoneos",
              name: "ungrow",
              authorization: [
                {
                  actor: accountName,
                  permission: "active",
                },
              ],
              data: {
                owner: accountName,
                balance: balance,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 120,
        }
      );
      setGrowResponse(response);
      toast({
        title: "Success",
        variant: "success",
        description: "Transaction Successful",
      });
    } catch (error: any) {
      toast({
        title: "Whoops...",
        variant: "error",
        description: `Error: \n\n${getErrorMessage(error)}`,
      });
    }
  };

  const values = useMemo(
    () => ({
      growResponse,
      stakeResponse,
      unstakeAction,
      ungrowAction,
    }),
    [growResponse, stakeResponse]
  );

  return values;
};
