import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Easing, Image, StatusBar } from "react-native";
import { Images } from 'constantsConfiguration';

export default function WithSplashScreen({
    children,
    isAppReady,
}) {
    return (
        <>
            {isAppReady && children}

            <Splash isAppReady={isAppReady} />
        </>
    );
}

const LOADING_IMAGE = "Loading image";
const FADE_IN_IMAGE = "Fade in image";
const WAIT_FOR_APP_TO_BE_READY = "Wait for app to be ready";
const FADE_OUT = "Fade out";
const HIDDEN = "Hidden";

export const Splash = ({ isAppReady }) => {
    const containerOpacity = useRef(new Animated.Value(1)).current;
    const imageOpacity = useRef(new Animated.Value(0)).current;
    const imageAnimation = useRef(new Animated.Value(0)).current;

    const [state, setState] = useState(LOADING_IMAGE);

    useEffect(() => {
        if (state === LOADING_IMAGE) setState(FADE_IN_IMAGE);
        if (state === FADE_IN_IMAGE) {
            Animated.timing(imageAnimation, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
                easing: Easing.linear
            }).start();

            setTimeout(() => {
                setState(WAIT_FOR_APP_TO_BE_READY);
            }, 800)
        }
    }, [imageAnimation, state]);

    useEffect(() => {
        if (state === WAIT_FOR_APP_TO_BE_READY) {
            if (isAppReady) {
                setState(FADE_OUT);
            }
        }
    }, [isAppReady, state]);

    useEffect(() => {
        if (state === FADE_OUT) {
            Animated.timing(containerOpacity, {
                toValue: 0,
                duration: 300, // Fade out duration
                delay: 500, // Minimum time the logo will stay visible
                useNativeDriver: true,
            }).start(() => {
                setState(HIDDEN);
            });
        }
    }, [containerOpacity, state]);

    const imageOpacity2 = imageAnimation.interpolate({
        inputRange: [0, 0.6, 1],
        outputRange: [0, 1, 1]
    });

    if (state === HIDDEN) return null;


    return (
        <Animated.View
            collapsable={false}
            style={[style.container, { opacity: containerOpacity }]}
        >
            <StatusBar
                animated={true}
                backgroundColor={'#000000'}
                barStyle={"light-content"}
            />

            {state !== LOADING_IMAGE &&
                <Animated.View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: -1, opacity: imageOpacity2 }}>
                    <Image
                        source={Images.Logo}
                        fadeDuration={0}
                        style={[style.image, { marginLeft: -15 }]}
                        resizeMode="contain"
                    />
                </Animated.View>
            }
        </Animated.View >
    );
};

const style = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000000',
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 150,
        height: 150,
    },
});