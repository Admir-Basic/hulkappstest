// =================================================================== 
// Libraries
// ===================================================================
import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import { View, StatusBar, BackHandler, Platform, StyleSheet } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useDeviceOrientation } from '@react-native-community/hooks'
import ImmersiveMode from 'react-native-immersive-mode';
// ===================================================================
// Constants
// ===================================================================
import VideoSettings from 'constantsConfiguration/videoSettings';
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================
// Components
// ===================================================================
import TopButtons from './TopButtons'
import Title from './Title'
import Description from './Description'
import VideoPlayer from './VideoPlayer'
// ===================================================================

const VideoDetails = ({ route, navigation }) => {
  // ===================================================================
  // Params
  // -------------------------------------------------------------------
  const { item, progress } = route.params;
  // ===================================================================

  // ===================================================================
  // Style
  // -------------------------------------------------------------------
  const { mainContainer } = style
  // ===================================================================

  // ===================================================================
  // Listener
  // -------------------------------------------------------------------
  const orientation = useDeviceOrientation()
  // ===================================================================

  // ===================================================================
  // State
  // -------------------------------------------------------------------
  const [fullScreen, setFullScreen] = useState(false)
  // ===================================================================

  // ===================================================================
  // useEffect
  // -------------------------------------------------------------------
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handlebackButton);
    return () => backHandler.remove();
  }, [fullScreen]);

  useEffect(() => {
    if (orientation == 'landscape' || fullScreen) {
      ImmersiveMode.setBarMode('BottomSticky');
      ImmersiveMode.setBarTranslucent(true);
    }
    else {
      ImmersiveMode.setBarMode('Normal');
      ImmersiveMode.setBarTranslucent(false);
    }

    return () => {
      ImmersiveMode.setBarMode('Normal');
      ImmersiveMode.setBarTranslucent(false);
    }
  }, [orientation, fullScreen]);
  // ===================================================================

  // ===================================================================
  // Methods
  // -------------------------------------------------------------------
  const handlebackButton = useCallback(() => {
    if (fullScreen) toggleFullScreen(false)
    else navigation.goBack();

    return true;
  }, [fullScreen]);

  const toggleFullScreen = (status) => {
    if (Platform.OS === 'android') {
      if (!status) {
        Orientation.lockToPortrait();
      } else {
        Orientation.lockToLandscape();
      }
    }
    setFullScreen(status)
  }
  // ===================================================================

  return (
    <View style={mainContainer} >

      <StatusBar
        animated={true}
        backgroundColor={ColorsPalett.mainBackground}
        barStyle={"light-content"}
        translucent={fullScreen || orientation === 'landscape' ? true : false}
        hidden={fullScreen || orientation === 'landscape' ? true : false}
      />

      <TopButtons
        handlebackButton={handlebackButton}
        toggleFullScreen={() => { toggleFullScreen(!fullScreen) }}
        hideFullScreen={item ? false : true}
      />

      {item &&
        <View style={{ width: '100%', flex: 1, paddingHorizontal: fullScreen || orientation === 'landscape' ? 0 : 5, }} >
          <View style={{ width: '100%', height: fullScreen || orientation === 'landscape' ? '100%' : VideoSettings.VIDEO_HEIGHT }} >
            <View style={{ width: '100%', height: fullScreen || orientation === 'landscape' ? '100%' : VideoSettings.VIDEO_HEIGHT - 10, padding: fullScreen || orientation === 'landscape' ? 0 : 5, justifyContent: 'center', alignItems: 'center', backgroundColor: ColorsPalett.cardBackground, borderRadius: fullScreen ? 0 : 5 }} >

              <VideoPlayer
                item={item}
                videoProgressLocal={progress}
                fullScreen={fullScreen}
                orientation={orientation}
              />

              {!fullScreen && orientation != 'landscape' &&
                <Title
                  item={item}
                />
              }
            </View>
          </View>

          {!fullScreen && orientation != 'landscape' &&
            <Description
              item={item}
            />
          }
        </View>
      }

    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: ColorsPalett.mainBackground,
  },
});

export default memo(VideoDetails);