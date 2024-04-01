import * as React from 'react';
import { TextInput, Button, SafeAreaView } from 'react-native';
import style from '../Style';
import ModalView from '../components/utils/ModalView.jsx';

export default function LoginScreen({ authContext, navigation }) {
    const [textError, onChangeTextError] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);
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
            {modalVisible && (
                <ModalView text={textError} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            )}
            <Button
                color="#01C38E"
                title="Se connecter !"
                onPress={() => {
                    if (!email || !pass) {
                        onChangeTextError('Veuillez remplir les champs ci-dessus.');
                        setModalVisible(true);
                    } else {
                        authContext.signIn({ form });
                    }
                }}
            />
            <Button
                color="#01C38E"
                title="S'inscrire !"
                onPress={() => navigation.navigate('Signin')}
            />
            <Button
                color="#01C38E"
                title="Form"
                onPress={() => console.log(form)}
            />
        </SafeAreaView>
    );
};