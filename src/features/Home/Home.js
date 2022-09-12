import AnimatedLottieView from "lottie-react-native"
import { View } from "react-native"
import { MainContainer } from "../../shared/components/MainContainer"
import { Title1 } from "../../shared/components/Label"
import { store } from "../../apps/Storage"
import { KEY } from "../../shared/constants/StoreConstants"
import { useEffect, useState } from "react"

export const Home = _ => {
   // state
   const [userName, setUserName] = useState('');

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
         </View>
      </MainContainer>
   )
}