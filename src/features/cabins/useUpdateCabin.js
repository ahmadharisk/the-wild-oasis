import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "@/services/apiCabins.js";
import toast from "react-hot-toast";

export function useUpdateCabin() {
const queryClient = useQueryClient();
  const {isLoading: isUpdating, mutate: updateCabin} = useMutation({
    mutationFn: ({newCabinData, id, existingImage}) => createEditCabin(newCabinData, id, existingImage),
    onSuccess: () => {
      toast.success("Cabin successfully updated")
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      })
    },
    onError: error => {
      toast.error(error.message)
    }
  });

  return {
    isUpdating,
    updateCabin
  }
}
