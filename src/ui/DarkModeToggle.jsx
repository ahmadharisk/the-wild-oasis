import ButtonIcon from "@/ui/ButtonIcon.jsx";
import {HiOutlineMoon, HiOutlineSun} from "react-icons/hi2";
import {useDarkMode} from "@/context/DarkModeContext.jsx";

function DarkModeToggle() {
  const {isDarkMode, toggleDarkMode} = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  )
}

export default DarkModeToggle;