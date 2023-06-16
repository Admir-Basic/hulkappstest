
// =================================================================== 
// Libraries
// ===================================================================
import React, { useEffect, memo, useMemo, useState, useRef } from "react";
// ===================================================================
// Constants
// ===================================================================
import ColorsPalett from 'constantsConfiguration/colors';
// ===================================================================
import Animated, {
    Value,
    EasingNode,
    interpolateNode,
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useDerivedValue,
    Extrapolate,
    interpolate,
    concat,
    degrees,
    withTiming,
    withRepeat,
    cancelAnimation,
    Easing,
    useAnimatedProps,
} from 'react-native-reanimated';

const Loader = ({ customBackground = null, displaySkeletonLoader, }) => {
    const opacityAnimation = useSharedValue(1);

    useEffect(() => {
        opacityAnimation.value = withRepeat(
            withTiming(0, {
                duration: 1000,
                easing: Easing.ease,
            }),
            -1,
            true
        )

    }, [])

    const animatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(opacityAnimation.value, [0, 1], [0.5, 0.9], {
            extrapolateLeft: Extrapolate.EXTEND,
            extrapolateRight: Extrapolate.EXTEND,
        })

        return {
            opacity: opacity,
        };
    });
    return (
        <Animated.View
            style={[{
                width: '100%',
                height: '100%',
                backgroundColor: customBackground ? customBackground : ColorsPalett.skeletonLoader,
            }, animatedStyles]}
        >
        </Animated.View>
    );
};
export default memo(Loader);
