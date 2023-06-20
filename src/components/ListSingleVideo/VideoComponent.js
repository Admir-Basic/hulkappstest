// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, Dimensions, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

import { SharedElement } from 'react-navigation-shared-element';
import convertToCache, { convertAsync } from "react-native-video-cache";
// ===================================================================
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { setVideoProgress } from 'reduxConfiguration/slices/videosSlice';
import { selectOfflineMode } from 'reduxConfiguration/slices/netInfoSlice';
// ===================================================================

// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
import { moduleNames } from '../../constantsConfiguration/enums/modules';
import VideoSettings from '../../constantsConfiguration/videoSettings';
// ===================================================================
import { SkeletonLoader, CustomIcon } from 'components'

const VideoComponent = ({ index, item, focused = false, isLoading, changeFocusedIndex, videoProgressLocal }) => {
  // ===================================================================
  // Redux Props
  // -------------------------------------------------------------------
  const dispatch = useDispatch()
  const offlineMode = useSelector(selectOfflineMode)
  // ===================================================================

  // if (index === 1) console.log('usao ============== ')

  const player = useRef(null)

  const [cashedVideo, setCashedVideo] = useState(null)

  const onBuffer = (buffer) => {
    // console.log('buffer ', JSON.stringify(buffer, null, 2))
  }

  const videoError = (err) => {
    // console.log('err ', JSON.stringify(err, null, 2))
  }

  const onProgress = (data) => {

    dispatch(setVideoProgress(
      {
        id: item.thumb,
        time: data.currentTime
      }
    ))
  }

  const onPlay = () => {

    if (!focused) {
      changeFocusedIndex(index)
    }
  }

  const onPause = (data) => {
    changeFocusedIndex(null)
  }

  const onEnd = () => {
    player.current.seekTo(0)
    
    setTimeout(() => {
      dispatch(setVideoProgress(
        {
          id: item.thumb,
          time: 0
        }
      ))
      changeFocusedIndex(null)
    }, 10)
  }


  useEffect(() => {
    if (videoProgressLocal)
      seekProgress()

  }, [player, videoProgressLocal])

  const seekProgress = useCallback(() => {
    if (player?.current && videoProgressLocal != undefined && videoProgressLocal != null) {
      player.current.seekTo(videoProgressLocal)

    }
  }, [player, videoProgressLocal])

  useEffect(() => {
    if (item?.sources && !isLoading) {
      let url = item.sources;
      convertAsync(url).then((res) => { if (index === 1) console.log({res}); setCashedVideo(res); })
    }
  }, [isLoading])

  if (index === 1) console.log('url ======== ', offlineMode && cashedVideo ? cashedVideo : item?.sources ? item.sources : null)

  return (
    <View style={{ width: '100%', flex: 1, borderRadius: 5, overflow: 'hidden' }}>
      <SkeletonLoader
        displaySkeletonLoader={isLoading}
        customStyleMainContainer={{ width: '100%', height: '100%', }}
      >
        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorsPalett.cardBackgroundInner }}>
          {item.sources &&
            <VideoPlayer
              source={{ uri: offlineMode && cashedVideo ? cashedVideo : item?.sources ? item.sources : null }}
              poster={`${VideoSettings.SOURCE}/${item.thumb}`}
              posterResizeMode="cover"
              resizeMode="cover"
              ref={player}
              repeat={false}
              onBuffer={onBuffer}
              onError={videoError}
              videoStyle={{ width: Dimensions.get('screen').width - 10, height: VideoSettings.VIDEO_HEIGHT - 25 - VideoSettings.VIDEO_INFO_HEIGHT }}
              paused={!focused}
              toggleResizeModeOnFullscreen={false}
              tapAnywhereToPause={true}
              showOnStart={true}
              doubleTapTime={-1}

              onProgress={onProgress}

              onLoad={() => {
                seekProgress()
              }}

              onPlay={onPlay}
              onPause={onPause}
              onEnd={onEnd}

              // disablePlayPause
              // disableSeekbar
              // disableTimer
              disableFullscreen
              disableBack
              disableVolume
            />

            /*  : <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
               <Text style={{ color: ColorsPalett.textColorMain, fontSize: 16 }} >{item?.thumb}</Text>
               <Text style={{ color: ColorsPalett.textColorMain, fontSize: 16 }} >{focused ? 'Play' : 'Pause'}</Text>
             </View> */
          }

        </View>
      </SkeletonLoader>

    </View>
  );
}

export default memo(VideoComponent);