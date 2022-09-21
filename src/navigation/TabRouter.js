import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { Home } from "../features/Home/Home";
import { Setting } from "../features/Setting/Setting";
import { TimelinePage } from "../features/TimelinePage/TimelinePage";
import { ROUTE } from "../shared/constants/NavigationConstants";
import { useTheme } from "../shared/context/ThemeContext";

const Tab = createBottomTabNavigator();
export const TabRouter = _ => {
   const theme = useTheme();
   const style = styling(theme.state.style);

   return (
      <Tab.Navigator screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
               case ROUTE.TIMELINE:
                  return <Entypo name="home" size={style.tabIcon.size} color={color} />
               case ROUTE.SETTING:
                  return <FontAwesome name="gear" size={style.tabIcon.size} color={color} />
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