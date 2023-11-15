import { Button } from "components/Button";
import { useToast } from "hooks";
import { useContext } from "react";
import { UALContext } from "ual-reactjs-renderer";

export const SignedOut = () => {
  const { showModal } = useContext(UALContext) as any;
  const { toast } = useToast();

  return (
    <section>
      <Button
        variant="outline"
        onClick={() => {
          showModal();
          // toast({
          //   title: "Test",
          //   variant: "success",
          //   description: "Test",
          // });
        }}
      >
        Connect Wallet
      </Button>
    </section>
  );
};
