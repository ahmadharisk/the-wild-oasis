import {useMutation, useQueryClient} from "@tanstack/react-query";
import {login as loginApi} from "@/services/apiAuth.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {mutate: login, isLoading} = useMutation({
    mutationFn: ({email, password}) => loginApi({email, password}),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user)
      navigate("/dashboard", {replace: true})
    },
    onError: (error) => {
      console.log(error)
      toast.error("provided email or password are incorrect")
    }
  });

  return {login, isLoading}
}