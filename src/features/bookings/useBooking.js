import {useQuery} from "@tanstack/react-query";
import {getBooking} from "@/services/apiBookings.js";
import {useParams} from "react-router-dom";

export function useBooking() {
  const {bookingId} = useParams();

  const {
    isLoading,
    data: booking= {},
    error
  } = useQuery({
    queryFn: () => getBooking(bookingId),
    queryKey: ["bookings", bookingId],
    retry: false
  })

  return {isLoading, booking, error}
}