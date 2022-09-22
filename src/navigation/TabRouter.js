import { AntDesign, Entypo, FontAwesome, FontAwesome5, Fontisto, Foundation, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { AddPost } from "../features/AddPost/AddPost";
import { Home } from "../features/Home/Home";
import { BusinessProfile } from "../features/Profile/BusinessProfile";
import { Setting } from "../features/Setting/Setting";
import { ROUTE } from "../shared/constants/NavigationConstants";
import { useTheme } from "../shared/context/ThemeContext";

const Tab = createBottomTabNavigator();
export const TabRouter = _ => {
   const theme = useTheme();
   const style = styling(theme.state.style);

   const [profile, setProfile] = useState('')

   return (
      <Tab.Navigator initialRouteName={ROUTE.MAIN} screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
               case ROUTE.HOME:
                  return (
                  <View style={style.iconCtn}>
                     <Entypo name="home" size={style.tabIcon.size} color={color} style={focused ? style.textShadow : ''}/>
                  </View>
                  )
               case ROUTE.ADD_POST:

                  return (
                  <View style={style.iconCtn}>
                     <Foundation name='magnifying-glass' size={style.tabIcon.size} color={color} style={focused ? style.textShadow : ''} />
                  </View>
                  )
                  case ROUTE.SETTING:
                     return (
                     <View style={style.iconCtn}>
                        <Octicons name="bell-fill" size={style.tabIcon.size -4} color={color} style={focused ? style.textShadow : ''} />
                     </View>
                     )
               case ROUTE.BUSINESS_PROFILE:
                  return (
                     <View style={focused ? [style.imageCtn] : ''}>
                        <Image source={require('../../assets/images/user-default.png')} style={style.imageStyle}/>
                     </View>                    
                  )
               default:
                  <AntDesign name="exclamationcircleo" size={style.tabIcon.size } color={color} />
            }
         },
         tabBarActiveTintColor: style.tabIcon.activeColor,
         tabBarInactiveTintColor: style.tabIcon.inactiveColor,
         tabBarStyle: { ...style.tabBar },
         tabBarLabel: () => null,
      })}>
         <Tab.Group screenOptions={{ headerShown: false }} >
            <Tab.Screen name={ROUTE.HOME} component={Home} />

            {/* dummy */}
            <Tab.Screen name={ROUTE.ADD_POST} component={AddPost} />
            <Tab.Screen name={ROUTE.SETTING} component={Setting} />
            <Tab.Screen name={ROUTE.BUSINESS_PROFILE} component={BusinessProfile} />
         </Tab.Group>
      </Tab.Navigator>
   )
}

const styling = (theme) => StyleSheet.create({
   tabIcon: { ...theme?.tabIcon },
   tabBar: {
      backgroundColor: theme?.colors?.tabBackground,
      minHeight: 64,
      // paddingTop: 12,
      // justifyContent: "center",
      },
   tabShadow: {
      shadowColor: "#000000",
      shadowOffset: {
      width: 0,
      height: 8,
      },
      shadowOpacity:  0.21,
      shadowRadius: 8.19,
      elevation: 11
   },
   textShadow: {
      textShadowColor: 'rgba(0,0,0, 0.75)',
      textShadowOffset: {
         height: 2,
         // width: 2
      },
      textShadowRadius: 4,
      // backgroundColor: 'red',
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
      // backgroundColor: 'red'
   }
})