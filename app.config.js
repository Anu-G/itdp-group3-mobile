import 'dotenv/config';

export default
  {
    expo: {
      name: "TokTok",
      slug: "toktok",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/TokTokLogo.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/images/Toktok-Logo.png",
        backgroundColor: "#FED154"
      },
      updates: {
        fallbackToCacheTimeout: 0
      },
      assetBundlePatterns: [
        "**/*"
      ],
      ios: {
        supportsTablet: true,
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/TokTokLogo.png",
          backgroundColor: "#FFFFFF"
        },
        softwareKeyboardLayoutMode: "pan",
        package: "com.itdpgroup3.toktok",
        versionCode: 1
      },
      web: {
        favicon: "./assets/images/favicon.png"
      },
      owner: "christiane",
      extra: {
        baseURL: process.env.BASE_URL,
        eas: {
          projectId: "14891e7a-c0a1-433c-8767-6683e4dd34fb"
        }
      },
    }
  }
