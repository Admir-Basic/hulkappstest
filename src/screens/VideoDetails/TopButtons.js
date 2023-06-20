// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
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

const TopButtons = ({ handlebackButton, toggleFullScreen, hideFullScreen }) => {

  return (
    <View style={{ position: 'absolute', top: 0, left: 10, right: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 99 }}>
      <TouchableOpacity onPress={handlebackButton} style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', }} >
        <CustomIcon type={'Entypo'} name={'chevron-left'} color={ColorsPalett.textColorMain} style={{ fontSize: 28, }} />
      </TouchableOpacity>

      {Platform.OS === 'android' && !hideFullScreen && <TouchableOpacity onPress={toggleFullScreen} style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', }} >
        <CustomIcon type={'MaterialCommunityIcons'} name={'fullscreen'} color={ColorsPalett.textColorMain} style={{ fontSize: 28, }} />
      </TouchableOpacity>}
    </View>
  );
}

export default memo(TopButtons);