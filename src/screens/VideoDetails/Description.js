// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================

const Description = ({ item }) => {
  // ===================================================================
  // Style
  // -------------------------------------------------------------------
  const { container, containerInner, titleContainer, titleText, descriptionContainer, descriptionText } = style
  // ===================================================================

  return (
    <View style={container}>
      <View style={containerInner}>
        <View style={titleContainer}>
          <Text style={titleText} >{'Description'}</Text>
        </View>

        <View style={descriptionContainer}>
          <Text style={descriptionText} >{item?.description}</Text>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginTop: 5,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: ColorsPalett.cardBackgroundInner
  },
  containerInner: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 5,
    overflow: 'hidden'
  },
  titleContainer: {
    width: '100%',
    marginBottom: 5
  },
  titleText: {
    color: ColorsPalett.textColorSecond,
    fontSize: 11
  },
  descriptionContainer: {
    width: '100%',
    justifyContent: 'center'
  },
  descriptionText: {
    color: ColorsPalett.textColorSecond,
    fontSize: 13
  }
});

export default memo(Description);