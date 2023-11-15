import { CheckCircle2, ExternalLink } from "lucide-react";

type TxSuccessProps = {
  transactionId: string;
  children?: React.ReactNode;
};

export const TxSuccess = ({ transactionId }: TxSuccessProps) => {
  return (
    <div className="flex items-center justify-center py-4 w-full space-x-4 mt-4">
      <CheckCircle2 className="text-green-500" />
      <span>Success! Transaction ID: </span>
      <div
        className="flex items-center border rounded w-[340px] p-2 cursor-pointer hover:bg-slate-400 bg-opacity-25"
        style={{
          overflowWrap: "break-word",
          wordWrap: "break-word",
          wordBreak: "break-all",
        }}
        onClick={() => {
          window.open(`https://bloks.io/transaction/${transactionId}`);
        }}
      >
        {transactionId}
        <ExternalLink className="flex-shrink-0 ml-2" />
      </div>
    </div>
  );
};
