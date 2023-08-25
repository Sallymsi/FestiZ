import * as React from 'react';
import { View, Text, Button, Pressable, Image, ScrollView } from 'react-native';
import style from '../Style';
import * as SecureStore from 'expo-secure-store';
import { getProfil } from '../js/fetch';

export default function ProfilScreen({ authContext, userId }) {
    const urlPartyUser = 'http://192.168.0.28:8080/api/post/party-user/';
    let [email, changeEmail] = React.useState();
    let [name, changeName] = React.useState();
    let [gender, changeGender] = React.useState();
    let [year, changeYear] = React.useState();
    let [party, changeParty] = React.useState([]);

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
        getPartyUser(userId);
    }, []);

    async function getPartyUser(userId) {
        fetch(urlPartyUser + userId)
            .then(resp => resp.json())

            .then((data) => {
                changeParty(data);
                console.log(data);
            })

            .catch(function (error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                throw error;
            })
    };

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
            <ScrollView style={style.caseParty}>
                {party.map((element, index) => (
                    <View key={`${element}-${index}`} style={style.item}>
                        <Pressable>
                            <Image style={style.itemImg} source={require('../assets/city/effeil.png')} />
                            <View style={style.itemText}>
                                <View style={style.avatarBlock}>
                                    <Image style={style.avatar} source={require('../assets/city/user.jpg')} />
                                </View>
                                <View style={style.itemInfo}>
                                    <Text style={style.itemTextUnit}>{element.name} ({element.activity})</Text>
                                    <Text style={style.itemTextUnitCity}>{element.city} ({element.date.substr(0, 10)})</Text>
                                    <Text style={style.itemTextUnitAddress}>{element.address}</Text>
                                    <Text style={style.itemTextUnitPeople}>{element.people} pers. max ({element.gender})</Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
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