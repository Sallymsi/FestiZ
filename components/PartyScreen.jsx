import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import style from '../Style';
import CardParty from './utils/CardParty';

export default function PartyScreen({ userId }) {
    const urlPartyUser = 'http://localhost:8080/api/post/party-user/';
    let [party, changeParty] = React.useState([]);

    React.useEffect(() => {
        getPartyUser(userId);
    }, []);

    async function getPartyUser(userId) {
        fetch(urlPartyUser + userId)
            .then(resp => resp.json())

            .then((data) => {
                changeParty(data);
            })

            .catch(function (error) {
                console.log('There has been a problem with your fetch operation (getPartyUser): ' + error.message);
                throw error;
            })
    };

    return (
        <View style={style.container}>
            <View style={style.caseText}>
                <Text>Les événements que j'ai créés :</Text>
            </View>
            {party.length === 0 && (
                    <Text style={style.caseText}>Créer une Party et revenez içi ! 🎉</Text>
                )}
            <ScrollView style={style.caseParty}>
                {party.map((element, index) => (
                    <View key={`${element}-${index}`} style={style.item}>
                        <CardParty element={element} />
                    </View>
                ))}
            </ScrollView>
            <View style={style.caseText}>
                <Text>Les événements auquels je participe :</Text>
            </View>
            {/* <ScrollView style={style.caseParty}>
                {party.map((element, index) => (
                    <View key={`${element}-${index}`} style={style.item}>
                        <CardParty element={element} />
                    </View>
                ))}
                {party.length === 0 && (
                    <Text style={style.caseText}>Créer une Party et revenez içi ! 🎉</Text>
                )}
            </ScrollView> */}
        </View>
    );
}