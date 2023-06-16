// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, useState, useEffect, useCallback } from 'react'
import { Pressable, View, Text, Platform, Animated, Easing } from 'react-native'
// =================================================================== 
// Components
// ===================================================================
import { CustomIcon, } from 'components';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================


const CustomButton = ({ containerStyle = {}, text, textStyle = {}, icon, onPress, disabled = false, pressableBackground, reverse = false, animateLoading = false }) => {

    return (
        <View style={{ width: '100%', height: 60, overflow: 'hidden', borderRadius: 10, ...containerStyle }}>
            <Pressable
                disabled={disabled}
                android_ripple={{ color: pressableBackground ? pressableBackground : ColorsPalett.rippleColor, }}
                onPress={() => { onPress() }}
                style={({ pressed }) => [{ backgroundColor: pressed && Platform.OS === 'ios' ? ColorsPalett.rippleColor : 'transparent', justifyContent: 'center', alignItems: 'center', flexDirection: reverse ? 'row-reverse' : 'row', width: '100%', height: '100%' }]}
            >
                {icon ?
                    <View style={{}}>
                        <CustomIcon type={icon.type} name={icon.name} color={ColorsPalett.textColorMain} style={{ fontSize: icon.iconSize, marginRight: reverse ? 0 : 10, marginLeft: reverse ? 10 : 0, ...icon.iconStyle }} />
                    </View>
                    : <View />
                }
                <Text style={{ fontSize: 16, color: ColorsPalett.textColorMain, ...textStyle }}>{text}</Text>
            </Pressable>
        </View>
    )
}

export default memo(CustomButton);
