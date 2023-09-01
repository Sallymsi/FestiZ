import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import style from '../Style';
import MapView, { Marker } from 'react-native-maps';
import TextFont from '../components/utils/TextFont.jsx';

export default function PartyCardScreen({ route, userId }) {
    const { element, imageUser } = route.params;
    const [isMap, setIsMap] = React.useState(false);

    return (
        <View style={style.container}>
            <View style={style.caseText}>
                <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                    <Text>Créateur :</Text>
                    {imageUser && (
                        <View style={{ width: 100, height: 100 }}>
                            <Image source={{ uri: imageUser }} style={{ width: 100, height: 100, borderRadius: 100 }} />
                        </View>
                    )}
                </View>
                <TextFont title={element.name} size={25} />
            </View>
            {/* {!isMap && (
                <View>
                    <Button
                        title="Afficher la map !"
                        color='#01C38E'
                        onPress={() => setIsMap(true)}
                    />
                </View>
            )}
            {isMap && (
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
                        mapType={Platform.OS == "android" ? "none" : "standard"}
                    >
                        <Marker
                            coordinate={{ latitude: element.lat, longitude: element.lng }}
                            pinColor={'green'}
                        />
                    </MapView>
                </View>
            )} */}
            <View style={style.caseText}>
                <Text>Information sur la soirée :</Text>
            </View>
            {!isMap && (
                <View>
                    <Button
                        title="Afficher la map !"
                        color='#01C38E'
                        onPress={() => setIsMap(true)}
                    />
                </View>
            )}
            {isMap && (
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
                        mapType={Platform.OS == "android" ? "none" : "standard"}
                    >
                        <Marker
                            coordinate={{ latitude: element.lat, longitude: element.lng }}
                            pinColor={'green'}
                        />
                    </MapView>
                </View>
            )}
            <View style={style.caseText}>
                <Text>{element.activity}</Text>
            </View>
            <View style={style.caseText}>
                <Text>{element.address}</Text>
            </View>
            <View style={style.caseText}>
                <Text>{element.gender}</Text>
            </View>

            {userId != element.userId ? (
                <View>
                    <Button
                        title='Je participe !'
                        color='#01C38E'
                    />
                </View>
            ) : (
                <View>
                    <Button
                        title="Annuler l'événement !"
                        color='#01C38E'
                    />
                </View>
            )}
        </View>
    );
    // }

}