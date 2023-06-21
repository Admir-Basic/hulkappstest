// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
import VideoSettings from '../../constantsConfiguration/videoSettings';
// ===================================================================
// Components
// ===================================================================
import { SkeletonLoader, CustomIcon } from 'components'
// ===================================================================

const VideoInfo = ({ item, isLoading, openVideo }) => {
  // ===================================================================
  // Style
  // -------------------------------------------------------------------
  const { container, containerInner, iconContainer, iconContainerInner, iconContainerSkeleton, iconStyle, textMainContainer, titleContainer, titleContainerInner, titleText, descriptionContainer, descriptionContainerInner, descriptionText } = style
  // ===================================================================

  return (
    <TouchableOpacity disabled={isLoading} onPress={() => { openVideo(item) }} style={container}>
      <View style={containerInner}>

        <View style={iconContainer} >
          <View style={iconContainerInner} >
            <SkeletonLoader
              displaySkeletonLoader={isLoading}
            >
              <View style={iconContainerSkeleton} >
                <CustomIcon type={'Feather'} name={'user'} color={ColorsPalett.textColorWhite} style={iconStyle} />
              </View>
            </SkeletonLoader>
          </View>
        </View>

        <View style={textMainContainer}>
          <View style={titleContainer}>
            <SkeletonLoader
              displaySkeletonLoader={isLoading}
            >
              <View style={titleContainerInner}>
                <Text style={titleText} numberOfLines={1} >{item?.title}</Text>
              </View>
            </SkeletonLoader>
          </View>

          <View style={descriptionContainer}>
            <SkeletonLoader
              displaySkeletonLoader={isLoading}
            >
              <View style={descriptionContainerInner}>
                <Text style={descriptionText} numberOfLines={1} >{item?.description}</Text>
              </View>
            </SkeletonLoader>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: VideoSettings.VIDEO_INFO_HEIGHT,
    marginTop: 5,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: ColorsPalett.cardBackgroundInner
  },
  containerInner: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  iconContainer: {
    width: 70,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerInner: {
    width: 55,
    height: 55,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsPalett.cardBackgroundIcon
  },
  iconContainerSkeleton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 30
  },
  textMainContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  titleContainer: {
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden'
  },
  titleContainerInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  titleText: {
    color: ColorsPalett.textColorWhite,
    fontSize: 16
  },
  descriptionContainer: {
    width: '100%',
    height: '45%',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden'
  },
  descriptionContainerInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  descriptionText: {
    color: ColorsPalett.textColorSecond,
    fontSize: 12
  },

});

export default memo(VideoInfo);