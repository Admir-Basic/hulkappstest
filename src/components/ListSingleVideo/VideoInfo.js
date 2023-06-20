// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
import { moduleNames } from '../../constantsConfiguration/enums/modules';
import VideoSettings from '../../constantsConfiguration/videoSettings';
// ===================================================================
import { SkeletonLoader, CustomIcon } from 'components'

const VideoInfo = ({ navigation, item, isLoading, openVideo }) => {

  return (
    <TouchableOpacity disabled={isLoading} onPress={() => { openVideo(item) }} /* onPress={() => { navigation.push(moduleNames.VIDEO_DETAILS, { item }) }} */ style={{ width: '100%', height: VideoSettings.VIDEO_INFO_HEIGHT, marginTop: 5, borderRadius: 5, overflow: 'hidden', backgroundColor: ColorsPalett.cardBackgroundInner }}>

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
  );
}

export default memo(VideoInfo);