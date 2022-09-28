import { SafeAreaView, StatusBar, StyleSheet, useWindowDimensions } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const MainContainer = ({ children }) => {
   const theme = useTheme();
   const styles = styling(theme.state.style);

   return (
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle={theme.state.darkMode ? 'light-content' : 'dark-content'} backgroundColor={styles.container.backgroundColor} />
         {children}
      </SafeAreaView>
   );
}

const styling = (theme) => StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme?.colors?.background,
      alignItems: 'center',
      justifyContent: 'flex-end',
   }
});