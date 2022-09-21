import { FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Login } from "../features/Login/Login";
import { MainPage } from "../features/MainPage/MainPage";
import { AddLink } from "../features/SettingsProfile/SettingsProfileBusiness/SettingsLink/AddLink/AddLink";
import { SettingsLink } from "../features/SettingsProfile/SettingsProfileBusiness/SettingsLink/SettingsLink";
import { SettingsOpenHour } from "../features/SettingsProfile/SettingsProfileBusiness/SettingsOpenHour/SettingsOpenHour";
import { SettingsProfileBusiness } from "../features/SettingsProfile/SettingsProfileBusiness/SettingsProfileBusiness";
import { SettingsProfileNonBusiness } from "../features/SettingsProfile/SettingsProfileNonBusiness/SettingsProfileNonBusiness";
import { SignUp } from "../features/SignUp/SignUp";
import { WelcomePage } from "../features/WelcomePage/WelcomePage";
import { CaptionColor } from "../shared/components/Label";
import { ROUTE } from "../shared/constants/NavigationConstants";
import { useAuth } from "../shared/context/AuthContext";

const Stack = createStackNavigator();
export const AppRouter = _ => {
   const theme = useTheme()
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
      <Stack.Navigator initialRouteName={ROUTE.SETTINGS_LINKS} >
         <Stack.Group screenOptions={{ headerShown: false }} >
            <Stack.Screen name={ROUTE.LOGIN} component={Login} />
            <Stack.Screen name={ROUTE.MAIN} component={MainPage} />
            <Stack.Screen name={ROUTE.SIGNUP} component={SignUp} />
            <Stack.Screen name={ROUTE.SETTINGS_NON_BUSINESS} component={SettingsProfileNonBusiness}/>
            <Stack.Screen name={ROUTE.SETTINGS_BUSINESS} component={SettingsProfileBusiness}/>
            <Stack.Screen name={ROUTE.SETTINGS_OPEN_HOUR} component={SettingsOpenHour}/>
            <Stack.Screen name={ROUTE.SETTINGS_LINKS} component={SettingsLink} />
            <Stack.Screen name={ROUTE.WELCOME_PAGE} component={WelcomePage} />
         </Stack.Group>
         <Stack.Group screenOptions={{presentation: "modal",  }}>
            <Stack.Screen name={ROUTE.ADD_LINK} component={AddLink} 
               options={{
               headerTitle: 'Add Link',
               headerBackImage: () => <FontAwesome size={24} name={'chevron-left'} color={'#f4f4f4'} />,
               headerTintColor: '#f4f4f4',
               headerRight: () => <View>
                  <CaptionColor text={'Save'} style={theme?.pallete?.lightBlue}/>
               </View>
               }}
             />
         </Stack.Group>
      </Stack.Navigator>
   )
}