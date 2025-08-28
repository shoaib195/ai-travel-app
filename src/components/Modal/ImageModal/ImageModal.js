import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {AppImages} from '../../../constants/AppImages';
import getStyles from './Styles';
import {colorTheme} from '../../../constants/ColorConstants';
import useImage from '../../../hooks/useImage';
import ButtonComponent from '../../ButtonComp';
import BottomModal from '../BottomModal';

const {
  primaryText,
  grayText,
  primaryBackground,
  secondaryBackground,
  primaryBorder,
} = colorTheme;

const ImageModal = React.forwardRef(
  ({onClose, visible, onImagePickHandler, type}, ref) => {
    const styles = getStyles();
    const [activeButtonIndex, setActiveButtonIndex] = useState(null);
    const {openCam, userImage, openGallery} = useImage();

    useEffect(() => {
      if (userImage && onImagePickHandler) {
        onImagePickHandler(userImage);
      }
    }, [userImage]);

    const onGalleryPressHandler = () => {
      setActiveButtonIndex(1);

      const timeout = setTimeout(() => {
        if (type == 'document') {
          openGallery('photo', 200, 350);
          setActiveButtonIndex(null);
        } else {
          openGallery();
          setActiveButtonIndex(null);
        }
      }, 200);

      return () => {
        clearTimeout(timeout);
      };
    };
    const onCameraPressHandler = () => {
      setActiveButtonIndex(0);

      const timeout = setTimeout(() => {
        if (type == 'document') {
          openCam('photo', 200, 350);
          setActiveButtonIndex(null);
        } else {
          openCam();
          setActiveButtonIndex(null);
        }
      }, 200);

      return () => {
        clearTimeout(timeout);
      };
    };

    const getButtonStyle = index => {
      const isActive = activeButtonIndex === index;
      return {
        backgroundColor: isActive ? secondaryBackground : primaryBackground,
        borderColor: isActive ? 'transparent' : primaryBorder,
        borderWidth: isActive ? 0 : 1,
      };
    };

    return (
      <BottomModal
        type={'light'}
        onClose={onClose}
        visible={visible}
        ref={ref}
        draggable>
        <View style={styles.cameraButtonContainer}>
          <ButtonComponent
            disabled={false}
            pressStatus={false}
             title={'Take Photo'}
            btnStyle={getButtonStyle(0)}
            onPressOut={onCameraPressHandler}
          />
        </View>

        <View style={styles.galleryButtonContainer}>
          <ButtonComponent
            onPressOut={onGalleryPressHandler}
            disabled={false}
            pressStatus={false}
            title={'Add from Library'}
            btnStyle={getButtonStyle(1)}
          />
        </View>
      </BottomModal>
    );
  },
);

export default memo(ImageModal);