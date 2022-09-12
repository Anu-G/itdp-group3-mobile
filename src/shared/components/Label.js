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
