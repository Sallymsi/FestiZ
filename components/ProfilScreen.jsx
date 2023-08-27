import * as React from 'react';
import { View, Text, Button, Pressable, Image, ScrollView } from 'react-native';
import style from '../Style';
import * as SecureStore from 'expo-secure-store';
import { getProfil } from '../js/fetch';

export default function ProfilScreen({ authContext, userId }) {
    const urlPartyUser = 'http://localhost:8080/api/post/party-user/';
    let [email, changeEmail] = React.useState();
    let [name, changeName] = React.useState();
    let [gender, changeGender] = React.useState();
    let [year, changeYear] = React.useState();

    React.useEffect(() => {
        getProfil(userId).then((data) => {
            changeName(data[0].name);
            changeEmail(data[0].email);
            changeGender(data[0].gender);
            changeYear(data[0].year);
        })
    }, []);

    return (
        <View style={style.container}>
            <View style={style.caseText}>
                <Button
                    title="Choisir une photo !"
                    color="#01C38E"
                />
            </View>
            <View style={style.caseText}>
                <Text>{name}</Text>
            </View>
            <View style={style.caseText}>
                <Text>{year}</Text>
            </View>
            <View style={style.caseText}>
                <Text>{gender}</Text>
            </View>
            <View style={style.caseText}>
                <Text>{email}</Text>
            </View>
            <View style={style.caseText}>
                <Button
                    color="#01C38E"
                    title="Se déconnecter !"
                    onPress={() => authContext.signOut()}
                />
            </View>
        </View>
    );
}