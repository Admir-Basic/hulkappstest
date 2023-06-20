// =================================================================== 
// Libraries
// ===================================================================
import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
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

const StackShare = createSharedElementStackNavigator();

function ShareNavigator(props) {
    return (
        <StackShare.Navigator
            initialRouteName={moduleNames.HOME}
            screenOptions={({ route, navigation, }) => ({
                headerShown: false,
                orientation: 'portrait',
            })}
        >
            <StackShare.Screen name={moduleNames.HOME} component={Home} />
            <StackShare.Screen
                name={moduleNames.VIDEO_DETAILS}
                component={VideoDetails}
                sharedElements={(route, otherRoute, showing) => {
                    const { item } = route.params;
                    return [{
                        id: `item.${item.id}`,
                        animation: 'move',
                        resize: 'none ',
                        align: 'auto'
                    }];
                }}
            />
        </StackShare.Navigator>
    )
}

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
                    console.log('route ', JSON.stringify(route, null, 2))
                    return ({
                    headerShown: false,
                    orientation: route.name === moduleNames.HOME ? 'portrait' : 'all',
                    gestureEnabled: false,
                    animation: 'slide_from_left',
                })}}
            >
                {/* < Stack.Screen name={'Share'} component={ShareNavigator} /> */}
                < Stack.Screen name={moduleNames.HOME} component={Home} />
                < Stack.Screen name={moduleNames.VIDEO_DETAILS} component={VideoDetails} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}

export default AppNavigator;