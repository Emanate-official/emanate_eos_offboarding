import { Coins, ExternalLink, Shrub } from "lucide-react";
import { cn } from "utils";

type BalanceProps = {
  balance: string | null;
  label: string;
  table: string;
  accountName: string;
};

export const Balance = ({
  balance,
  label,
  table,
  accountName,
}: BalanceProps) => {
  return (
    <div
      className={cn(
        table === "accgrowdb"
          ? "bg-green-200 text-black"
          : "bg-blue-500 text-white",
        "p-4 w-full flex justify-between max-w-[420px]"
      )}
    >
      <div className="flex space-x-4">
        {table === "accgrowdb" ? <Shrub /> : <Coins />}
        <span>{label}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span>{balance ?? "0 EMT"}</span>
        <div
          className={cn(
            "border rounded",
            table === "accgrowdb" ? "border-gray-500" : "border-white",
            '"rounded p-1 cursor-pointer hover:bg-gray-500 hover:text-white"'
          )}
        >
          <ExternalLink
            size={14}
            className="cursor-pointer"
            onClick={() => {
              window.open(
                `https://bloks.io/account/emanateoneos?loadContract=true&tab=Tables&table=${table}&account=emanateoneos&scope=emanateoneos&limit=1&lower_bound=${accountName}&upper_bound=${accountName}`
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
