import * as React from 'react';
import { Text, TextInput, Button, SafeAreaView } from 'react-native';
import style from '../Style';


export default function SigninScreen() {
    const [name, onChangeName] = React.useState('');
    const [year, onChangeYear] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [pass, onChangePass] = React.useState('');
    const [passVerif, onChangePassVerif] = React.useState('');

    return (
        <SafeAreaView>
            <TextInput
                style={style.input}
                onChangetext={onChangeName}
                value={name}
                placeholder="Pseudo"
                keyboardAppearance="dark"
                maxLength={30}
            />
            <TextInput
                style={style.input}
                onChangetext={onChangeYear}
                value={year}
                placeholder="Age"
                keyboardAppearance="dark"
                maxLength={2}
            />
            <TextInput
                style={style.input}
                onChangetext={onChangeEmail}
                value={email}
                placeholder="Email"
                keyboardAppearance="dark"
                maxLength={50}
            />
            <TextInput
                style={style.input}
                onChangetext={onChangePass}
                value={pass}
                placeholder="Mot de passe"
                keyboardAppearance="dark"
                maxLength={30}
            />
            <TextInput
                style={style.input}
                onChangetext={onChangePassVerif}
                value={passVerif}
                placeholder="veuillez répéter"
                keyboardAppearance="dark"
                maxLength={30}
            />
            <Button color="#01C38E" title="S'inscrire !">

            </Button>
        </SafeAreaView>
    );
};