// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-paper';
//=================================================================== 
// Redux
// ===================================================================
import { useDispatch, useSelector } from 'react-redux';
import { selectNetInfo, selectOfflineMode, setOfflineMode } from 'reduxConfiguration/slices/netInfoSlice';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================

const SwitchMode = ({ }) => {
  // ===================================================================
  // Redux Props
  // -------------------------------------------------------------------
  const dispatch = useDispatch()
  const netInfo = useSelector(selectNetInfo)
  const offlineMode = useSelector(selectOfflineMode)
  // ===================================================================

  // ===================================================================
  // Style
  // -------------------------------------------------------------------
  const { container, textStyle, } = style
  // ===================================================================

  return (
    <View style={container}>
      <Text style={textStyle} >{'Offline\nmode'}:</Text>
      <Switch disabled={!netInfo ? true : false} value={!netInfo ? true : offlineMode} onValueChange={(val) => { dispatch(setOfflineMode(val)) }} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 10,
    color: ColorsPalett.textColorSecond,
    marginRight: 5,
    textAlign: 'right'
  },
});

export default memo(SwitchMode);