import AnimatedLottieView from "lottie-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { MainContainer } from "../../shared/components/MainContainer"
import { Title1, Title2 } from "../../shared/components/Label"
import { store } from "../../apps/Storage"
import { KEY } from "../../shared/constants/StoreConstants"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { ROUTE } from "../../shared/constants/NavigationConstants"
import { ButtonComponent } from "../../shared/components/Button"

export const Home = _ => {
   // state
   const [userName, setUserName] = useState('');
   const navigation = useNavigation()

   useEffect(_ => {
      (async _ => {
         setUserName(await store.getData(KEY.USER_NAME));
      })();
   }, []);

   return (
      <MainContainer>
         <View style={{ paddingTop: 100 }}>
            <AnimatedLottieView style={{ width: 200, height: 200, alignItems: 'center' }} autoPlay source={require("../../../assets/animations/Happy.json")} />
            <Title1 label={`Hello, ${userName}!`} />
            <ButtonComponent label={'ADD POST'} onClick={() => navigation.navigate(ROUTE.ADD_POST)}/>
            <ButtonComponent label={'ADD PRODUCT'} onClick={() => navigation.navigate(ROUTE.ADD_PRODUCT)}/>
         </View>
      </MainContainer>
   )
}