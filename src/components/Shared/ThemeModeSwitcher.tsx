import { useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setThemeMode } from '../../redux';
import { THEMES_MODE } from '../../enum';

const ThemeModeSwitcher = () => {

  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.remove(THEMES_MODE.LIGHT, THEMES_MODE.DARK);
    document.documentElement.classList.add(currentTheme);
  }, [currentTheme])

  const handleSwitch = () => {
    if (currentTheme == THEMES_MODE.LIGHT) {
      dispatch(setThemeMode(THEMES_MODE.DARK))
    } else {
      dispatch(setThemeMode(THEMES_MODE.LIGHT))
    }
  }

  return (
    <button
      className="flex justify-center cursor-pointer items-center w-10 h-10 rounded-full bg-primary"
      onClick={handleSwitch}
    >
      {currentTheme == THEMES_MODE.DARK ? (
        <CiLight size="24" />
      ) : (
        <MdDarkMode size="24" />
      )}
    </button>
  )
}

export default ThemeModeSwitcher