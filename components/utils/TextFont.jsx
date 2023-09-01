import * as React from 'react';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function LogoTitle({ title, size }) {

    const [fontsLoaded] = useFonts({
        'Nunito': require('../../assets/fonts/Nunito.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View onLayout={onLayoutRootView}>
            <Text style={{ fontFamily: 'Nunito', fontSize: parseInt(size), color: '#01C38E', backgroundColor: '#ecf0f1' }}>{title}</Text>
        </View>
    );
}