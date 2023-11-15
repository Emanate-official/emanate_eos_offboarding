import { Button } from "components/Button";
import { useContext } from "react";
import { UALContext } from "ual-reactjs-renderer";

export const SignedOut = () => {
  const { showModal } = useContext(UALContext) as any;
  return (
    <section>
      <Button
        variant="outline"
        onClick={() => {
          showModal();
        }}
      >
        Connect Wallet
      </Button>
    </section>
  );
};
