import * as Font from "expo-font";

export default useFonts = async () => {
   await Font.loadAsync({
      "GilroyBlack" : require("./assets/fonts/gilroy/Gilroy-Black.ttf"),
      "GilroyBlackItalic" : require("./assets/fonts/gilroy/Gilroy-BlackItalic.ttf"),
      "GilroyBold" : require("./assets/fonts/gilroy/Gilroy-Bold.ttf"),
      "GilroyExtraBold" : require("./assets/fonts/gilroy/Gilroy-ExtraBold.ttf"),
      "GilroyHeavy" : require("./assets/fonts/gilroy/Gilroy-Heavy.ttf"),
      "GilroyLight" : require("./assets/fonts/gilroy/Gilroy-Light.ttf"),
      "GilroyMedium" : require("./assets/fonts/gilroy/Gilroy-Medium.ttf"),
      "GilroySemiBold" : require("./assets/fonts/gilroy/Gilroy-SemiBold.ttf"),
      "GilroyRegular" : require("./assets/fonts/gilroy/Gilroy-Regular.ttf"),
      "GilroyThin" : require("./assets/fonts/gilroy/Gilroy-Thin.ttf"),









      // All other fonts here
    });
};