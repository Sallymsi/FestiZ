import * as React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import style from '../../Style';
import MapView, { Marker } from 'react-native-maps';

export default function CardParty({ element, index, navigation, imageUser }) {
    return (
        <Pressable onPress={() => navigation.navigate('PartyCard', {
            indexParty: { index },
            element: element,
            imageUser: imageUser,
        })}>
            <Image style={style.itemImg} source={require('../../assets/city/effeil.png')} />
            <View style={style.itemText}>
                <View style={style.avatarBlock}>
                    <Image style={style.avatar} source={{ uri: imageUser }} />
                </View>
                <View style={style.itemInfo}>
                    <Text style={style.itemTextUnit}>{element.name}</Text>
                    <Text style={style.itemTextUnitCity}>{element.city} ({element.date.substr(0, 10)})</Text>
                    <Text style={style.itemTextUnitAddress}>{element.address}</Text>
                    <Text style={style.itemTextUnitPeople}>{element.people} pers. max ({element.gender})</Text>
                </View>
                <View style={style.itemMaps}>
                    <MapView style={style.map}
                        initialRegion={{
                            latitude: `${element.lat}`,
                            longitude: `${element.lng}`,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.05,
                        }}
                        zoomEnabled={false}
                        minZoomLevel={13}
                        maxZoomLevel={13}
                        rotateEnabled={false}
                        scrollEnabled={false}
                    >
                        <Marker
                            coordinate={{ latitude: element.lat, longitude: element.lng }}
                            pinColor={'#01C38E'}
                        />
                    </MapView>
                </View>
            </View>
        </Pressable>
    )
}