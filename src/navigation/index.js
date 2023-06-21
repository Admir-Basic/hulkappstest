// =================================================================== 
// Libraries
// ===================================================================
import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// =================================================================== 
// Constants
// ===================================================================
import { moduleNames } from 'constantsConfiguration/enums/modules';
// ===================================================================
// Screens
// ===================================================================
// import Home from 'screens/Home';
import Home from 'screens/HomeFlashList';
// import Home from 'screens/HomeTest';
import VideoDetails from 'screens/VideoDetails';
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: ColorsPalett.mainBackground,
    },
};

const Stack = createNativeStackNavigator();

function AppNavigator(props) {
    // ===================================================================
    // Redux Props
    // -------------------------------------------------------------------
    // ===================================================================

    return (
        <NavigationContainer
            theme={navTheme}
        >
            <Stack.Navigator
                screenOptions={({ route, navigation, }) => {
                    return ({
                        headerShown: false,
                        orientation: 'portrait',
                        gestureEnabled: false,
                        animation: 'slide_from_left',
                        tabBarStyle: { display: 'none' }, tabBarVisible: false
                    })
                }}
            >
                < Stack.Screen name={moduleNames.HOME} component={Home} />
                < Stack.Screen
                    name={moduleNames.VIDEO_DETAILS}
                    component={VideoDetails}
                    options={{
                        orientation: Platform.OS === 'ios' ? 'all' : 'portrait'
                    }}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
}

export default AppNavigator;