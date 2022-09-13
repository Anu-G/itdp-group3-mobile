import { Text } from "react-native";
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
         {openStatus 
            ? <Text style={[theme.state.style?.text?.captionGreen, style]}>{text}</Text>
            : <Text style={[theme.state.style?.text?.captionRed, style]}>{text}</Text>} 
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