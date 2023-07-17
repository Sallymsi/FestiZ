import * as React from 'react';
import { View, Text, Button, SafeAreaView, TextInput, ScrollView } from 'react-native';
import style from '../Style';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from '@react-native-picker/picker';
import { Picker } from '@react-native-picker/picker';


export default function FormScreen() {
    const [name, onChangeName] = React.useState('');
    const [city, onChangeCity] = React.useState('');
    const [people, onChangePeople] = React.useState(0);
    const [yearMin, onChangeYearMin] = React.useState(0);
    const [yearMax, onChangeYearMax] = React.useState(0);
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);

    const [selectedGender, setSelectedGender] = React.useState();


    const form = {
        nom: name,
        ville: city,
        personnes: people,
        date: date,
        min: yearMin,
        max: yearMax,
        gender: selectedGender,
    }

    function sumbit() {
        console.log(form);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
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
                <Button onPress={showTimepicker} title="Show time picker!" />
                {show && (
                    <View style={style.date}>
                        <DateTimePicker
                            testID="dateTimePicker"
                            display="default"

                            minimumDate={new Date()}
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    </View>
                )}
                <TextInput
                    editable={false}
                    selectTextOnFocus={false}
                    style={style.input}
                    value={date.toLocaleString()}
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
                <Button title="Envoyer" onPress={sumbit}></Button>
            </ScrollView>

        </SafeAreaView>
    );
}