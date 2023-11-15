import { useContext, createRef } from "react";
import { UALContext } from "ual-reactjs-renderer";

import { useTransactions } from "hooks";

import { Input } from "components/Input";
import { Button } from "components/Button";

export const ActionOptions = () => {
  const { activeUser } = useContext(UALContext) as any;
  const { accountName } = activeUser;
  const { ungrowAction, unstakeAction } = useTransactions({ activeUser });
  const ungrowInputRef = createRef<HTMLInputElement>();
  const unstakeInputRef = createRef<HTMLInputElement>();

  return (
    <div className="text-white w-full space-y-5">
      <div className="border w-full my-10 text-white" />

      <div className="flex items-center flex-col">
        <h3 className="text-white pb-4 text-2xl">UNGROW EMT</h3>
        <div className="flex space-x-4">
          <Input
            className="w-40"
            placeholder="ex: 100 EMT"
            ref={ungrowInputRef}
          />
          <Button
            variant="outline"
            onClick={() => {
              if (ungrowInputRef.current?.value) {
                ungrowAction(accountName, ungrowInputRef.current!.value);
              }
            }}
          >
            UNGROW
          </Button>
        </div>
      </div>

      <div className="flex items-center flex-col">
        <h3 className="text-white pb-4 text-2xl">UNSTAKE EMT</h3>
        <div className="flex space-x-4">
          <Input
            className="w-40"
            placeholder="ex: 100 EMT"
            ref={unstakeInputRef}
          />
          <Button
            variant="outline"
            onClick={() => {
              if (unstakeInputRef.current?.value) {
                unstakeAction(accountName, unstakeInputRef.current!.value);
              }
            }}
          >
            UNSTAKE
          </Button>
        </div>
      </div>
    </div>
  );
};
