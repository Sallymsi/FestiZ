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
                autoComplete='email'
                selectionColor={'#01C38E'}
                maxLength={40}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangePass}
                placeholder="Mot de passe"
                secureTextEntry={true}
                selectionColor={'#01C38E'}
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
        </SafeAreaView>
    );
};