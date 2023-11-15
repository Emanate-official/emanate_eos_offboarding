import { useMemo, useState } from "react";
import { AnchorUser } from "ual-anchor";

export const useBalances = ({ activeUser }: { activeUser: AnchorUser }) => {
  const [balances, setBalances] = useState<{
    staked: null | string;
    grow: null | string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const checkBalances = async (accountName: string) => {
    setIsLoading(true);
    const [stakedResponse, growResponse] = await Promise.all([
      fetchStakedBalance(accountName),
      fetchGrowBalance(accountName),
    ]);

    const stakedBalance =
      stakedResponse.rows?.length > 0
        ? stakedResponse.rows[0]?.data?.balance
        : null;
    const growBalance =
      growResponse.rows?.length > 0
        ? growResponse.rows[0]?.data?.balance
        : null;

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

  const values = useMemo(
    () => ({
      balances,
      isLoading,
      checkBalances,
    }),
    [balances, isLoading]
  );

  return values;
};
