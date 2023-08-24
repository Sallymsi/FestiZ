import * as React from 'react';
import { TextInput, Button, SafeAreaView } from 'react-native';
import style from '../Style';

export default function LoginScreen({ authContext, navigation }) {
    const [email, onChangeEmail] = React.useState('');
    const [pass, onChangePass] = React.useState('');

    const form = {
        "email": email,
        "password": pass,
    };

    return (
        <SafeAreaView>
            <TextInput
                style={style.input}
                onChangeText={onChangeEmail}
                placeholder="Email"
                keyboardAppearance="dark"
                maxLength={30}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangePass}
                placeholder="Mot de passe"
                keyboardAppearance="dark"
                maxLength={30}
            />
            <Button
                color="#01C38E"
                title="Se connecter !"
                onPress={() => authContext.signIn({ form })}
            />
            <Button
                color="#01C38E"
                title="S'inscrire !"
                onPress={() => navigation.navigate('Signin')}
            />
            <Button
                color="#01C38E"
                title="Form !"
                onPress={() => console.log(form)}
            />
        </SafeAreaView>
    );
};