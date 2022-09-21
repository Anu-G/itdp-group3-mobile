import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Home } from "../features/Home/Home";
import { BusinessProfile } from "../features/Profile/BusinessProfile";
import { NonBusinessProfile } from "../features/Profile/NonBusinessProfile";
import { getProfile } from "../features/Profile/Slice/ProfileSlice";
import { Setting } from "../features/Setting/Setting";
import { ROUTE } from "../shared/constants/NavigationConstants";
import { useDep } from "../shared/context/DependencyContext";
import { useTheme } from "../shared/context/ThemeContext";
import { checkErr } from "../utils/CommonUtils";

const Tab = createBottomTabNavigator();
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
                  profileImage: response.data.data.business_profile.profile_image
               }));
            } else {
               let response = await profileService.doGetNonBusinessProfile({
                  account_id: `${id}`
               });
               dispatch(getProfile({
                  profileImage: response.data.data.non_business_profile.profile_image
               }));
            }
         } catch (err) {
            checkErr(err)
         }
      })();
   }, [user.roleId !== 0]);

   return (
      <Tab.Navigator screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
               case ROUTE.HOME:
                  return <Entypo name="home" size={style.tabIcon.size} color={color} />
               case ROUTE.SEARCH:
                  return <Entypo name="magnifying-glass" size={style.tabIcon.size} color={color} />
               case ROUTE.NOTIFICATION:
                  return <MaterialCommunityIcons name="bell" size={style.tabIcon.size} color={color} />
               case ROUTE.BUSINESS_PROFILE:
                  return profile.profileImage !== '' && <Image source={{ uri: profile.profileImage }} style={{ width: style.tabIcon.size, height: style.tabIcon.size, borderRadius: 25 }} />
               case ROUTE.NON_BUSINESS_PROFILE:
                  return profile.profileImage !== '' && <Image source={{ uri: profile.profileImage }} style={{ width: style.tabIcon.size, height: style.tabIcon.size, borderRadius: 25 }} />
               default:
                  <AntDesign name="exclamationcircleo" size={style.tabIcon.size} color={color} />
            }
         },
         tabBarActiveTintColor: style.tabIcon.activeColor,
         tabBarInactiveTintColor: style.tabIcon.inactiveColor,
         tabBarStyle: { ...style.tabBar },
         tabBarLabel: () => null
      })}>
         <Tab.Group screenOptions={{ headerShown: false }} >
            <Tab.Screen name={ROUTE.HOME} component={Home} />
            <Tab.Screen name={ROUTE.SEARCH} component={Setting} />
            <Tab.Screen name={ROUTE.NOTIFICATION} component={Setting} />
            {user.roleId === 2 ? <Tab.Screen name={ROUTE.BUSINESS_PROFILE} component={BusinessProfile} /> : <Tab.Screen name={ROUTE.NON_BUSINESS_PROFILE} component={NonBusinessProfile} />}
         </Tab.Group>
      </Tab.Navigator>
   )
}

const styling = (theme) => StyleSheet.create({
   tabIcon: { ...theme?.tabIcon },
   tabBar: {
      backgroundColor: theme?.colors?.tabBackground,
      height: 64
   }
})