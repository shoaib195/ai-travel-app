import {
    View,
    ScrollView,
    Text,
    Modal,
    Image,
    Dimensions,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';
  import React, {useRef, useEffect, forwardRef} from 'react';
  import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
  import {Modalize} from 'react-native-modalize';
  import {colorTheme} from '../../constants/ColorConstants';
  import {AppFonts} from '../../constants/AppFonts';

  const {primaryBackground,defaultBackground, darkGrayBackground} = colorTheme;
  
  const deviceHeight = Dimensions.get('window').height;
  
  const BottomModal = forwardRef (({
    children,
    visible,
    onModalClose,
    small,
    draggable,
    onClose,
    onPress,
    transparent,
  },ref) => {
    const styles = getStyles(small,transparent);
    
    return (
      <React.Fragment>
        {draggable && visible ? (
          <Modalize
            ref={ref}
            onOpen={onPress}
            onClose={onClose}
            adjustToContentHeight={true}
            keyboardAvoidingBehavior="positin"
            modalStyle={{borderTopRightRadius: 28, borderTopLeftRadius: 28, backgroundColor: darkGrayBackground}}
            overlayStyle={styles.modalOverlayStyle}
            handleStyle={styles.modalHandleStyle}>
            <KeyboardAvoidingView behavior="height" style={styles.modalContent}>
              {children}
            </KeyboardAvoidingView>
          </Modalize>
        ) : (
          <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onModalClose}
            style={styles.modal}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              style={{flex: 1}}>
              <View style={styles.modalView}>
                <View style={styles.modalSubView}>
                  <ScrollView>{children}</ScrollView>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        )}
      </React.Fragment>
    );
  });
  
  export default BottomModal;
  
  const getStyles = (small, transparent) =>
    StyleSheet.create({
      modal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      modalView: {
        flex: 1,
        backgroundColor: transparent ? '#000000AA' : undefined,
        justifyContent: 'flex-end',
      },
      modalSubView: {
        // backgroundColor: type == 'pink' ? drawerPinkBackground : defaultBackground,
        backgroundColor: primaryBackground,
        width: '100%',
        borderTopRightRadius: moderateScale(25),
        borderTopLeftRadius: moderateScale(25),
      },
      horizontalLine: {
        height: moderateScale(4),
        width: moderateScale(32),
      },
      lineContainer: {
        width: '100%',
        marginVertical: moderateVerticalScale(16),
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      },
      modalOverlayStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalHandleStyle: {
        backgroundColor: defaultBackground,
        height: moderateVerticalScale(4),
        width: moderateScale(32),
        marginTop: moderateVerticalScale(25),
      },
    });