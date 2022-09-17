import { Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const Title1 = ({ label, style = {} }) => {
   const theme = useTheme();

   return (
      <Text style={[theme.state.style?.text?.title1, style]}>{label}</Text>
   )
}

export const Title2 = ({ label, style = {} }) => {
   const theme = useTheme();

   return (
      <Text style={[theme.state.style?.text?.title2, style]}>{label}</Text>
   )
}

export const Text32 = ({ text, style = {} }) => {
   const theme = useTheme();

   return (
      <Text style={[theme.state.style?.text?.text32, style]}>{text}</Text>
   )
}

export const Caption = ({ text, style= {} }) => {
   const theme = useTheme();

   return(
      <Text style={[theme.state.style?.text?.caption, style]}>{text}</Text>
   )
}

export const CaptionColor = ({ text, style= {}, openStatus= false }) => {
   const theme = useTheme();

   return(
      <>
         <View style={{height:24}}>
         {openStatus 
            ? <Text style={[theme.state.style?.text?.captionGreen, style]}>{text}</Text>
            : <Text style={[theme.state.style?.text?.captionRed, style]}>{text}</Text>} 
         </View>
         
      </>
   )
}

export const TextTimeline = ({text, style={}}) => {
   const theme = useTheme();

   return(
      <Text style={[theme.state.style?.text?.textTimeline, style]}>{text}</Text>
   )
}

export const TextProfile = ({text, style={}}) => {
   const theme = useTheme();

   return(
      <Text style={[theme.state.style?.text?.textProfile, style]}>{text}</Text>
   )
}

export const TextSettingProfile = ({text, style={}}) => {
   const theme = useTheme();

   return(
      <Text style={[theme.state.style?.text?.textSetting, style]}>{text}</Text>
   )
}

export const TextComment = ({text, style={}}) => {
   const theme = useTheme();

   return(
      <Text style={[theme.state.style?.text?.textComment, style]}>{text}</Text>
   )
}

export const AuthExtLabel = ({text1, text2, style={}}) => {
   const theme = useTheme();
   return(
      <View style={{ alignItems: 'center'}}>
         <Text style={[theme.state.style?.text?.textComment]}>{text1}</Text>
         <Text style={[theme.state.style?.text?.text13regYellow]}>{text2}</Text>
      </View>
   )
}