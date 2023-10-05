import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import style from '../Style';
import MapView, { Marker } from 'react-native-maps';
import TextFont from '../components/utils/TextFont.jsx';
import { setUserToParty, cancelParty } from '../js/fetch';

export default function PartyCardScreen({ route, userId }) {
    const { element } = route.params;
    const [isMap, setIsMap] = React.useState(false);

    const form = {
        "userId": userId,
        "partyId": element.id,
    }
    console.log(form);

    const options = {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-type": "application/json" }
    }

    return (
        <View style={style.container}>
            <View style={style.caseText}>
                {element.image && (
                    <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <Text>Créateur :</Text>
                        <View style={{ width: 100, height: 100 }}>
                            <Image source={{ uri: element.image }} style={{ width: 100, height: 100, borderRadius: 100 }} />
                        </View>
                    </View>
                )}
                <TextFont title={element.name} size={25} />
            </View>
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
                        onPress={() => setUserToParty(options)}
                    />
                </View>
            ) : (
                <View>
                    <Button
                        title="Annuler l'événement !"
                        color='#01C38E'
                        onPress={() => cancelParty(element.id)}
                    />
                </View>
            )}
        </View>
    );

}