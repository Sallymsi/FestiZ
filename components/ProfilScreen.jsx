import * as React from 'react';
import { View, Text, Button } from 'react-native';
import style from '../Style';
import * as SecureStore from 'expo-secure-store';
import { getProfil } from '../js/fetch';

export default function ProfilScreen({ authContext }) {
    let [email, changeEmail] = React.useState();
    let [name, changeName] = React.useState();
    let [gender, changeGender] = React.useState();
    let [year, changeYear] = React.useState();

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const getUserIdAsync = async () => {
            try {
                await SecureStore.getItemAsync('userId').then((userId) => {
                    getProfil(userId).then((data) => {
                        changeName(data[0].name);
                        changeEmail(data[0].email);
                        changeGender(data[0].gender);
                        changeYear(data[0].year);
                    })
                });
            } catch (e) {
                console.log('Not userId')
            }

        };

        getUserIdAsync();
    }, []);

    return (
        <View style={style.container}>
            <View style={style.caseText}>
                <Text>Image</Text>
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