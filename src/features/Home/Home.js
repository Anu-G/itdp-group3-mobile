import AnimatedLottieView from "lottie-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { MainContainer } from "../../shared/components/MainContainer"
import { Title1, Title2 } from "../../shared/components/Label"
import { storage } from "../../apps/Storage"
import { KEY } from "../../shared/constants/StoreConstants"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { ROUTE } from "../../shared/constants/NavigationConstants"
import { ButtonComponent } from "../../shared/components/Button"
import { useSelector } from "react-redux"

export const Home = _ => {
   // state
   const navigation = useNavigation();
   const user = useSelector((state) => state.auth);

   return (
      <MainContainer>
      <View style={{ paddingTop: 100, flex:1, flexDirection:'column', flexWrap:'wrap' }}>
         <AnimatedLottieView style={{ width: 200, height: 200, alignItems: 'center' }} autoPlay source={require("../../../assets/animations/Happy.json")} />
         <Title1 label={`Hello, ${user.userName}!`} />
         <ButtonComponent label={'ADD POST'} onClick={() => navigation.navigate(ROUTE.ADD_POST)} />
         <ButtonComponent label={'ADD PRODUCT'} onClick={() => navigation.navigate(ROUTE.ADD_PRODUCT)} />
         <ButtonComponent label={'ADD FAQ'} onClick={() => navigation.navigate(ROUTE.ADD_FAQ)} />
         <ButtonComponent label={'NON BUSINESS PROFILE'} onClick={() => navigation.navigate(ROUTE.NON_BUSINESS_PROFILE)}/>
         <ButtonComponent label={'BUSINESS PROFILE'} onClick={() => navigation.navigate(ROUTE.BUSINESS_PROFILE)}/>
         <ButtonComponent label={'CATALOG'} onClick={() => navigation.navigate(ROUTE.CATALOG)}/>
      </View>
   </MainContainer>
   )
}