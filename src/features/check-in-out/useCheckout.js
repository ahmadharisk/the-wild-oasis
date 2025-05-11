import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "@/services/apiBookings.js";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const {isLoading: isCheckingOut, mutate: checkOut} = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, {
      status: "checked-out",
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({active: true});
    },
    onError: () => {
      toast.error("There was an error while checking out")
    }
  })

  return {checkOut, isCheckingOut}
}