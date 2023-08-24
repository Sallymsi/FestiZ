import * as React from 'react';
import { TextInput, Button, SafeAreaView } from 'react-native';
import CustomPicker from './utils/CustomPicker';
import style from '../Style';

export default function SigninScreen({ authContext }) {
    const [name, onChangeName] = React.useState('');
    const [year, onChangeYear] = React.useState('');
    const [genderTypeIndex, setGenderTypeIndex] = React.useState(0);
    const [genderType, setGenderType] = React.useState('Homme');
    const [email, onChangeEmail] = React.useState('');
    const [pass, onChangePass] = React.useState('');

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

    const selectedGender = (index, item) => {
        setGenderTypeIndex(index);
        setGenderType(item);
    };

    return (
        <SafeAreaView>
            <TextInput
                style={style.input}
                onChangeText={onChangeName}
                placeholder="Pseudo"
                keyboardAppearance="dark"
                maxLength={30}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangeYear}
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
                onChangeText={onChangeEmail}
                // value={email}
                placeholder="Email"
                keyboardAppearance="dark"
                maxLength={50}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangePass}
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
                onPress={() => authContext.signUp({ form })}
            />
            {/* <Button
                color="#01C38E"
                title="Form !"
                onPress={() => console.log(form)}
            /> */}
        </SafeAreaView>
    );
};