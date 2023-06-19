// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, Dimensions, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

import { SharedElement } from 'react-navigation-shared-element';
// ===================================================================
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectVideosProgress, setVideoProgress } from 'reduxConfiguration/slices/videosSlice';
// ===================================================================

// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
import { moduleNames } from '../../constantsConfiguration/enums/modules';
import VideoSettings from '../../constantsConfiguration/videoSettings';
// ===================================================================
import { SkeletonLoader, CustomIcon } from 'components'

const displayVideo = true

const ListSingleVideo = ({ navigation, index, item, focused = false, isLoading, changeFocusedIndex }) => {
  // ===================================================================
  // Redux Props
  // -------------------------------------------------------------------
  const dispatch = useDispatch()
  const videosProgress = useSelector(selectVideosProgress)
  // ===================================================================

  const player = useRef(null)
  const progress = useRef(null)

  const onBuffer = (buffer) => {
    // console.log('buffer ', JSON.stringify(buffer, null, 2))
  }

  const videoError = (err) => {
    // console.log('err ', JSON.stringify(err, null, 2))
  }

  const onProgress = (data) => {
    // console.log('data ', data)
    /* dispatch(setVideoProgress(
      {
        id: item.thumb,
        time: data.currentTime
      }
    )) */
    progress.current = data.currentTime
  }

  const onPlay = () => {
    console.log('focused ', focused)
    if (!focused) {
      changeFocusedIndex(index)
    }
  }

  const onPause = (data) => {
    changeFocusedIndex(null)
  }



  useEffect(() => {
    // seekProgress()

    // return () => { saveProgressLocally() }
  }, [player])

  const saveProgressLocally = useCallback(() => {
    // dispatch(setVideoProgress(
    //   {
    //     id: item.thumb,
    //     time: progress.current
    //   }
    // ))
  }, [progress, item])

  const seekProgress = useCallback((time) => {
    // if (player?.current && videosProgress[item.thumb] != undefined && videosProgress[item.thumb] != null && focused) {
    //   // console.log('usao1 ============= ', videosProgress[item.thumb])
    //   player.current.seekTo(videosProgress[item.thumb])

    // }
  }, [player, focused])

  if (index === 3) console.log('test ======================= ')

  return (

    <View style={{ width: '100%', height: VideoSettings.VIDEO_HEIGHT, padding: 5, }} >
      <View style={{ width: '100%', height: '100%', }}>

        {/* <TouchableOpacity onPress={() => { navigation.push(moduleNames.VIDEO_DETAILS, { item }) }} style={{ width: '100%', height: '100%', backgroundColor: '#00000010', position: 'absolute', zIndex: 10 }}>
        </TouchableOpacity> */}

        <SharedElement id={`item.${item.thumb}`}>
          <View style={{ width: '100%', height: VideoSettings.VIDEO_HEIGHT - 10, padding: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorsPalett.cardBackground, borderRadius: 5 }} >
            <View style={{ width: '100%', flex: 1, borderRadius: 5, overflow: 'hidden' }}>
              <SkeletonLoader
                displaySkeletonLoader={isLoading}
                customStyleMainContainer={{ width: '100%', height: '100%', }}
              >
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorsPalett.cardBackgroundInner }}>
                  {displayVideo
                    ? <VideoPlayer
                      source={{ uri: `${item.sources}` }}
                      poster={`${VideoSettings.SOURCE}/${item.thumb}`}
                      posterResizeMode="cover"
                      resizeMode="cover"
                      ref={player}
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
                        // if (focused)
                        seekProgress()
                      }}

                      onPlay={onPlay}
                      onPause={onPause}

                      // disablePlayPause
                      // disableSeekbar
                      // disableTimer
                      disableFullscreen
                      disableBack
                      disableVolume
                    />

                    : <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                      <Text style={{ color: ColorsPalett.textColorMain, fontSize: 16 }} >{item?.thumb}</Text>
                      <Text style={{ color: ColorsPalett.textColorMain, fontSize: 16 }} >{focused ? 'Play' : 'Pause'}</Text>
                    </View>
                  }

                </View>
              </SkeletonLoader>

            </View>

            <TouchableOpacity disabled={isLoading} onPress={() => { navigation.push(moduleNames.VIDEO_DETAILS, { item }) }} style={{ width: '100%', height: VideoSettings.VIDEO_INFO_HEIGHT, marginTop: 5, borderRadius: 5, overflow: 'hidden', backgroundColor: ColorsPalett.cardBackgroundInner }}>

              <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 5, paddingVertical: 5, }}>
                <View style={{ width: 70, height: '100%', justifyContent: 'center', alignItems: 'center', }} >
                  <View style={{ width: 55, height: 55, borderRadius: 100, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorsPalett.cardBackgroundIcon }} >
                    <SkeletonLoader
                      displaySkeletonLoader={isLoading}
                    >
                      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }} >
                        <CustomIcon type={'Feather'} name={'user'} color={ColorsPalett.textColorWhite} style={{ fontSize: 30 }} />
                      </View>
                    </SkeletonLoader>
                  </View>
                </View>
                <View style={{ flex: 1, height: '100%', justifyContent: 'space-around', paddingHorizontal: 5, paddingVertical: 5, }}>
                  <View style={{ width: '100%', height: '45%', justifyContent: 'center', borderRadius: 5, overflow: 'hidden' }}>
                    <SkeletonLoader
                      displaySkeletonLoader={isLoading}
                    >
                      <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                        <Text style={{ color: ColorsPalett.textColorWhite, fontSize: 16 }} numberOfLines={1} >{item?.title}</Text>
                      </View>
                    </SkeletonLoader>
                  </View>

                  <View style={{ width: '100%', height: '45%', justifyContent: 'center', borderRadius: 5, overflow: 'hidden' }}>
                    <SkeletonLoader
                      displaySkeletonLoader={isLoading}
                    >
                      <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                        <Text style={{ color: ColorsPalett.textColorSecond, fontSize: 12 }} numberOfLines={1} >{item?.description}</Text>
                      </View>
                    </SkeletonLoader>
                  </View>
                </View>
              </View>

            </TouchableOpacity>

          </View>
        </SharedElement>

        {/* <Video
          source={{ uri: `${SOURCE}/${item.id}.mp4` }}
          poster={`${SOURCE}/images/${item.id}.jpg`}
          posterResizeMode="contain"
          // ref=(videoRef)
          onBuffer={onBuffer}
          onError={videoError}
          style={{ width: Dimensions.get('screen').width - 10, height: VideoSettings.VIDEO_HEIGHT - 10 }}
          paused={!focused}
        /> */}

        {/* <VideoPlayer
          source={{ uri: `${SOURCE}/${item.id}.mp4` }}
          poster={`${SOURCE}/images/${item.id}.jpg`}
          posterResizeMode="stretch"
          // ref=(videoRef)
          onBuffer={onBuffer}
          onError={videoError}
          videoStyle={{ width: Dimensions.get('screen').width - 10, height: VideoSettings.VIDEO_HEIGHT - 10 }}
          paused={!focused}
          toggleResizeModeOnFullscreen={false}
          tapAnywhereToPause={true}
          showOnStart={false}

          doubleTapTime={-1}

          // disableFullscreen
          // disablePlayPause
          // disableSeekbar
          disableTimer
          disableBack
          disableVolume
        /> */}

      </View >
    </View >
  );
}

export default memo(ListSingleVideo);