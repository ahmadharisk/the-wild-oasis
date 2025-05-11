import {useQuery} from "@tanstack/react-query";
import {getStaysTodayActivity} from "@/services/apiBookings.js";

export function useTodayActivity() {

  const {data: activities, isLoading} = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"]
  })

  return {activities, isLoading}
}