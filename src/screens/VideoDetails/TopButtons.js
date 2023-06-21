// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================
// Components
// ===================================================================
import { CustomIcon } from 'components'
// ===================================================================

const TopButtons = ({ handlebackButton, toggleFullScreen, hideFullScreen }) => {
  // ===================================================================
  // Style
  // -------------------------------------------------------------------
  const { container, button, icon } = style
  // ===================================================================

  return (
    <View style={container}>
      <TouchableOpacity onPress={handlebackButton} style={button} >
        <CustomIcon type={'Entypo'} name={'chevron-left'} color={ColorsPalett.textColorMain} style={icon} />
      </TouchableOpacity>

      {Platform.OS === 'android' && !hideFullScreen && <TouchableOpacity onPress={toggleFullScreen} style={button} >
        <CustomIcon type={'MaterialCommunityIcons'} name={'fullscreen'} color={ColorsPalett.textColorMain} style={icon} />
      </TouchableOpacity>}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 99
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
  }
});

export default memo(TopButtons);