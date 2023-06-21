// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react';
import { View, Text, Dimensions, StatusBar, StyleSheet } from 'react-native';
//====================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================
// Components
// ===================================================================
import Search from './Search'
import SwitchMode from './SwitchMode'
// ===================================================================


const Header = ({ onSubmitSearch, displaySearch = false, displayMode = false, headerText = null, resetSearch = false, }) => {
  // ===================================================================
  // Style
  // -------------------------------------------------------------------
  const { container, containerInner, titleText } = style
  // ===================================================================

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={ColorsPalett.headerBackground}
        barStyle={"light-content"}
        translucent={false}
        hidden={false}
      />

      <View style={container} >
        <View style={containerInner} >
          {displaySearch &&
            < Search
              onSubmitSearch={onSubmitSearch}
              resetSearch={resetSearch}
            />
          }

          {displayMode &&
            <SwitchMode />
          }

          {headerText && <Text style={titleText} >{headerText}</Text>}

        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorsPalett.headerBackground
  },
  containerInner: {
    width: Dimensions.get('screen').width,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorsPalett.headerBackground
  },
  titleText: {
    fontSize: 14,
    color: ColorsPalett.textColorMain,
  },
});

export default memo(Header);