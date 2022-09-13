const pallete = {
   yellow: '#FED154',
   dark: '#1E2329',
   white: '#F4F4F4',
   lightBlue: '#849EB9',
   mediumBlue: '#475264',
   darkBlue: '#3B4046',
   red: '#FE5454',
   green: '#54FE98',
   whiteTrp: '#afafaf'
}

const spacing = {
   xs: 4,
   s: 8,
   m: 16,
   l: 24,
   xl: 32,
   xxl: 40
}

const radius = {
   s: 5,
   m: 10,
   l: 15
}

export const themeDark = {
   colors: {
      background: pallete.dark,
      button: pallete.yellow,
      inputBorder: pallete.yellow,
      whiteTrp: pallete.whiteTrp,
      tabBackground: pallete.darkBlue
   },
   spacing: { ...spacing },
   radius: { ...radius },
   text: {
      subtitle: {
         fontSize: 18,
         color: pallete.white,
         fontFamily: 'Poppins-Medium'
      },
      title1: {
         fontSize: 28,
         color: pallete.white,
         fontFamily: 'Poppins-Bold'
      },
      title2: {
         fontSize: 20,
         color: pallete.white,
         fontFamily: 'Poppins-Bold'
      },
      buttonText: {
         fontSize: 18,
         color: pallete.white,
         fontFamily: 'Poppins-Bold'
      },
      text32: {
         fontSize: 16,
         color: pallete.white,
         fontFamily: 'Poppins-Regular',
      },
      caption: {
         fontSize: 14,
         color: pallete.white,
      },
      captionGreen: {
         fontSize: 14,
         color: pallete.green,
      },
      captionRed: {
         fontSize: 14,
         color: pallete.red,
      },
      textTimeline: {
         fontSize: 10,
         color: pallete.white,
      },
      textProfile: {
         fontSize: 16,
         color: pallete.white,
         fontWeight: 600
      }
   },
   tabIcon: {
      size: 28,
      activeColor: pallete.yellow,
      inactiveColor: pallete.lightBlue
   }
}


export const themeLight = {
   colors: {
      background: pallete.white,
      button: pallete.darkBlue,
      inputBorder: pallete.yellow,
      whiteTrp: pallete.whiteTrp,
      tabBackground: pallete.mediumBlue
   },
   spacing: { ...spacing },
   radius: { ...radius },
   text: {
      subtitle: {
         fontSize: 18,
         color: pallete.dark,
         fontFamily: 'Poppins-Medium'
      },
      title1: {
         fontSize: 28,
         color: pallete.dark,
         fontFamily: 'Poppins-Bold'
      },
      title2: {
         fontSize: 20,
         color: pallete.dark,
         fontFamily: 'Poppins-Bold'
      },
      buttonText: {
         fontSize: 18,
         color: pallete.yellow,
         fontFamily: 'Poppins-Bold'
      },
      text32: {
         fontSize: 16,
         color: pallete.dark,
         fontFamily: 'Poppins-Regular',
      },
      caption: {
         fontSize: 14,
         color: pallete.dark,
         fontFamily: 'Poppins-Regular'
      },
      captionGreen: {
         fontSize: 14,
         color: pallete.green,
         fontFamily: 'Poppins-Regular'
      },
      captionRed: {
         fontSize: 14,
         color: pallete.red,
         fontFamily: 'Poppins-Regular'
      }
   },
   tabIcon: {
      size: 28,
      activeColor: pallete.yellow,
      inactiveColor: pallete.white
   }
}