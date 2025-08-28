import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import { AppFonts } from "../../constants/AppFonts";
import { colorTheme } from "../../../constants/ColorConstants";

const {
    primaryText,
    primaryBackground,
    defaultText,
    whiteBorder,
    secondaryBackground,
    primaryBorder,
  } = colorTheme;

const getStyles = () => StyleSheet.create({
    cameraButtonContainer: {
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: moderateScale(20),
        marginTop: moderateVerticalScale(60),
        marginHorizontal: moderateScale(37)
    },
    galleryButtonContainer: {
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: moderateScale(31),
        marginHorizontal: moderateScale(37)
    },
    btnStyle: {
        backgroundColor: primaryBackground,
        borderColor: primaryBorder,
        borderWidth: 1,
      },
      activeBtnStyle: {
        backgroundColor: secondaryBackground,
        borderColor: 'transparent',
        borderWidth: 0,
      },
})

export default getStyles