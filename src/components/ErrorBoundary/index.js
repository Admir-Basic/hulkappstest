// =================================================================== 
// Libraries
// ===================================================================
import React, { memo } from 'react'
import { View, Text, } from 'react-native'
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

const ErrorBoundary = ({ navigation, mainScreen, boundaryError, errorText, children, }) => {

    // ===================================================================
    // Redux Props
    // ===================================================================

    const goBack = () => {
        if (mainScreen) {
            RNExitApp.exitApp();
        } else {
            navigation.replace(moduleNames.HOME);
        }
    }

    if (boundaryError) {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', backgroundColor: ColorsPalett.mainBackground }}>
                <View style={{ paddingHorizontal: 20, alignItems: 'center', marginTop: -80, }}>
                    <Text style={{ fontSize: 32, textAlign: 'center', color: ColorsPalett.textColorMain }}>Oops, Something Went Wrong</Text>
                    <Text style={{ marginVertical: 10, lineHeight: 23, color: ColorsPalett.textColorMain, fontWeight: '500', textAlign: 'center' }}>
                        {`The app ran into a problem and could not continue. We apologise for any inconvenience this has caused! Press the button below to ${mainScreen ? 'exit application' : 'go back'}. Please contact us if this issue persists.`}
                    </Text>

                    <View style={{ width: '100%' }}>
                        <CustomButton
                            containerStyle={{ height: 55, marginTop: 20, marginBottom: 10, width: '100%', backgroundColor: ColorsPalett.buttonBackgroundMain }}
                            text={mainScreen ? 'Exit App' : 'Go Back'}
                            textStyle={{ fontSize: 20, color: ColorsPalett.textColorMain }}
                            onPress={() => { goBack() }}
                            icon={{ name: 'arrowleft', type: 'AntDesign', iconSize: 28, iconStyle: { color: ColorsPalett.textColorMain, marginBottom: -2 } }}
                        />
                    </View>

                </View>
            </View >
        )
    } else {
        return children;
    }
}

export default memo(ErrorBoundary)