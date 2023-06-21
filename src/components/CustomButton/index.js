// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, } from 'react'
import { Pressable, View, Text, Platform, StyleSheet } from 'react-native'
// =================================================================== 
// Components
// ===================================================================
import { CustomIcon, } from 'components';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================

const CustomButton = ({ containerStyle = {}, text, textStyle = {}, icon, onPress, disabled = false, pressableBackground, reverse = false, }) => {
    // ===================================================================
    // Style
    // -------------------------------------------------------------------
    const { container, pressableContainer, buttonText, } = style
    // ===================================================================

    return (
        <View style={[container, containerStyle]}>
            <Pressable
                disabled={disabled}
                android_ripple={{ color: pressableBackground ? pressableBackground : ColorsPalett.rippleColor, }}
                onPress={() => { onPress() }}
                style={({ pressed }) => [pressableContainer, { backgroundColor: pressed && Platform.OS === 'ios' ? ColorsPalett.rippleColor : 'transparent', flexDirection: reverse ? 'row-reverse' : 'row', }]}
            >
                {icon ?
                    <View>
                        <CustomIcon type={icon.type} name={icon.name} color={ColorsPalett.textColorMain} style={{ fontSize: icon.iconSize, marginRight: reverse ? 0 : 10, marginLeft: reverse ? 10 : 0, ...icon.iconStyle }} />
                    </View>
                    : <View />
                }
                <Text style={[buttonText, textStyle]}>{text}</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        overflow: 'hidden',
        borderRadius: 10,
    },
    pressableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    buttonText: {
        fontSize: 16,
        color: ColorsPalett.textColorMain,
    },
});

export default memo(CustomButton);
