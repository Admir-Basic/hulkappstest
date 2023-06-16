// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { } from 'react-native-gesture-handler';
import { Switch } from 'react-native-paper';
import { SharedElement } from 'react-navigation-shared-element';
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

import Search from './Search'

const Header = ({ onSubmitSearch, displaySearch = false, displayMode = false, headerText = null, resetSearch = false, }) => {
  // ===================================================================
  // Redux Props
  // -------------------------------------------------------------------
  const dispatch = useDispatch()
  const netInfo = useSelector(selectNetInfo)
  const offlineMode = useSelector(selectOfflineMode)
  // ===================================================================

  return (

    <View style={{ width: '100%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: ColorsPalett.headerBackground }} >
      <SharedElement id={`header`} >
        <View style={{ width: Dimensions.get('screen').width, height: 60, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: ColorsPalett.headerBackground }} >
          {displaySearch &&
            < Search
              onSubmitSearch={onSubmitSearch}
              resetSearch={resetSearch}
            />
          }

          {displayMode &&
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 10, color: ColorsPalett.textColorSecond, marginRight: 5, textAlign: 'right' }} >{'Offline\nmode'}:</Text>
              <Switch disabled={!netInfo ? true : false} value={!netInfo ? true : offlineMode} onValueChange={(val) => { dispatch(setOfflineMode(val)) }} />
            </View>
          }

          {headerText && <Text style={{ fontSize: 14, color: ColorsPalett.textColorMain, }} >{headerText}</Text>}

        </View>
      </SharedElement>
    </View>
  );
}

export default memo(Header);