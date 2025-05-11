import {useQuery} from "@tanstack/react-query";
import {getCabins} from "@/services/apiCabins.js";

export function useCabins() {
  const {
    data: cabins,
    isLoading,
    error
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins
  })

  return {
    cabins,
    isLoading,
    error
  }
}