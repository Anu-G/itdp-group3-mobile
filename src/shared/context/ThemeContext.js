import { createContext, useContext, useReducer } from "react";
import { DARKMODE, LIGHTMODE } from "../constants/ActionConstant";
import { themeDark, themeLight } from "../../apps/Theme";
import { storage } from "../../apps/Storage";
import { KEY } from "../constants/StoreConstants";

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
   darkMode: false,
   style: themeLight
}

const themeReducer = (state = initialState, action) => {
   switch (action.type) {
      case LIGHTMODE:
         try {
            (async () => await storage.storeData(KEY.THEME, LIGHTMODE))();
         } catch (e) {
            throw e;
         }
         return { darkMode: false, style: themeLight };
      case DARKMODE:
         try {
            (async () => await storage.storeData(KEY.THEME, DARKMODE))();
         } catch (e) {
            throw e;
         }
         return { darkMode: true, style: themeDark };
      default:
         return state;
   }
}