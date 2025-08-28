import Toast from 'react-native-simple-toast';

class ToastService {
  shortToast = (msg) => {
    Toast.show(`${msg}`, Toast.SHORT);
  };

  longToast = (msg) => {
    Toast.show(`${msg}`, Toast.LONG);
  };
}

export default new ToastService();