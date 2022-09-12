import { NavigationContainer } from "@react-navigation/native";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { clientInstance } from "./src/apps/ApiClient";
import { apiClientFactory } from "./src/apps/ApiFactory";
import { AppRouter } from "./src/navigation/AppRouter";
import { serviceFactory } from "./src/services/ServiceFactory";
import { DependencyProvider } from "./src/shared/context/DependencyContext";
import { ThemeProvider, useTheme } from "./src/shared/context/ThemeContext";
import { useAppFont } from "./src/shared/hooks/AppFont";
import Constants from 'expo-constants';
import { AuthProvider } from "./src/shared/context/AuthContext";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [services, setServices] = useState(null);
  const fonts = useAppFont();

  useEffect(_ => {
    const prepare = async _ => {
      try {
        await preventAutoHideAsync();
        const apiClient = apiClientFactory(clientInstance);
        const services = serviceFactory(apiClient);
        setServices(services);
        if (fonts) {
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
      };
    }
    prepare();
  }, [fonts]);

  const onLayoutRootView = useCallback(async _ => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <DependencyProvider services={services}>
        <SafeAreaProvider>
          <ThemeProvider>
            <Navigator />
          </ThemeProvider>
        </SafeAreaProvider>
      </DependencyProvider>
    </View>
  );
}

const Navigator = _ => {
  const theme = useTheme();

  return (
    <NavigationContainer theme={{ colors: { background: theme?.state?.style?.colors?.background } }}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </NavigationContainer>
  )
}
