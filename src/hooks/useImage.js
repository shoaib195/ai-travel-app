import {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const useImage = () => {
  const [userImage, setUserImage] = useState(null);
  const openGallery = (
    type,
    height,
    width,
  ) => {
    ImagePicker.openPicker({
      width: width ?? 300,
      height: height ?? 300,
      compressImageQuality: 0.5,
      compressImageMaxHeight: 720,
      compressImageMaxWidth: 720,
      mediaType: type ?? 'photo',
      cropping: type == 'video' ? false : true,
    })
      .then((image) => {
        if (image) {
          setUserImage(image);
        }
      })
      .catch(error => {
        if (error?.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };
  // };P
  const openCam = (
    type,
    height,
    width,
  ) => {
    ImagePicker.openCamera({
      width: width ?? 300,
      height: height ?? 300,
      compressImageQuality: 0.5,
      mediaType: type ?? 'photo',
      cropping: type == 'video' ? false : true,
    })
      .then(image => {
        if (image) {
          setUserImage(image);
        }
      })
      .catch(error => {
        if (error?.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };
  
  return {openGallery, openCam, userImage};
};

export default useImage;