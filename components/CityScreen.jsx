import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Key from '../js/keyAccess';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import style from '../Style';

export default function CityScreen({ navigation }) {
    const [latitude, setLatitude] = React.useState(0.0);
    const [longitude, setLongitude] = React.useState(0.0);
    const [latitudeDelta, setLatitudeDelta] = React.useState(0.04);
    const [longitudeDelta, setLongitudeDelta] = React.useState(0.06);

    Geocoder.init("AIzaSyAyrh2x7BkrzBN51rvf4kfS-U6OFNo1G-g", { language: "fr" });

    async function PlaceId(placeId) {
        console.log(placeId);
        Geocoder.from(placeId)
            .then(json => {
                var location = json.results[0].geometry.location;
                console.log(location);
                setLatitude(location.lat);
                setLongitude(location.lng);
            })
            .catch(error => console.warn(error));
    };

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder="Search"
                query={{
                    key: Key(),
                    language: 'fr',
                }}
                onPress={(data, details = null) => PlaceId(data.description)}
                onFail={(error) => console.error(error)}
            />
            {latitude != 0 && (
                <View style={style.itemMaps}>
                    <MapView style={style.map}
                        initialRegion={{
                            latitude: `${latitude}`,
                            longitude: `${longitude}`,
                            latitudeDelta: `${latitudeDelta}`,
                            longitudeDelta: `${longitudeDelta}`,
                        }} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 50,
        backgroundColor: '#ecf0f1',
    },
});