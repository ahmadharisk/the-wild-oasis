import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateCurrentUser as updateCurrentUserApi} from "@/services/apiAuth.js";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {mutate: updateCurrentUser, isLoading: isUpdating} = useMutation({
      mutationFn: updateCurrentUserApi,
      onSuccess: () => {
        toast.success("user successfully updated")
        queryClient.invalidateQueries({
          queryKey: ["user"]
        })
      },
      onError: error => {
        toast.error(error.message);
      }
    });

  return {updateCurrentUser, isUpdating};
}