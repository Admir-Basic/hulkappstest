// =================================================================== 
// Libraries
// ===================================================================
import React from 'react';
import { SafeAreaView, } from 'react-native';
// =================================================================== 
// Components
// ===================================================================
import Navigation from 'navigation';
import MyNetInfo from 'components/MyNetInfo';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================

const Root = ({ }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: ColorsPalett.mainBackground }}>
            <Navigation />

            <MyNetInfo />
        </SafeAreaView >
    );
};

export default Root;