import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
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
import { TimelineDetailPage } from "../features/TimelineDetailPage/TimelineDetailPage";
import { ROUTE } from "../shared/constants/NavigationConstants";
import { useAuth } from "../shared/context/AuthContext";
import { DetailProductCard } from "../features/DetailProductCard/DetailProductCard";
import { EditPost } from "../features/EditPost/EditPost";
import { WelcomeStory1 } from "../features/WelcomePage/WelcomeStory1";
import { WelcomeStory2 } from "../features/WelcomePage/WelcomeStory2";
import { WelcomeStory3 } from "../features/WelcomePage/WelcomeStory3";
import { Search } from "../features/Search/Search";
import { StaticPage } from "../features/StaticPage/StaticPage";
import { HelpCenter } from "../features/StaticPage/HelpCenter/HelpCenter";
import { SplashScreen } from "../features/SplashScreen/SplashScreen";

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
            <Stack.Screen name={ROUTE.WELCOME_STORY_1} component={WelcomeStory1} />
            <Stack.Screen name={ROUTE.WELCOME_STORY_2} component={WelcomeStory2} />
            <Stack.Screen name={ROUTE.WELCOME_STORY_3} component={WelcomeStory3} />
            <Stack.Screen name={ROUTE.SIGNUP} component={SignUp} />
            <Stack.Screen name={ROUTE.LOGIN} component={Login} />
            <Stack.Screen name={ROUTE.MAIN} component={MainPage} />
            <Stack.Screen name={ROUTE.SPLASH_SCREEN} component={SplashScreen} />
         </Stack.Group >

         <Stack.Screen name={ROUTE.SETTINGS_NON_BUSINESS} component={SettingsProfileNonBusiness} options={({ navigation }) => ({
            headerTitle: 'Edit Profile',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
         })} />
         <Stack.Screen name={ROUTE.DETAIL_TIMELINE} component={TimelineDetailPage} options={({ navigation, route }) => ({
            headerTitle: 'Post',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "rgb(71,82,100)" }
         })} />
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
         <Stack.Screen name={ROUTE.SETTINGS_BUSINESS} component={SettingsProfileBusiness} options={({ navigation }) => ({
            headerTitle: 'Edit Profile',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
         })} />
         <Stack.Screen name={ROUTE.SETTINGS_LINKS} component={SettingsLink} options={({ navigation }) => ({
            headerTitle: 'Manage Business Links',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
         })} />

         <Stack.Group screenOptions={{ presentation: "modal", }}>
            <Stack.Screen name={ROUTE.ADD_LINK} component={AddLink} options={({ navigation }) => ({
               headerTitle: 'Add Link',
               headerTintColor: '#f4f4f4',
            })}
            />
         </Stack.Group>
         <Stack.Screen name={ROUTE.EDIT_POST} component={EditPost} options={({ navigation }) => ({
            headerTitle: 'Edit Post',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "rgb(71,82,100)" },
         })} />

         <Stack.Screen name={ROUTE.DETAIL_PRODUCT} component={DetailProductCard} options={({ navigation }) => ({
            headerTitle: 'Detail Product',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "rgb(71,82,100)" },
         })} />
         <Stack.Screen name={ROUTE.SEARCH} component={Search} options={({ navigation }) => ({
            headerTitle: 'Search',
            headerTitleAlign: "center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "rgb(71,82,100)" },
         })} />
      </Stack.Navigator>
   )
}