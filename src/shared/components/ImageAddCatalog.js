import { Entypo } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const ImageWithDeleteSign = ({ style = {}, handleClick, source = 'https://reactjs.org/logo-og.png' }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   return (
      <View style={styles.containerSquare}>
         {
            source !== "plus-icon" ?
               <View>
                  <View style={[styles.squareUp, styles.trash]}>
                     <TouchableOpacity onPress={handleClick}>
                        <Entypo name="circle-with-minus" size={24} color="#FE5454" />
                     </TouchableOpacity>
                  </View>
                  <View style={[styles.squareDown, styles.plus]}>
                     <Image source={{ uri: source }} style={{ width: 70, height: 70, resizeMode: "contain" }} />
                  </View>
               </View>
               :
               <View>
                  <TouchableOpacity onPress={handleClick}>
                     <View style={[styles.squareDown, styles.plus]}>
                        <Entypo name="plus" size={24} color="#FED154" />
                     </View>
                  </TouchableOpacity>
               </View>
         }
      </View>
   )
}

const styling = (theme) => StyleSheet.create({
   containerSquare: {
      width: 90,
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
   },
   squareUp: {
      width: 85,
      height: 95,
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
   },
   trash: {
      zIndex: 101,
      elevation: 101,
      position: 'absolute',
   },
   squareDown: {
      width: 72,
      height: 72,
      borderWidth: 1.5,
      borderColor: '#FED154',
      backgroundColor: '#3B4046',
      alignItems: 'center',
      justifyContent: 'center',
   },
   plus: {
      zIndex: 100,
      elevation: 100
   },
})