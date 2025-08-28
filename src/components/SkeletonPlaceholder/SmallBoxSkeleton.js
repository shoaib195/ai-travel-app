import React, {memo} from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

const DeviceWidth = Dimensions.get('window').width;
const SmallBoxSkeleton = (props) => {
    const { highlightColor, backgroundColor, width, height } = props
  return (
    <SkeletonPlaceholder highlightColor={highlightColor} backgroundColor={backgroundColor}>
    <SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item borderRadius={8} width={width} height={height} marginBottom={moderateVerticalScale(32)} backgroundColor={'red'}/>
    </SkeletonPlaceholder.Item>
  </SkeletonPlaceholder>
  );
};

export default memo(SmallBoxSkeleton);
