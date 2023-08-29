import * as React from 'react';
import { View, Text, Button } from 'react-native';
import style from '../Style';
import MapView, { Marker } from 'react-native-maps';

export default function PartyCardScreen({ route, userId }) {
    const { element } = route.params;
    const [isMap, setIsMap] = React.useState(false);

    // React.useEffect(() => {
    //     console.log(element.element.userId);
    //     console.log(userId);
    // }, []);

    // if (userId != element.element.userId) {
       return (
            <View style={style.container}>
                <View style={style.caseText}>
                    <Text>{element.element.name}</Text>
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
                                latitude: `${element.element.lat}`,
                                longitude: `${element.element.lng}`,
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
                            coordinate={{ latitude: element.element.lat, longitude: element.element.lng }}
                            pinColor={'green'}
                        />
                        </MapView>
                    </View>
                )}
                <View style={style.caseText}>
                    <Text>Information sur la soirée :</Text>
                </View>
                <View style={style.caseText}>
                    <Text>{element.element.activity}</Text>
                </View>
                <View style={style.caseText}>
                    <Text>{element.element.address}</Text>
                </View>
                <View style={style.caseText}>
                    <Text>{element.element.gender}</Text>
                </View>
                {userId != element.element.userId ? (
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