// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Dimensions, Text, StyleSheet, StatusBar, BackHandler, TouchableOpacity, Platform } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import { useDeviceOrientation } from '@react-native-community/hooks'
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

const Title = ({ item }) => {

  return (
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
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', borderRadius: 5, overflow: 'hidden' }}>
            <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
              <Text style={{ color: ColorsPalett.textColorWhite, fontSize: 16 }} numberOfLines={1} >{item?.title}</Text>
            </View>
          </View>

          {/* <View style={{ width: '100%', height: '45%', justifyContent: 'center', borderRadius: 5, overflow: 'hidden' }}>
                        <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                          <Text style={{ color: ColorsPalett.textColorSecond, fontSize: 12 }} numberOfLines={1} >{item?.description}</Text>
                        </View>
                      </View> */}
        </View>
      </View>

    </View>
  );
}

export default memo(Title);