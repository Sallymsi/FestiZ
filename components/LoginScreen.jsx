import * as React from 'react';
import { Text, TextInput, Button, SafeAreaView } from 'react-native';
import style from '../Style';
import { login } from '../js/fetch';

export default function LoginScreen({ navigation }) {
    const [email, onChangeEmail] = React.useState('');
    const [pass, onChangePass] = React.useState('');

    const form = {
        "email": email,
        "password": pass,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-type": "application/json" }
    };

    return (
        <SafeAreaView>
            <TextInput
                style={style.input}
                onChangeText={onChangeEmail}
                // value={name}
                placeholder="Email"
                keyboardAppearance="dark"
                maxLength={30}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangePass}
                // value={year}
                placeholder="Mot de passe"
                keyboardAppearance="dark"
                maxLength={30}
            />

            <Button
                color="#01C38E"
                title="S'inscrire !"
                onPress={() => login(options, navigation)}
            />
            <Button
                color="#01C38E"
                title="Form !"
                onPress={() => console.log(form)}
            />
        </SafeAreaView>
    );
};