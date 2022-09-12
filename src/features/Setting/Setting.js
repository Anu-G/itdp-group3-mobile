import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Snackbar } from "react-native-paper";
import { store } from "../../apps/Storage";
import { ButtonComponent } from "../../shared/components/Button";
import { DARKMODE, LIGHTMODE } from "../../shared/constants/ActionConstant";
import { ROUTE } from "../../shared/constants/NavigationConstants";
import { KEY } from "../../shared/constants/StoreConstants";
import { useAuth } from "../../shared/context/AuthContext";
import { useTheme } from "../../shared/context/ThemeContext"
import { useViewState } from "../../shared/hooks/ViewState";
import { checkErr } from "../../utils/CommonUtils";

export const Setting = _ => {
   // theme
   const theme = useTheme();

   const onThemeSwitch = _ => {
      if (theme.state.darkMode) {
         theme.dispatch({ type: LIGHTMODE });
      } else {
         theme.dispatch({ type: DARKMODE });
      }
   }

   // state
   const { viewState, setLoading, setError } = useViewState();
   const [visible, setVisible] = useState(false);

   const onDismissSnackBar = _ => {
      setVisible(false);
      if (viewState.error !== null) {
         setError(null);
      };
   };

   // service
   const { onLogout } = useAuth();
   const navigation = useNavigation();

   const doLogout = async _ => {
      try {
         if (await store.getData(KEY.EXPIRED) * 1000 >= Date.now()) {
            if (await onLogout()) {
               navigation.replace(ROUTE.LOGIN);
            };
         } else {
            navigation.replace(ROUTE.LOGIN);
         }
      } catch (e) {
         setError(checkErr(e));
      }
   }

   return (
      <>
         <ButtonComponent label={'Switch Theme'} onClick={onThemeSwitch} />
         <ButtonComponent label={'Logout'} onClick={doLogout} />
         {viewState.error !== null && !visible ? setVisible(true) : null}
         {viewState.error !== null && <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>{viewState.error}</Snackbar>}
      </>
   )
}