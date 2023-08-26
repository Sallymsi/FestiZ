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
                selectionColor={'#01C38E'}
                placeholder="Pseudo"
                maxLength={30}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangeYear}
                placeholder="Age"
                selectionColor={'#01C38E'}
                keyboardType="number-pad"
                maxLength={2}
            />
            <CustomPicker
                data={["Homme", "Femme"]}
                currentIndex={genderTypeIndex}
                onSelected={selectedGender}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangeEmail}
                selectionColor={'#01C38E'}
                placeholder="Email"
                keyboardType="email-address"
                maxLength={50}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangePass}
                selectionColor={'#01C38E'}
                placeholder="Mot de passe"
                secureTextEntry={true}
                maxLength={30}
            />
            <Button
                color="#01C38E"
                title="S'inscrire !"
                onPress={() => authContext.signUp({ form })}
            />
        </SafeAreaView>
    );
};