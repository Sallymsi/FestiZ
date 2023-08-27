import * as React from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import style from '../Style';
import MapView, { Marker } from 'react-native-maps';

export default function PartyScreen({ userId }) {
    const urlPartyUser = 'http://localhost:8080/api/post/party-user/';
    let [party, changeParty] = React.useState([]);

    React.useEffect(() => {
        getPartyUser(userId);
    }, []);

    async function getPartyUser(userId) {
        fetch(urlPartyUser + userId)
            .then(resp => resp.json())

            .then((data) => {
                changeParty(data);
            })

            .catch(function (error) {
                console.log('There has been a problem with your fetch operation (getPartyUser): ' + error.message);
                throw error;
            })
    };

    return (
        <View style={style.container}>
            <View style={style.caseText}>
                <Text>Les événements que j'ai créés :</Text>
            </View>
            <ScrollView style={style.caseParty}>
                {party.map((element, index) => (
                    <View key={`${element}-${index}`} style={style.item}>
                        <Pressable>
                            <Image style={style.itemImg} source={require('../assets/city/effeil.png')} />
                            <View style={style.itemText}>
                                <View style={style.avatarBlock}>
                                    <Image style={style.avatar} source={require('../assets/city/user.jpg')} />
                                </View>
                                <View style={style.itemInfo}>
                                    <Text style={style.itemTextUnit}>{element.name} ({element.activity})</Text>
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
                                            pinColor={'green'}
                                        />
                                    </MapView>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
            {/* <View style={style.caseText}>
                <Text>Les événements auxquels je participe :</Text>
            </View> */}
        </View>
    );
}