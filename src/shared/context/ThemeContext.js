import { createContext, useContext, useReducer } from "react";
import { DARKMODE, LIGHTMODE } from "../constants/ActionConstant";
import { themeDark, themeLight } from "../../apps/Theme";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
   const [state, dispatch] = useReducer(themeReducer, initialState);

   return (
      <ThemeContext.Provider value={{ state, dispatch }}>
         {children}
      </ThemeContext.Provider>
   );
}

export const useTheme = _ => {
   return useContext(ThemeContext);
}

const initialState = {
   darkMode: true,
   style: themeLight
}

const themeReducer = (state = initialState, action) => {
   switch (action.type) {
      case LIGHTMODE:
         return { darkMode: false, style: themeLight };
      case DARKMODE:
         return { darkMode: true, style: themeDark };
      default:
         return state;
   }
}