// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, } from 'react-native';
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
import VideoSettings from 'constantsConfiguration/videoSettings';
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================

const VideoPlayerComponent = ({ item, videoProgressLocal = 0, fullScreen, orientation }) => {
  // ===================================================================
  // Redux Props
  // -------------------------------------------------------------------
  const dispatch = useDispatch()
  const offlineMode = useSelector(selectOfflineMode)
  // ===================================================================

  const player = useRef(null)

  const [cashedVideo, setCashedVideo] = useState(null)

  const onBuffer = (buffer) => {
  }

  const videoError = (err) => {
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
  }

  const onPause = (data) => {
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
    }, 10)

  }

  return (
    <View style={{ width: '100%', flex: 1, borderRadius: 5, overflow: 'hidden' }}>
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorsPalett.cardBackgroundInner }}>
        <VideoPlayer
          source={{ uri: offlineMode && cashedVideo ? cashedVideo : item?.sources ? item.sources : null }}
          poster={`${VideoSettings.SOURCE}/${item.thumb}`}
          ref={player}
          onBuffer={onBuffer}
          onError={videoError}
          videoStyle={{ width: '100%', height: fullScreen || orientation === 'landscape' ? '100%' : VideoSettings.VIDEO_HEIGHT - 25 - VideoSettings.VIDEO_INFO_HEIGHT }}
          paused={false}
          toggleResizeModeOnFullscreen={false}
          tapAnywhereToPause={true}
          showOnStart={true}
          doubleTapTime={300}

          posterResizeMode={"cover"}
          resizeMode={"cover"}

          onProgress={onProgress}
          onPlay={onPlay}
          onPause={onPause}
          onEnd={onEnd}

          onLoad={() => {
            player.current.seekTo(videoProgressLocal)
          }}

          onEnterFullscreen={() => {
          }}

          onExitFullscreen={() => {
          }}

          // disablePlayPause
          // disableSeekbar
          // disableTimer
          disableFullscreen
          disableBack
          disableVolume
        />

      </View>

    </View>
  );
}

export default VideoPlayerComponent;