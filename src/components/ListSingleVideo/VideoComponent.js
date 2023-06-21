// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import convertToCache, { convertAsync } from "react-native-video-cache";
// ===================================================================
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { setVideoProgress } from 'reduxConfiguration/slices/videosSlice';
import { selectOfflineMode } from 'reduxConfiguration/slices/netInfoSlice';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
import VideoSettings from '../../constantsConfiguration/videoSettings';
// ===================================================================
// Components
// ===================================================================
import { SkeletonLoader } from 'components'
// ===================================================================

const VideoComponent = ({ index, item, focused = false, isLoading, changeFocusedIndex, videoProgressLocal, updateLocalProgress }) => {
  // ===================================================================
  // Redux Props
  // -------------------------------------------------------------------
  const dispatch = useDispatch()
  const offlineMode = useSelector(selectOfflineMode)
  // ===================================================================

  // ===================================================================
  // Style
  // -------------------------------------------------------------------
  const { container, containerInner, skeletonLoaderStyle, videoStyle } = style
  // ===================================================================

  // ===================================================================
  // State
  // -------------------------------------------------------------------
  const [cashedVideo, setCashedVideo] = useState(null)
  // ===================================================================

  // ===================================================================
  // Ref
  // -------------------------------------------------------------------
  const player = useRef(null)
  // ===================================================================

  // ===================================================================
  // useEffect
  // -------------------------------------------------------------------
  useEffect(() => {
    if (videoProgressLocal)
      seekProgress()

  }, [player, videoProgressLocal])

  useEffect(() => {
    if (item?.sources && !isLoading) {
      let url = item.sources;
      convertAsync(url).then((res) => { setCashedVideo(res); })
    }
  }, [isLoading])
  // ===================================================================

  // ===================================================================
  // Methods
  // -------------------------------------------------------------------
  const onProgress = (data) => {
    updateLocalProgress(data.currentTime)

    dispatch(setVideoProgress(
      {
        id: item.thumb,
        time: data.currentTime
      }
    ))
  }

  // -------------------------------------------------------------------

  const onPlay = () => {

    if (!focused) {
      changeFocusedIndex(index)
    }
  }

  // -------------------------------------------------------------------

  const onPause = (data) => {
    changeFocusedIndex(null)
  }

  // -------------------------------------------------------------------

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

  // -------------------------------------------------------------------

  const seekProgress = useCallback(() => {
    if (player?.current && videoProgressLocal != undefined && videoProgressLocal != null) {
      player.current.seekTo(videoProgressLocal)

    }
  }, [player, videoProgressLocal])
  // ===================================================================

  return (
    <View style={container}>
      <SkeletonLoader
        displaySkeletonLoader={isLoading}
        customStyleMainContainer={skeletonLoaderStyle}
      >
        <View style={containerInner}>
          {item.sources &&
            <VideoPlayer
              source={{ uri: offlineMode && cashedVideo ? cashedVideo : item?.sources ? item.sources : null }}
              poster={`${VideoSettings.SOURCE}/${item.thumb}`}
              posterResizeMode="cover"
              resizeMode="cover"
              ref={player}
              repeat={false}
              videoStyle={videoStyle}
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

              disableFullscreen
              disableBack
              disableVolume
            />
          }

        </View>
      </SkeletonLoader>

    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden'
  },
  containerInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorsPalett.cardBackgroundInner
  },
  skeletonLoaderStyle: {
    width: '100%',
    height: '100%',
  },
  videoStyle: {
    width: Dimensions.get('screen').width - 10,
    height: VideoSettings.VIDEO_HEIGHT - 25 - VideoSettings.VIDEO_INFO_HEIGHT
  }
});

export default memo(VideoComponent);