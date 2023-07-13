import * as React from 'react';
import { Text, SafeAreaView, ScrollView, Button, View, Image, Pressable } from 'react-native';
import style from '../Style';

const List = [
    {
        'pays': 'France',
        'city': 'Paris',
        'image': require('../assets/city/effeil.png')
    },
    {
        'pays': 'Espagne',
        'city': 'Madrid',
        'image': require('../assets/city/paris.png')
    },
    {
        'pays': 'USA',
        'city': 'Atlanta',
        'image': require('../assets/city/nice.png')
    },
    {
        'pays': 'France',
        'city': 'Lyon',
        'image': require('../assets/city/lyon.png')
    },
];

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={style.container}>
            <ScrollView>
                {List.map((element, index) => (
                    <View key={`${element}-${index}`} style={style.item}>
                        <Pressable onPress={() => navigation.navigate('City', {
                            city: element.city,
                        })}>
                            <Image style={style.itemImg} source={element.image} />
                            <Text style={style.itemText}>{element.city}</Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}