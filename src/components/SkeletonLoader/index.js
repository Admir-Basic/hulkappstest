
// =================================================================== 
// Libraries
// ===================================================================
import React, { memo, } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';
//=================================================================== 
// Components
// ===================================================================
import Loader from './Loader';
// ===================================================================

const SkeletonLoader = ({ children, customBackground = null, displaySkeletonLoader, customStyleMainContainer, fadeDuration = 500, }) => {
    // ===================================================================
    // Style
    // -------------------------------------------------------------------
    const { container } = style
    // ===================================================================

    return (
        <View style={customStyleMainContainer ? customStyleMainContainer : container}>
            {displaySkeletonLoader &&
                <Animated.View exiting={FadeOut.duration(fadeDuration)} style={container}>
                    <Loader
                        customBackground={customBackground}
                        displaySkeletonLoader={displaySkeletonLoader}
                    />
                </Animated.View>
            }
            {!displaySkeletonLoader &&
                <Animated.View entering={FadeIn.duration(fadeDuration)} style={container}>
                    {children}
                </Animated.View>
            }
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export default memo(SkeletonLoader);
