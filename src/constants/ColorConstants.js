export const colorConstants = {
  lightBlue: '#6494D6',
  darkPurple: '#4E008A',
  darkGray: '#262A34',
  darkByzantineBlue: '#293150',
  darkBlack: '#000000',
  dimGray : '#696B70',
  dimRed: '#EC6767',
  simpleGray: '#C9C9C9',
  white: '#FCFCFC',
  whiteText: '#fff',
  primary: '#24BAEC'
};

const textColor = {
  primaryText: colorConstants.white,
  whiteText: colorConstants.whiteText,
  secondaryText: colorConstants.lightBlue,
  defaultText: colorConstants.darkBlack,
  placeholderText: colorConstants.dimGray,
  darkByzantineBlueText: colorConstants.darkByzantineBlue,
  errorText: colorConstants.dimRed,
  // disableText: colorConstants.simpleGray,
  // placeholderText: colorConstants.darkGray,
  // whiteText: colorConstants.white,
    grayText: colorConstants.simpleGray,
  // infoText: colorConstants.darkBlue,
};

const backgroundColor = {
  primaryBackground: colorConstants.primary,
  secondaryBackground: colorConstants.lightBlue,
  defaultBackground: colorConstants.white,
  darkGrayBackground: colorConstants.darkGray,
  darkByzantineBlueBackground: colorConstants.darkByzantineBlue,
  // errorBackground: colorConstants.lightRed,
  disableBackground: colorConstants.simpleGray,
  // lightGrayBackground: colorConstants.lightGray,
  // darkGrayBackgrounud: colorConstants.darkGray,
  // lightPurpleBackground: colorConstants.lightPurple,
  // drawerPinkBackground:"#FBF7FF",
  // varningBackground: colorConstants.lightYellow,
  // stepsBackground:"#F9F2FE",
  // toolTipInfoBackground: '#FFEBC9'
};

const borderColor = {
  primaryBorder: colorConstants.simpleGray,
  secondaryBorder: colorConstants.lightBlue,
  whiteBorder: colorConstants.white,
  dimGrayBorder: colorConstants.dimGray,
  // defaultBorder: colorConstants.mediumGray,
  // errorBorder: colorConstants.darkRed,
  // lightGrayBorder: colorConstants.lightGray,
  // darkGrayBorder: colorConstants.darkGray,
  darkBlackBorder: colorConstants.darkBlack
};

export const colorTheme = {...textColor, ...backgroundColor, ...borderColor};
