import * as React from 'react';
import { Text, TextInput, Button, SafeAreaView } from 'react-native';
import CustomPicker from './utils/CustomPicker';
import style from '../Style';
import { signin } from '../js/fetch';

export default function SigninScreen({ navigation }) {
    const [name, onChangeName] = React.useState('');
    const [year, onChangeYear] = React.useState('');
    const [genderTypeIndex, setGenderTypeIndex] = React.useState(1);
    const [genderType, setGenderType] = React.useState('Homme');
    const [email, onChangeEmail] = React.useState('');
    const [pass, onChangePass] = React.useState('');
    // const [passVerif, onChangePassVerif] = React.useState('');

    const genderList = [
        'Femme',
        'Homme',
    ];

    const form = {
        "name": name,
        "year": year,
        "gender": genderType,
        "email": email,
        "password": pass,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-type": "application/json" }
    };

    const selectedGender = (index, item) => {
        setGenderTypeIndex(index);
        setGenderType(item);
    };


    return (
        <SafeAreaView>
            <TextInput
                style={style.input}
                onChangetext={onChangeName}
                // value={name}
                placeholder="Pseudo"
                keyboardAppearance="dark"
                maxLength={30}
            />
            <TextInput
                style={style.input}
                onChangetext={onChangeYear}
                // value={year}
                placeholder="Age"
                keyboardAppearance="dark"
                maxLength={2}
            />
            <CustomPicker
                data={genderList}
                currentIndex={genderTypeIndex}
                onSelected={selectedGender}
            />
            <TextInput
                style={style.input}
                onChangetext={onChangeEmail}
                // value={email}
                placeholder="Email"
                keyboardAppearance="dark"
                maxLength={50}
            />
            <TextInput
                style={style.input}
                onChangetext={onChangePass}
                // value={pass}
                placeholder="Mot de passe"
                keyboardAppearance="dark"
                maxLength={30}
            />
            {/* <TextInput
                style={style.input}
                onChangetext={onChangePassVerif}
                value={passVerif}
                placeholder="veuillez répéter"
                keyboardAppearance="dark"
                maxLength={30}
            /> */}
            <Button
                color="#01C38E"
                title="S'inscrire !"
                onPress={() => signin(options, navigation).then(() => {
                    // clearInput();
                    navigation.navigate('Home');
                    alert('User enregistré !');
                })}
            />
            <Button
                color="#01C38E"
                title="Form !"
                onPress={() => console.log(form)}
            />
        </SafeAreaView>
    );
};