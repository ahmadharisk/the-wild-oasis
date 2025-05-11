import Button from "../../ui/Button";
import {useCheckout} from "@/features/check-in-out/useCheckout.js";

function CheckoutButton({ bookingId }) {
  const {checkOut, isCheckingOut} = useCheckout();

  return (
    <Button
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
      variation="primary"
      size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
