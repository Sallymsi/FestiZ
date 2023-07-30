import * as React from 'react';
import { Text, SafeAreaView, ScrollView, Button, View, Image, Pressable, RefreshControl } from 'react-native';
import style from '../Style';
import MapView, { Marker } from 'react-native-maps';

export default function HomeScreen({ navigation }) {
    const url = 'http://192.168.0.28:8080/api/post/get-party/';
    const [party, setParty] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    React.useEffect(() => {
        getParty(options)
    }, []);

    const options = {
        method: "GET",
        headers: { "Content-type": "application/json" }
    };

    // Requête GET de récupération des party :
    async function getParty(options) {
        fetch(url, options)
            .then(resp => resp.json())

            .then((data) => {
                setParty(data);
            })
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getParty(options);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={style.container}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
        </SafeAreaView>
    );
}