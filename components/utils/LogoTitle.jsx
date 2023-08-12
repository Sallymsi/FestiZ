import * as React from 'react';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import style from '../../Style';

export default function LogoTitle({ title, size }) {

    const [fontsLoaded] = useFonts({
        'Shrikhand': require('../../assets/fonts/Shrikhand.ttf'),
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
        <View style={style.container} onLayout={onLayoutRootView}>
            <Text style={{ fontFamily: 'Shrikhand', fontSize: parseInt(size), color: '#01C38E', backgroundColor: '#fff' }}>{title}</Text>
        </View>
    );
}