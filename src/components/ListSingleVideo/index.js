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

const ListSingleVideo = ({ navigation, index, item, focused = false, isLoading, changeFocusedIndex, videoProgress }) => {
  // ===================================================================
  // Redux Props
  // -------------------------------------------------------------------
  const dispatch = useDispatch()
  // ===================================================================

  const [videoProgressLocal, setVideoProgressLocal] = useState(videoProgress)

  const player = useRef(null)

  useEffect(() => {
    if (!isLoading && index < 3) {
      setVideoProgressLocal(videoProgress)
    }
  }, [isLoading])

  /*  const progress = useRef(null)
 
   const [cashedVideo, setCashedVideo] = useState(null)
 
   const onBuffer = (buffer) => {
     // console.log('buffer ', JSON.stringify(buffer, null, 2))
   }
 
   const videoError = (err) => {
     // console.log('err ', JSON.stringify(err, null, 2))
   }
 
   const onProgress = (data) => {
     // console.log('data ', data)
     dispatch(setVideoProgress(
       {
         id: item.thumb,
         time: data.currentTime
       }
     ))
     // progress.current = data.currentTime
   } */

  /* if (focused) {
    console.log('focused ', index)
  } */

  /* const onPlay = () => {

    if (!focused) {
      changeFocusedIndex(index)
    }
  }

  const onPause = (data) => {
    changeFocusedIndex(null)
  }
 */


  /* useEffect(() => {
    console.log('usao')
    seekProgress()
  }, [player])

  console.log('videoProgress ', videoProgress)

  const seekProgress = useCallback(() => {
    if (player?.current && videoProgress != undefined && videoProgress != null) {
      console.log('usao1 ============= ', videoProgress)
      player.current.seekTo(videoProgress)

    }
  }, [player]) */

  if (index < 2) console.log('focused parent ', index, ' - ', focused)

  return (

    <View style={{ width: '100%', height: VideoSettings.VIDEO_HEIGHT, padding: 5, }} >
      <View style={{ width: '100%', height: '100%', }}>

        {/* <SharedElement id={`item.${item.thumb}`}> */}
          <View style={{ width: '100%', height: VideoSettings.VIDEO_HEIGHT - 10, padding: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorsPalett.cardBackground, borderRadius: 5 }} >

            <VideoComponent
              refPlayer={player}
              item={item}
              focused={focused}
              index={index}
              isLoading={isLoading}
              changeFocusedIndex={changeFocusedIndex}
              videoProgressLocal={videoProgressLocal}
            />

            <VideoInfo
              navigation={navigation}
              item={item}
              isLoading={isLoading}
            />

          </View>
        {/* </SharedElement> */}

      </View >
    </View >
  );
}

export default memo(ListSingleVideo);