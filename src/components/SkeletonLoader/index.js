
// =================================================================== 
// Libraries
// ===================================================================
import { ConstNumbers } from "constantsConfiguration";
import React, { useEffect, memo, useMemo, useState, useRef } from "react";
import { View, } from "react-native";
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';
//=================================================================== 
import Loader from './Loader';

const SkeletonLoader = ({ children, customBackground = null, displaySkeletonLoader, customStyleMainContainer, fadeDuration = 500, }) => {
    // ===================================================================
    // State
    // -------------------------------------------------------------------
    // ===================================================================
    /* if (displaySkeletonLoader)
        return (
            <Animated.View exiting={FadeOut.duration(fadeDuration)} style={customStyleMainContainer ? customStyleMainContainer : { width: '100%', height: '100%', }}>
                <Loader
                    customBackground={customBackground}
                    displaySkeletonLoader={displaySkeletonLoader}
                />
            </Animated.View>
        );
    return (<Animated.View entering={FadeIn.duration(fadeDuration * 2)} style={customStyleMainContainer ? customStyleMainContainer : { width: '100%', height: '100%', }}>
        {children}
    </Animated.View>) */

    return (
        <View style={customStyleMainContainer ? customStyleMainContainer : { width: '100%', height: '100%', }}>
            {displaySkeletonLoader &&
                <Animated.View exiting={FadeOut.duration(fadeDuration)} style={{ width: '100%', height: '100%', }}>
                    <Loader
                        customBackground={customBackground}
                        displaySkeletonLoader={displaySkeletonLoader}
                    />
                </Animated.View>
            }
            {!displaySkeletonLoader &&
                <Animated.View entering={FadeIn.duration(fadeDuration)} style={{ width: '100%', height: '100%', }}>
                    {children}
                </Animated.View>
            }
        </View>
    )
};
export default memo(SkeletonLoader);
