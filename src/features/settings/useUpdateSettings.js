import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateSetting as updateSettingApi} from "@/services/apiSettings.js";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const {mutate: updateSettings, isLoading: isUpdating} = useMutation({
    mutationFn: (newSettings) => updateSettingApi(newSettings),
    onSuccess: () => {
      toast.success("Settings successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"]
      });
    },
    onError: error => {
      toast.error(error.message)
    }
  });

  return {
    updateSettings,
    isUpdating
  }
}