import * as React from 'react';
import { SafeAreaView, ScrollView, View, RefreshControl, StatusBar } from 'react-native';
import style from '../Style';
import CardParty from './utils/CardParty';
import { setTest } from '../js/fetch'

export default function HomeScreen({ navigation, userToken, userId }) {
    const url = 'http://192.168.0.28:8080/api/post/get-party/';
    const [party, setParty] = React.useState([]);
    const [imageUser, setImageUser] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    React.useEffect(() => {
        getParty(options);
        setTest(userId).then((data) => {
            setImageUser(data[0].image);
        });
    }, []);

    const options = {
        method: "GET",
        headers: { "Content-type": "application/json" }
    }

    // Requête GET de récupération des party :
    async function getParty(options) {
        fetch(url, options)
            .then(resp => resp.json())

            .then((data) => {
                setParty(data);
            })

            .catch(function (error) {
                console.log('There has been a problem with your fetch operation (getParty): ' + error.message);
                throw error;
            })
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getParty(options);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={style.container}>
            <StatusBar
                backgroundColor="#61dafb"
                barStyle='dark-content'
            />
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {party.map((element, index) => (
                    <View key={`${element}-${index}`} style={style.item}>
                        <CardParty element={element} index={index} navigation={navigation} imageUser={imageUser} />
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}