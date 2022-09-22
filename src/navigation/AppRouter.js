import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { AddPost } from "../features/AddPost/AddPost";
import { useTheme } from "react-native-paper";
import { Login } from "../features/Login/Login";
import { MainPage } from "../features/MainPage/MainPage";
import { AddLink } from "../features/SettingsProfile/SettingsProfileBusiness/SettingsLink/AddLink/AddLink";
import { SettingsLink } from "../features/SettingsProfile/SettingsProfileBusiness/SettingsLink/SettingsLink";
import { SettingsOpenHour } from "../features/SettingsProfile/SettingsProfileBusiness/SettingsOpenHour/SettingsOpenHour";
import { SettingsProfileBusiness } from "../features/SettingsProfile/SettingsProfileBusiness/SettingsProfileBusiness";
import { SettingsProfileNonBusiness } from "../features/SettingsProfile/SettingsProfileNonBusiness/SettingsProfileNonBusiness";
import { SignUp } from "../features/SignUp/SignUp";
import { SettingsAddProduct } from "../features/SettingsAddProduct/SettingsAddProduct";
import { WelcomePage } from "../features/WelcomePage/WelcomePage";
import { CaptionColor } from "../shared/components/Label";
import { TimelineDetailPage } from "../features/TimelineDetailPage/TimelineDetailPage";
import { ROUTE } from "../shared/constants/NavigationConstants";
import { useAuth } from "../shared/context/AuthContext";
import { NonBusinessProfile } from "../features/Profile/NonBusinessProfile";
import { BusinessProfile } from "../features/Profile/BusinessProfile";
import { SettingsAddFAQ } from "../features/SettingsAddFAQ/SettingsAddFAQ";

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
               setInitialRoute(ROUTE.WELCOME_PAGE);
            }
         } catch (e) {
            setInitialRoute(ROUTE.WELCOME_PAGE);
         }
      }
      onValidToken();
   }, []);

   return (
      <Stack.Navigator initialRouteName={initialRoute} >
         <Stack.Group screenOptions={{ headerShown: false }} >
            <Stack.Screen name={ROUTE.WELCOME_PAGE} component={WelcomePage} />
            <Stack.Screen name={ROUTE.SIGNUP} component={SignUp} />
            <Stack.Screen name={ROUTE.SETTINGS_NON_BUSINESS} component={SettingsProfileNonBusiness} />
            <Stack.Screen name={ROUTE.LOGIN} component={Login} />
            <Stack.Screen name={ROUTE.SETTINGS_BUSINESS} component={SettingsProfileBusiness} />
            <Stack.Screen name={ROUTE.SETTINGS_OPEN_HOUR} component={SettingsOpenHour} />
            <Stack.Screen name={ROUTE.SETTINGS_LINKS} component={SettingsLink} />
            <Stack.Screen name={ROUTE.MAIN} component={MainPage} />
         </Stack.Group >

         <Stack.Screen name={ROUTE.ADD_POST} component={AddPost} options={({ navigation }) => ({
            headerTitle: 'Add Post',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "rgb(71,82,100)" }
         })} />
         <Stack.Screen name={ROUTE.ADD_PRODUCT} component={SettingsAddProduct} options={({ navigation }) => ({
            headerTitle: 'Add',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "rgb(71,82,100)" }
         })} />
         <Stack.Screen name={ROUTE.ADD_FAQ} component={SettingsAddFAQ} options={({ navigation }) => ({
            headerTitle: 'Add',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "rgb(71,82,100)" }
         })} />
         <Stack.Screen name={ROUTE.DETAIL_TIMELINE} component={TimelineDetailPage} options={({ navigation, route }) => ({
            headerTitle: 'Post',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "rgb(71,82,100)" }
         })} />
         <Stack.Screen name={ROUTE.NON_BUSINESS_PROFILE} component={NonBusinessProfile} options={({ navigation }) => ({
            headerTitle: 'Non Business Profile',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "rgb(71,82,100)" }
         })} />
         <Stack.Screen name={ROUTE.BUSINESS_PROFILE} component={BusinessProfile} options={({ navigation }) => ({
            headerTitle: 'Business Profile',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "rgb(71,82,100)" }
         })} />
         <Stack.Screen name={ROUTE.SETTINGS_NON_BUSINESS} component={SettingsProfileNonBusiness} options={({ navigation }) => ({
            headerTitle: 'Edit Profile',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
         })} />
         <Stack.Screen name={ROUTE.SETTINGS_BUSINESS} component={SettingsProfileBusiness} options={({ navigation }) => ({
            headerTitle: 'Edit Profile',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
         })} />

         <Stack.Group screenOptions={{ presentation: "modal", }}>
            <Stack.Screen name={ROUTE.ADD_LINK} component={AddLink}
               options={{
                  headerTitle: 'Add Link',
                  headerBackImage: () => <FontAwesome size={24} name={'chevron-left'} color={'#f4f4f4'} />,
                  headerTintColor: '#f4f4f4',
                  headerRight: () => <View>
                     <CaptionColor text={'Save'} style={theme?.pallete?.lightBlue} />
                  </View>
               }}
            />
         </Stack.Group>
      </Stack.Navigator >
   )
}