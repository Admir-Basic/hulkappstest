// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Dimensions, Text, StyleSheet, StatusBar, BackHandler } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
// ===================================================================
// Constants
// ===================================================================
import VideoSettings from 'constantsConfiguration/videoSettings';
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================
// Components
// ===================================================================
import { CustomIcon } from 'components'
import { moduleNames } from '../../constantsConfiguration/enums/modules';
// ===================================================================

const VideoDetails = ({ route, navigation }) => {
  const { item, progress } = route.params;

  const displayVideo = true

  const [fullScreen, setFullScreen] = useState(false)

  const player = useRef(null)


  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handlebackButton);
    return () => backHandler.remove();
  }, [fullScreen]);

  const handlebackButton = useCallback(() => {
    if (fullScreen) toggleFullScreen(false)
    else navigation.goBack();

    return true;
  }, [fullScreen]);


  const onBuffer = (buffer) => {
    // console.log('buffer ', JSON.stringify(buffer, null, 2))
  }

  const videoError = (err) => {
    // console.log('err ', JSON.stringify(err, null, 2))
  }

  const onProgress = (data) => {
    // console.log('data ', data)
    // this.progress = data.currentTime
  }

  const onPlay = () => {
  }

  const onPause = (data) => {
  }

  const toggleFullScreen = (status) => {
    if (!status) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    setFullScreen(status)
  }


  useEffect(() => {
    if (player?.current) player.current.seekTo(60)
  }, [player])

  return (
    <View style={{ width: '100%', flex: 1, backgroundColor: ColorsPalett.mainBackground, }} >

      <StatusBar
        animated={true}
        backgroundColor={'#00000000'}
        barStyle={"light-content"}
        translucent={fullScreen}
        hidden={fullScreen}
      />

      {/*  <Header
        headerText={'Test'}
      /> */}

      <View style={{ width: '100%', flex: 1, backgroundColor: ColorsPalett.mainBackground, paddingHorizontal: fullScreen ? 0 : 5 }} >
        <View style={{ width: '100%', height: fullScreen ? '100%' : VideoSettings.VIDEO_HEIGHT }} >
          <SharedElement id={`item.${item.thumb}`}>
            <View style={{ width: '100%', height: fullScreen ? '100%' : VideoSettings.VIDEO_HEIGHT - 10, padding: fullScreen ? 0 : 5, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorsPalett.cardBackground, borderRadius: fullScreen ? 0 : 5 }} >
              <View style={{ width: '100%', flex: 1, borderRadius: 5, overflow: 'hidden' }}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorsPalett.cardBackgroundInner }}>
                  {displayVideo
                    ? <VideoPlayer
                      // fullscreen={fullScreen}
                      source={{ uri: `${item.sources}` }}
                      poster={`${VideoSettings.SOURCE}/${item.thumb}`}
                      posterResizeMode="cover"
                      ref={player}
                      onBuffer={onBuffer}
                      onError={videoError}
                      videoStyle={{ width: '100%', height: fullScreen ? '100%' : VideoSettings.VIDEO_HEIGHT - 25 - VideoSettings.VIDEO_INFO_HEIGHT }}
                      paused={false}
                      toggleResizeModeOnFullscreen={true}
                      tapAnywhereToPause={false}
                      showOnStart={true}
                      doubleTapTime={300}

                      onProgress={onProgress}

                      onLoad={() => {
                        player.current.seekTo(60)
                      }}

                      onEnterFullscreen={() => {
                        // console.log('usao')
                        toggleFullScreen(true)
                      }}

                      onExitFullscreen={() => {
                        // console.log('usao')
                        toggleFullScreen(false)
                      }}

                      onPlay={onPlay}
                      onPause={onPause}

                      // disablePlayPause
                      // disableSeekbar
                      // disableTimer
                      // disableFullscreen
                      disableBack
                      disableVolume
                    />

                    : <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }}>
                      <Text style={{ color: ColorsPalett.textColorMain, fontSize: 16 }} >{item?.thumb}</Text>
                      <Text style={{ color: ColorsPalett.textColorMain, fontSize: 16 }} >{'Play'}</Text>
                    </View>
                  }

                </View>

              </View>

              {!fullScreen &&
                <View style={{ width: '100%', height: VideoSettings.VIDEO_INFO_HEIGHT, marginTop: 5, borderRadius: 5, overflow: 'hidden', backgroundColor: ColorsPalett.cardBackgroundInner }}>

                  <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 5, paddingVertical: 5, }}>
                    <View style={{ width: 70, height: '100%', justifyContent: 'center', alignItems: 'center', }} >
                      <View style={{ width: 55, height: 55, borderRadius: 100, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', backgroundColor: ColorsPalett.cardBackgroundIcon }} >
                        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', }} >
                          <CustomIcon type={'Feather'} name={'user'} color={ColorsPalett.textColorWhite} style={{ fontSize: 30 }} />
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 1, height: '100%', justifyContent: 'space-around', paddingHorizontal: 5, paddingVertical: 5, }}>
                      <View style={{ width: '100%', height: '45%', justifyContent: 'center', borderRadius: 5, overflow: 'hidden' }}>
                        <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                          <Text style={{ color: ColorsPalett.textColorWhite, fontSize: 16 }} numberOfLines={1} >{item?.title}</Text>
                        </View>
                      </View>

                      <View style={{ width: '100%', height: '45%', justifyContent: 'center', borderRadius: 5, overflow: 'hidden' }}>
                        <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                          <Text style={{ color: ColorsPalett.textColorSecond, fontSize: 12 }} numberOfLines={1} >{item?.description}</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                </View>
              }
            </View>
          </SharedElement>
        </View>
      </View>

    </View>
  );
}

export default VideoDetails;