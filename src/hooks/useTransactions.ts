import type { AnchorUser } from "ual-anchor";
import { useToast } from "./useToast";

export const useTransactions = ({ activeUser }: { activeUser: AnchorUser }) => {
  const { toast } = useToast();
  const unstakeAction = async (accountName: string, balance: string) => {
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

      console.log("Response: ", response);
    } catch (error: any) {
      toast({
        title: "Whoops...",
        description: `Error: \n\n${error}`,
      });
    }
  };

  const ungrowAction = async (accountName: string, balance: string) => {
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

      console.log("Response: ", response);
    } catch (error: any) {
      toast({
        title: "Whoops...",
        description: `Error: \n\n${error}`,
      });
    }
  };

  return {
    unstakeAction,
    ungrowAction,
  };
};
