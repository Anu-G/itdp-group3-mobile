import { AntDesign, Entypo, Foundation } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Dimensions, Image, StyleSheet, View } from "react-native";
import { BusinessProfile } from "../features/Profile/BusinessProfile";
import { getProfile } from "../features/Profile/Slice/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ROUTE } from "../shared/constants/NavigationConstants";
import { useDep } from "../shared/context/DependencyContext";
import { useTheme } from "../shared/context/ThemeContext";
import { checkErr } from "../utils/CommonUtils";
import { TimelinePage } from "../features/TimelinePage/TimelinePage";
import { NonBusinessProfile } from "../features/Profile/NonBusinessProfile";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsAddFAQ } from "../features/SettingsAddFAQ/SettingsAddFAQ";
import { Setting } from "../features/Setting/Setting";
import { EditPost } from "../features/EditPost/EditPost";
import { EditProfile } from "../features/EditProfile/EditProfile";
import { ManageProductComponent } from "../features/Manage Product/ManageProduct";
import { SettingsEditProduct } from "../features/SettingsEditProduct/SettingsEditProduct";
import { CatalogPage } from "../features/CategorizePage/CatalogPage";
import { Account } from "../features/Account/Account";
import { EditAccount } from "../features/Account/EditAccount";
import { ChangePassword } from "../features/Account/ChangePassword";
import { StaticPage } from "../features/StaticPage/StaticPage";
import { HelpCenter } from "../features/StaticPage/HelpCenter/HelpCenter";
import { Home } from "../features/Home/Home";
import { SettingsProfileNonBusiness } from "../features/SettingsProfile/SettingsProfileNonBusiness/SettingsProfileNonBusiness";
import { SettingsProfileBusiness } from "../features/SettingsProfile/SettingsProfileBusiness/SettingsProfileBusiness";
import { Search } from "../features/Search/Search";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export const TabRouter = _ => {
   const theme = useTheme();
   const style = styling(theme.state.style);
   const user = useSelector((state) => state.auth);
   const profile = useSelector((state) => state.profile);
   const { profileService } = useDep();
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         try {
            let id = user.accountId
            if (user.roleId === 2) {
               let response = await profileService.doGetBusinessProfile({
                  account_id: `${id}`
               });
               dispatch(getProfile({
                  profileId: response.data.data.business_profile.ID,
                  profileImage: response.data.data.business_profile.profile_image
               }));
            } else {
               let response = await profileService.doGetNonBusinessProfile({
                  account_id: `${id}`
               });
               dispatch(getProfile({
                  profileId: response.data.data.non_business_profile.ID,
                  profileImage: response.data.data.non_business_profile.profile_image
               }));
            }
         } catch (err) {
            checkErr(err)
         }
      })();
   }, [user.roleId !== 0]);

   return (
      <Tab.Navigator initialRouteName={ROUTE.MAIN} screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
               case ROUTE.HOME:
                  return (
                     <View style={style.iconCtn}>
                        <Entypo name="home" size={style.tabIcon.size} color={color} style={focused ? style.textShadow : ''} />
                     </View>
                  )
               case ROUTE.SEARCH:
                  return (
                     <View style={style.iconCtn}>
                        <Foundation name='magnifying-glass' size={style.tabIcon.size} color={color} style={focused ? style.textShadow : ''} />
                     </View>
                  )
               case ROUTE.PROFILE:
                  return (
                     <View style={focused ? [style.imageCtn] : ''}>
                        <Image source={profile.profileImage === '' ? require('../../assets/images/user-default.png') : { uri: profile.profileImage }} style={style.imageStyle} />
                     </View>
                  )
               default:
                  <AntDesign name="exclamationcircleo" size={style.tabIcon.size} color={color} />
            }
         },
         tabBarActiveTintColor: style.tabIcon.activeColor,
         tabBarInactiveTintColor: style.tabIcon.inactiveColor,
         tabBarStyle: { ...style.tabBar },
         tabBarLabel: () => null,
      })}>
         <Tab.Group screenOptions={{ headerShown: false }} >
            <Tab.Screen name={ROUTE.HOME} component={TimelineStack} />
            <Tab.Screen name={ROUTE.SEARCH} component={Search} />
            <Tab.Screen name={ROUTE.PROFILE} component={ProfileStack} />
         </Tab.Group >
      </Tab.Navigator >
   )
}

const TabStack = _ => {
   return (
      <Stack.Navigator initialRouteName={ROUTE.SEARCH_INITIAL} >
         <Stack.Group >
            <Stack.Screen name={ROUTE.SEARCH_INITIAL} component={Setting} options={({ navigation }) => ({
               headerTitle: 'Setting',
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
         </Stack.Group >
      </Stack.Navigator>
   )
}

const TimelineStack = _ => {
   return (
      <Stack.Navigator initialRouteName={ROUTE.TIMELINE} >
         <Stack.Screen name={ROUTE.TIMELINE} component={TimelinePage} options={{
            headerTitle: 'LogoTokTok',
            headerStyle: { height: 48 },
            headerTransparent: true,
            headerBackground: () =>
               <View style={{ backgroundColor: 'rgba(71,82,100,0.9)', height: 48 }}></View>
         }} />

         <Stack.Group screenOptions={{ headerShown: false }} >
            <Stack.Screen name={ROUTE.BUSINESS_PROFILE} component={BusinessProfile} />
            <Stack.Screen name={ROUTE.NON_BUSINESS_PROFILE} component={NonBusinessProfile} />
         </Stack.Group >
      </Stack.Navigator>
   )
}

const ProfileStack = _ => {
   const user = useSelector((state) => state.auth);
   return (
      <Stack.Navigator initialRouteName={user.roleId === 2 ? ROUTE.PROFILE_BUSINESS : ROUTE.PROFILE_NON_BUSINESS}>
         <Stack.Group>
            <Stack.Screen name={ROUTE.PROFILE_BUSINESS} component={BusinessProfile} initialParams={{ openId: user.accountId }} options={({ navigator }) => ({
               headerTitle: '',
               headerStyle: { backgroundColor: "rgb(71,82,100)", height: 48 },
            })} />
            <Stack.Screen name={ROUTE.PROFILE_NON_BUSINESS} component={NonBusinessProfile} initialParams={{ openId: user.accountId }} options={({ navigator }) => ({
               headerTitle: '',
               headerStyle: { backgroundColor: "rgb(71,82,100)", height: 48 }
            })} />
            <Stack.Screen name={ROUTE.SETTINGS_ACCOUNT} component={EditProfile} options={({ navigator }) => ({
               headerTitle: 'Settings',
               headerTitleAlign: "center",
               headerTitleStyle: { color: "white" },
               headerStyle: { backgroundColor: "rgb(71,82,100)" }
            })} />
            <Stack.Screen name={ROUTE.EDIT_ACCOUNT} component={Account} options={({ navigator }) => ({
               headerTitle: 'Account',
               headerTitleAlign: "center",
               headerTitleStyle: { color: "white" },
               headerStyle: { backgroundColor: "rgb(71,82,100)" }
            })} />
            <Stack.Screen name={ROUTE.CHANGE_PASSWORD} component={ChangePassword} options={({ navigator }) => ({
               headerTitle: 'Account',
               headerTitleAlign: "center",
               headerTitleStyle: { color: "white" },
               headerStyle: { backgroundColor: "rgb(71,82,100)" }
            })} />
            <Stack.Screen name={ROUTE.STATIC_PAGE} component={StaticPage} options={({ navigator }) => ({
               headerTitle: 'Support',
               headerTitleAlign: "center",
               headerTitleStyle: { color: "white" },
               headerStyle: { backgroundColor: "rgb(71,82,100)" }
            })} />
            <Stack.Screen name={ROUTE.HELP_CENTER} component={HelpCenter} options={({ navigation }) => ({
               headerTitle: 'Help Center',
               headerTitleAlign: "center",
               headerTitleStyle: { color: "white" },
               headerStyle: { backgroundColor: "rgb(71,82,100)" }
            })} />
            <Stack.Screen name={ROUTE.MANAGE_PRODUCT} component={ManageProductComponent} options={({ navigation }) => ({
               headerTitle: 'Manage Product',
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
            <Stack.Screen name={ROUTE.EDIT_PROFILE} component={user.roleId === 2 ? SettingsProfileBusiness : SettingsProfileNonBusiness} options={({ navigation }) => ({
               headerTitle: 'Edit Profile',
               headerTitleAlign: "center",
               headerTitleStyle: { color: "white" },
            })} />

            {/* =========================== ACCOUNT ============================== */}
            <Stack.Screen name={ROUTE.EDIT_PRODUCT} component={SettingsEditProduct} options={({ navigation }) => ({
               headerTitle: 'Edit Product',
               headerTitleAlign: "center",
               headerTitleStyle: { color: "white" },
               headerStyle: { backgroundColor: "rgb(71,82,100)" }
            })} />
         </Stack.Group>
      </Stack.Navigator>
   )
}

const styling = (theme) => StyleSheet.create({
   tabIcon: { ...theme?.tabIcon },
   tabBar: {
      backgroundColor: theme?.colors?.tabBackground,
      minHeight: 64,
   },
   tabShadow: {
      shadowColor: "#000000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.21,
      shadowRadius: 8.19,
      elevation: 11
   },
   textShadow: {
      textShadowColor: 'rgba(0,0,0, 0.75)',
      textShadowOffset: {
         height: 2,
      },
      textShadowRadius: 4,
   },
   imageStyle: {
      height: 28,
      width: 28,
      borderRadius: 20
   },
   imageCtn: {
      borderWidth: 2,
      borderRadius: 20,
      borderColor: '#FED154',
      shadowColor: 'rgba(0,0,0)',
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowRadius: 4,
      elevation: 2,
      shadowOpacity: 0.75
   },
   iconCtn: {
      height: 32,
      width: 32,
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
   }
})