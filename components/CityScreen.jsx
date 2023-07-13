import * as React from 'react';
import { View, Text, Button } from 'react-native';
import style from '../Style';

export default function CityScreen({ route, navigation }) {
    const { city } = route.params;
    return (
        <View style={style.container}>
            <Text>Salut {city}</Text>
        </View>
    );
}