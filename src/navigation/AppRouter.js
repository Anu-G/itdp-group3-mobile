import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Login } from "../features/Login/Login";
import { MainPage } from "../features/MainPage/MainPage";
import { SignUp } from "../features/SignUp/SignUp";
import { ROUTE } from "../shared/constants/NavigationConstants";
import { useAuth } from "../shared/context/AuthContext";

const Stack = createStackNavigator();
export const AppRouter = _ => {
   const { isTokenExist } = useAuth();
   const [initialRoute, setInitialRoute] = useState(null);
   useEffect(() => {
      const onValidToken = async () => {
         try {
            const resp = await isTokenExist();
            if (resp) {
               setInitialRoute(ROUTE.MAIN);
            } else {
               setInitialRoute(ROUTE.LOGIN);
            }
         } catch (e) {
            setInitialRoute(ROUTE.LOGIN);
         }
      }
      onValidToken();
   }, []);

   return (
      <Stack.Navigator initialRouteName={ROUTE.SIGNUP} >
         <Stack.Group screenOptions={{ headerShown: false }} >
            <Stack.Screen name={ROUTE.LOGIN} component={Login} />
            <Stack.Screen name={ROUTE.MAIN} component={MainPage} />
            <Stack.Screen name={ROUTE.SIGNUP} component={SignUp} />
         </Stack.Group>
      </Stack.Navigator>
   )
}