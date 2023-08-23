import * as React from 'react';
import { Text, TextInput, Button, SafeAreaView } from 'react-native';
import style from '../Style';
import { AuthContext } from '../App';

export default function LoginScreen({ navigation }) {
    const [email, onChangeEmail] = React.useState('');
    const [pass, onChangePass] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

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
                // value="Proto1998@gmail.com"
                placeholder="Email"
                keyboardAppearance="dark"
                maxLength={30}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangePass}
                // value="Peluche1998"
                placeholder="Mot de passe"
                keyboardAppearance="dark"
                maxLength={30}
            />

            <Button
                color="#01C38E"
                title="S'inscrire !"
                onPress={() => signIn({form})}
            />
            <Button
                color="#01C38E"
                title="Form !"
                onPress={() => console.log(form)}
            />
        </SafeAreaView>
    );
};