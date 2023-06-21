// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
// ===================================================================
// Components
// ===================================================================
import VideoComponent from './VideoComponent'
import VideoInfo from './VideoInfo'
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
import { moduleNames } from '../../constantsConfiguration/enums/modules';
import VideoSettings from '../../constantsConfiguration/videoSettings';
// ===================================================================

const ListSingleVideo = ({ navigation, index, item, focused = false, isLoading, changeFocusedIndex, videoProgress, /* openVideo */ }) => {
  // ===================================================================
  // Style
  // -------------------------------------------------------------------
  const { containerMain, container, containerInner, } = style
  // ===================================================================

  // ===================================================================
  // State
  // -------------------------------------------------------------------
  const [videoProgressLocal, setVideoProgressLocal] = useState(videoProgress)
  // ===================================================================

  // ===================================================================
  // Ref
  // -------------------------------------------------------------------
  const progress = useRef(null)
  // ===================================================================

  // ===================================================================
  // useEffect
  // -------------------------------------------------------------------
  useEffect(() => {
    if (!isLoading && index < 3) {
      setVideoProgressLocal(videoProgress)
    }
  }, [isLoading])
  // ===================================================================

  // ===================================================================
  // Methods
  // -------------------------------------------------------------------
  const updateLocalProgress = useCallback((progressA) => {
    progress.current = progressA;
  }, [])

  const openVideo = useCallback((itemA) => {
    navigation.push(moduleNames.VIDEO_DETAILS, { item: itemA, progress: progress.current })
  }, [progress])
  // ===================================================================

  return (
    <View style={containerMain} >
      <View style={container}>
        <View style={containerInner} >

          <VideoComponent
            item={item}
            focused={focused}
            index={index}
            isLoading={isLoading}
            changeFocusedIndex={changeFocusedIndex}
            videoProgressLocal={videoProgressLocal}
            updateLocalProgress={updateLocalProgress}
          />

          <VideoInfo
            navigation={navigation}
            item={item}
            isLoading={isLoading}
            openVideo={openVideo}
          />

        </View>
      </View >
    </View >
  );
}

const style = StyleSheet.create({
  containerMain: {
    width: '100%',
    height: VideoSettings.VIDEO_HEIGHT, padding: 5,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  containerInner: {
    width: '100%',
    height: VideoSettings.VIDEO_HEIGHT - 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsPalett.cardBackground,
    borderRadius: 5
  },
});

export default memo(ListSingleVideo);