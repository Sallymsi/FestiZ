import React, { useRef } from 'react';
import { View, Text, Button, SafeAreaView, TextInput, ScrollView } from 'react-native';
import style from '../Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Key from '../js/keyAccess';
import Geocoder from 'react-native-geocoding';
import { addParty } from '../js/fetch';
import { Slider } from '@react-native-assets/slider';

export default function FormScreen({ navigation }) {
    const [name, onChangeName] = React.useState('');
    const [city, onChangeCity] = React.useState('');
    const [address, onChangeAddress] = React.useState('');
    const [latitude, onChangeLatitude] = React.useState(0.0);
    const [longitude, onChangeLongitude] = React.useState(0.0);
    const [people, onChangePeople] = React.useState('');
    const [yearMin, onChangeYearMin] = React.useState('');
    const [yearMax, onChangeYearMax] = React.useState('');
    const [selectedGender, setSelectedGender] = React.useState('Homme');
    const [date, setDate] = React.useState(new Date().toLocaleDateString());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const ref = useRef();

    const dateArray = date.split('/');
    const newDate = dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];

    Geocoder.init("", { language: "fr" });

    async function PlaceId(placeId) {
        console.log(placeId);
        Geocoder.from(placeId)
            .then(json => {
                var location = json.results[0].geometry.location;
                console.log(location);
                onChangeLatitude(location.lat);
                onChangeLongitude(location.lng);
                onChangeAddress(placeId);
            })
            .catch(error => console.warn(error));
    };

    const form = {
        "name": name,
        "city": city,
        "address": address,
        "lat": latitude,
        "lng": longitude,
        "date": newDate,
        "people": people,
        "minYear": yearMin,
        "maxYear": yearMax,
        "gender": selectedGender
    };

    const options = {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-type": "application/json" }
    };

    function clearInput() {
        onChangeName('');
        onChangeCity('');
        onChangePeople('');
        onChangeYearMin('');
        onChangeYearMax('');
        setSelectedGender('Homme');
        ref.current?.clear();
    }

    const onChange = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate.toLocaleDateString());
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <SafeAreaView style={style.container}>
            <ScrollView
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps={'handled'}
            >
                <TextInput
                    style={style.input}
                    onChangeText={onChangeName}
                    value={name}
                    placeholder='Nom de la soirée'
                    keyboardAppearance="dark"
                    maxLength={30}
                />
                <TextInput
                    style={style.input}
                    onChangeText={onChangeCity}
                    value={city}
                    placeholder='Ville'
                    keyboardAppearance="dark"
                    maxLength={30}
                />
                <GooglePlacesAutocomplete
                    ref={ref}
                    placeholder="Search"
                    minLength={2}
                    query={{
                        key: Key(),
                        language: 'fr',
                    }}
                    onPress={(data, details = null) => PlaceId(data.description)}
                    onFail={(error) => console.error(error)}
                    disableScroll={true}
                    styles={{
                        textInput: {
                            height: 40,
                            fontSize: 16,
                            margin: 12,
                            padding: 10,
                        }
                    }}
                />
                <View style={style.containerDate}>
                    <Text style={style.textDate}>Date :</Text>
                    <View style={style.date}>
                        <DateTimePicker
                            testID="dateTimePicker"
                            display="default"
                            minimumDate={new Date()}
                            value={new Date()}
                            mode={'date'}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    </View>
                </View>
                <View style={style.containsRow}>
                    <TextInput
                        value={people.toString()}
                        inputMode="numeric"
                        returnKeyType={'done'}
                        style={style.inputSlider}
                        placeholder='Nombre de personne(s)'
                        editable={false}
                    />
                    <Slider
                        value={0}
                        minimumValue={4}
                        maximumValue={20}
                        step={1}
                        onValueChange={onChangePeople}
                        thumbTintColor='#01C38E'
                        thumbSize={20}
                        style={style.slider}
                    />
                </View>
                <View style={style.containsRow}>
                    <TextInput
                        inputMode="numeric"
                        value={yearMin.toString()}
                        returnKeyType={'done'}
                        style={style.inputSlider}
                        placeholder='Age minimum'
                        editable={false}
                    />
                    <Slider
                        value={18}
                        minimumValue={18}
                        maximumValue={80}
                        step={1}
                        onValueChange={onChangeYearMin}
                        thumbTintColor='#01C38E'
                        thumbSize={20}
                        style={style.slider}
                    />
                </View>
                <View style={style.containsRow}>
                    <TextInput
                        inputMode="numeric"
                        value={yearMax.toString()}
                        returnKeyType={'done'}
                        style={style.inputSlider}
                        placeholder='Age maximum'
                        editable={false}
                    />
                    <Slider
                        value={18}
                        minimumValue={18}
                        maximumValue={80}
                        step={1}
                        onValueChange={onChangeYearMax}
                        thumbTintColor='#01C38E'
                        thumbSize={20}
                        style={style.slider}
                    />
                </View>

                <Text style={style.picker}>Soirée {selectedGender}</Text>
                <Picker
                    selectedValue={selectedGender}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedGender(itemValue)
                    }>
                    <Picker.Item label="Femme" value="Femme" />
                    <Picker.Item label="Homme" value="Homme" />
                    <Picker.Item label="Mixte" value="Mixte" />
                </Picker>
                <Button title="Envoyer" onPress={() => addParty(options, navigation).then(() => {
                    clearInput();
                    navigation.navigate('Home');
                    alert('Soirée enregistrée !');
                })}></Button>
            </ScrollView>
        </SafeAreaView >
    );
}