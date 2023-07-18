import * as React from 'react';
import { View, Text, Button, SafeAreaView, TextInput, ScrollView } from 'react-native';
import style from '../Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { addParty } from '../js/fetch';


export default function FormScreen({ navigation }) {
    const [name, onChangeName] = React.useState('');
    const [city, onChangeCity] = React.useState('');
    const [people, onChangePeople] = React.useState(0);
    const [yearMin, onChangeYearMin] = React.useState(0);
    const [yearMax, onChangeYearMax] = React.useState(0);
    const [selectedGender, setSelectedGender] = React.useState();
    const [date, setDate] = React.useState(new Date().toLocaleDateString());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    // const form = new FormData();
    // form.set('name', name);
    // form.set('city', city);
    // form.set('date', date);
    // form.set('people', people);
    // form.set('minYear', yearMin);
    // form.set('maxYear', yearMax);
    // form.set('gender', selectedGender);

    const dateArray = date.split('/');
    const newDate = dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];

    const form = {
        "name": name,
        "city": city,
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

    function submit() {
        console.log(form);
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
            <ScrollView>
                <TextInput
                    style={style.input}
                    onChangeText={onChangeName}
                    placeholder='Nom de la soirée'
                />
                <TextInput
                    style={style.input}
                    onChangeText={onChangeCity}
                    placeholder='Lieu'
                />
                <Button onPress={showDatepicker} title="Show date picker!" />
                {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
                {show && (
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
                )}
                <TextInput
                    editable={false}
                    selectTextOnFocus={false}
                    style={style.input}
                    value={newDate}
                    placeholder='Date'
                />
                <TextInput
                    // autoComplete='cc-number'
                    inputMode="numeric"
                    returnKeyType={'done'}
                    style={style.input}
                    onChangeText={onChangePeople}
                    placeholder='Nombre de personne(s)'
                />
                <TextInput
                    // autoComplete='cc-number'
                    inputMode="numeric"
                    returnKeyType={'done'}
                    style={style.input}
                    onChangeText={onChangeYearMin}
                    placeholder='Age minimum'
                />
                <TextInput
                    // autoComplete='cc-number'
                    inputMode="numeric"
                    returnKeyType={'done'}
                    style={style.input}
                    onChangeText={onChangeYearMax}
                    placeholder='Age maximum'
                />
                <Text>Soirée ...</Text>
                <Picker
                    // style={{ width: 150 }}
                    selectedValue={selectedGender}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedGender(itemValue)
                    }>
                    <Picker.Item label="Homme" value="Homme" />
                    <Picker.Item label="Femme" value="Femme" />
                    <Picker.Item label="Mixte" value="Mixte" />
                </Picker>
                <Button title="Envoyer" onPress={() => addParty(options, navigation)}></Button>
            </ScrollView>
        </SafeAreaView>
    );
}