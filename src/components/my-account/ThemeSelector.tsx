import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setTheme } from "../../redux/ThemeSlice";

type ThemeProps = {
  theme: {
    option: string;
    desc: string;
    value: 'light' | 'dark';
  }
}

const ThemeSelector = ({ theme }: ThemeProps) => {
  const themeMode = useSelector((state: RootState) => state.theme.themeMode);
  const dispatch = useDispatch();

  return (
    <div
      className={`p-3 border my-3 rounded-xl flex gap-3 items-center cursor-pointer transition-all`}
      onClick={() => dispatch(setTheme(theme.value))}
    >
      <input
        type="radio"
        name="theme"
        id={`theme-${theme.value}`}
        value={theme.value}
        checked={themeMode === theme.value}
        onChange={() => dispatch(setTheme(theme.value))}
        className="accent-blue-500"
      />
      <div className="flex flex-col">
        <label htmlFor={`theme-${theme.value}`} className="text-md font-medium cursor-pointer">
          {theme.option}
          <p className="text-sm mt-1">{theme.desc}</p>
        </label>
      </div>
    </div>
  );
}

export default ThemeSelector;
