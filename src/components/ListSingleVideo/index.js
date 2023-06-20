// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, Dimensions, TouchableOpacity } from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';
import convertToCache, { convertAsync } from "react-native-video-cache";
// ===================================================================
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { setVideoProgress } from 'reduxConfiguration/slices/videosSlice';
import { selectOfflineMode } from 'reduxConfiguration/slices/netInfoSlice';
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
import { SkeletonLoader, CustomIcon } from 'components'

const displayVideo = true

const ListSingleVideo = ({ navigation, index, item, focused = false, isLoading, changeFocusedIndex, videoProgress, /* openVideo */ }) => {

  const [videoProgressLocal, setVideoProgressLocal] = useState(videoProgress)

  const progress = useRef(null)

  useEffect(() => {
    if (!isLoading && index < 3) {
      setVideoProgressLocal(videoProgress)
    }
  }, [isLoading])

  const updateLocalProgress = useCallback((progressA) => {
    progress.current = progressA;
  }, [])

  const openVideo = useCallback((itemA) => {
    navigation.push(moduleNames.VIDEO_DETAILS, { item: itemA, progress: progress.current })
  }, [progress])

  return (

    <View style={{ width: '100%', height: VideoSettings.VIDEO_HEIGHT, padding: 5, }} >
      <View style={{ width: '100%', height: '100%', }}>

        {/* <SharedElement id={`item.${item.thumb}`}> */}
        <View style={{ width: '100%', height: VideoSettings.VIDEO_HEIGHT - 10, padding: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorsPalett.cardBackground, borderRadius: 5 }} >

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
        {/* </SharedElement> */}

      </View >
    </View >
  );
}

export default memo(ListSingleVideo);