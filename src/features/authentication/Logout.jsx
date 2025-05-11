import ButtonIcon from "@/ui/ButtonIcon.jsx";
import {HiArrowRightOnRectangle} from "react-icons/hi2";
import {useLogout} from "@/features/authentication/useLogout.js";
import SpinnerMini from "@/ui/SpinnerMini.jsx";

function Logout() {
  const {logout, isLoading} = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoading}>
      { isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  )
}

export default Logout;