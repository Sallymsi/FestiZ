import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Key from '../js/keyAccess';
// import style from '../Style';

export default function CityScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder="Search"
                query={{
                    key: Key(),
                    language: 'fr',
                }}
                onPress={(data, details = null) => console.log(data)}
                onFail={(error) => console.error(error)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
    },
});