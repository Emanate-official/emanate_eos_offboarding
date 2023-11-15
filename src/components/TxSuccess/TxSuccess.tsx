import { CheckCircle2, ExternalLink } from "lucide-react";

type TxSuccessProps = {
  transactionId: string;
  children?: React.ReactNode;
};

export const TxSuccess = ({ transactionId }: TxSuccessProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-4 w-full mt-4">
      <div className="flex space-x-2">
        <CheckCircle2 className="text-green-500" />
        <span>Success! Transaction ID: </span>
      </div>
      <div
        className="flex items-center border rounded w-[320px] p-2 mt-2 cursor-pointer hover:bg-slate-400 bg-opacity-25"
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
