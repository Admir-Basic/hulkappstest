// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RNExitApp from 'react-native-exit-app';
//=================================================================== 
// Components
// ===================================================================
import { CustomButton } from 'components';
// ===================================================================
// Settings
// ===================================================================
import { moduleNames } from "constantsConfiguration/enums/modules";
// =================================================================== 
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================

const ErrorBoundary = ({ navigation, mainScreen, boundaryError, children, }) => {
    // ===================================================================
    // Style
    // -------------------------------------------------------------------
    const { container, containerInner, textTitle, textDescription, buttonContainer, buttonStyle, buttonTextStyle, buttonIconStyle } = style
    // ===================================================================

    // ===================================================================
    // Methods
    // -------------------------------------------------------------------
    const goBack = () => {
        if (mainScreen) {
            RNExitApp.exitApp();
        } else {
            navigation.replace(moduleNames.HOME);
        }
    }
    // ===================================================================

    if (boundaryError) {
        return (
            <View style={container}>
                <View style={containerInner}>
                    <Text style={textTitle}>Oops, Something Went Wrong</Text>
                    <Text style={textDescription}>
                        {`The app ran into a problem and could not continue. We apologise for any inconvenience this has caused! Press the button below to ${mainScreen ? 'exit application' : 'go back'}. Please contact us if this issue persists.`}
                    </Text>

                    <View style={buttonContainer}>
                        <CustomButton
                            containerStyle={buttonStyle}
                            text={mainScreen ? 'Exit App' : 'Go Back'}
                            textStyle={buttonTextStyle}
                            onPress={() => { goBack() }}
                            icon={{ name: 'arrowleft', type: 'AntDesign', iconSize: 28, iconStyle: { buttonIconStyle } }}
                        />
                    </View>

                </View>
            </View >
        )
    } else {
        return children;
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: ColorsPalett.mainBackground
    },
    containerInner: {
        paddingHorizontal: 20,
        alignItems: 'center',
        marginTop: -80,
    },
    textTitle: {
        fontSize: 32,
        textAlign: 'center',
        color: ColorsPalett.textColorMain
    },
    textDescription: {
        marginVertical: 10,
        lineHeight: 23,
        color: ColorsPalett.textColorMain,
        fontWeight: '500',
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%'
    },
    buttonStyle: {
        height: 55,
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
        backgroundColor: ColorsPalett.buttonBackgroundMain
    },
    buttonTextStyle: {
        fontSize: 20,
        color: ColorsPalett.textColorMain
    },
    buttonIconStyle: {
        color: ColorsPalett.textColorMain,
        marginBottom: -2
    },
});

export default memo(ErrorBoundary)