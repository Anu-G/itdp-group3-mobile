import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { EditProfile } from "../features/EditProfile/EditProfile";
import { Home } from "../features/Home/Home";
import { authSlice } from "../features/Login/Slice/AuthSlice";
import { ManageProductComponent } from "../features/Manage Product/ManageProduct";
import { BusinessProfile } from "../features/Profile/BusinessProfile";
import { Setting } from "../features/Setting/Setting";
import { TimelinePage } from "../features/TimelinePage/TimelinePage";
import { AvatarNavbar, AvatarSmall } from "../shared/components/ImageProfile";
import { ROUTE } from "../shared/constants/NavigationConstants";
import { useDep } from "../shared/context/DependencyContext";
import { useTheme } from "../shared/context/ThemeContext";
import { checkErr } from "../utils/CommonUtils";

const Tab = createBottomTabNavigator();
export const TabRouter = _ => {
   const theme = useTheme();
   const style = styling(theme.state.style);
   const user = useSelector(state=>state.auth)
   const [userData,setUData] = useState({})

   const {profileService} = useDep();

   useEffect(()=>{
      getUser()
   },[])

   const getUser = async () => {
      try {
          let response = await profileService.doGetBusinessProfile({
              account_id:`${user.accountId}`
          })
          setUData(prevState=>response.data.data)
      } catch (err) {
          console.log(err)
          checkErr(err)
      }
   }

   return (
      <Tab.Navigator screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
               case ROUTE.TIMELINE:
                  return <Entypo name="home" size={style.tabIcon.size} color={color} />
               case ROUTE.SETTING:
                  return <FontAwesome name="gear" size={style.tabIcon.size} color={color} />
               case ROUTE.BUSINESS_PROFILE:
                  return <AvatarNavbar status={`${route.name}`} source={user.profile_image} />
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
            <Tab.Screen name={ROUTE.TIMELINE} component={TimelinePage} />
            <Tab.Screen name={ROUTE.SETTING} component={Setting} />
            <Tab.Screen name={ROUTE.BUSINESS_PROFILE} component={BusinessProfile} initialParams={{openId:user.accountId}} />
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