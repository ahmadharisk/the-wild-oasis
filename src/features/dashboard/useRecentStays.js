import {useSearchParams} from "react-router-dom";
import {subDays} from "date-fns";
import {useQuery} from "@tanstack/react-query";
import {getStaysAfterDate} from "@/services/apiBookings.js";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"))
  const queryDate = subDays(new Date(), numDays).toISOString();

  const {data: stays, isLoading} = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`]
  });

  const confirmedStays = stays?.filter(item => {
    return item.status ==="checked-in" || item.status === "checked-out"
  })

  return {isLoading, stays, confirmedStays, numDays}
}