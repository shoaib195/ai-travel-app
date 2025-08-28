import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const useOrientation = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const { width, height } = Dimensions.get('window');
      setIsLandscape(width > height);
    };

    onChange();

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { isLandscape };
};

export default useOrientation;
