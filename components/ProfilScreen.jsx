import * as React from 'react';
import { View, Text, Button } from 'react-native';
import style from '../Style';

export default function ProfilScreen({ navigation }) {
    // const { city } = route.params;
    return (
        <View style={style.container}>
            <View style={style.caseText}>
                <Text>Image</Text>
            </View>
            <View style={style.caseText}>
                <Text>Pseudo</Text>
            </View>
            <View style={style.caseText}>
                <Text>Ville</Text>
            </View>
            <View style={style.caseText}>
                <Text>Age</Text>
            </View>
        </View>
    );
}