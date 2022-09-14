import { useFonts } from "expo-font"

export const useAppFont = _ => {
   const [fontsLoaded] = useFonts({
      'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.otf'),
      'Poppins-Thin': require('../../../assets/fonts/Poppins-Thin.otf'),
      'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.otf'),
      'Poppins-Medium': require('../../../assets/fonts/Poppins-Medium.otf'),
      'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.otf')
   });
   return fontsLoaded;
}