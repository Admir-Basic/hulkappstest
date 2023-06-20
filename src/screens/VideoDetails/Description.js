// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, } from 'react';
import { View, Text, } from 'react-native';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================

const Description = ({ item }) => {
  return (
    <View style={{ width: '100%', padding: 10, marginTop: 5, borderRadius: 5, overflow: 'hidden', backgroundColor: ColorsPalett.cardBackgroundInner }}>
      <View style={{ width: '100%', justifyContent: 'space-around', paddingHorizontal: 5, paddingVertical: 5, }}>
        <View style={{ width: '100%', justifyContent: 'center', borderRadius: 5, overflow: 'hidden' }}>
          <View style={{ width: '100%', marginBottom: 5 }}>
            <Text style={{ color: ColorsPalett.textColorSecond, fontSize: 11 }} >{'Description'}</Text>
          </View>

          <View style={{ width: '100%', justifyContent: 'center' }}>
            <Text style={{ color: ColorsPalett.textColorSecond, fontSize: 13 }} >{item?.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default memo(Description);