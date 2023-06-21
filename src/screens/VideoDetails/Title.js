// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// ===================================================================
// Constants
// ===================================================================
import VideoSettings from 'constantsConfiguration/videoSettings';
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================
// Components
// ===================================================================
import { CustomIcon } from 'components'
// ===================================================================

const Title = ({ item }) => {
  // ===================================================================
  // Style
  // -------------------------------------------------------------------
  const { container, containerInner, iconContainer, iconContainerInner, icon, titleContainer, titleContainerInner, titleText } = style
  // ===================================================================

  return (
    <View style={container}>
      <View style={containerInner}>

        <View style={iconContainer} >
          <View style={iconContainerInner} >
            <CustomIcon type={'Feather'} name={'user'} color={ColorsPalett.textColorWhite} style={icon} />
          </View>
        </View>

        <View style={titleContainer}>
          <View style={titleContainerInner}>
            <Text style={titleText} numberOfLines={1} >{item?.title}</Text>
          </View>
        </View>

      </View>
    </View>
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
  icon: {
    fontSize: 30
  },
  titleContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  titleContainerInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden'
  },
  titleText: {
    color: ColorsPalett.textColorWhite,
    fontSize: 16
  },
});

export default memo(Title);