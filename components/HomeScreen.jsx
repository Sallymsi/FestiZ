import * as React from 'react';
import { Text, SafeAreaView, ScrollView, Button, View, Image, Pressable, RefreshControl } from 'react-native';
import style from '../Style';

export default function HomeScreen({ navigation }) {
    const url = 'http://192.168.0.28:8080/api/post/get-party/';
    const [party, setParty] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    React.useEffect(() => {
        getParty(options)
    }, []);

    const options = {
        method: "GET",
        headers: { "Content-type": "application/json" }
    };

    // Requête GET de récupération des party :
    async function getParty(options) {
        fetch(url, options)
            .then(resp => resp.json())

            .then((data) => {
                console.log('Appel');
                setParty(data);
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
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {party.map((element, index) => (
                    <View key={`${element}-${index}`} style={style.item}>
                        <Pressable onPress={() => navigation.navigate('City', {
                            city: element.city,
                        })}>
                            <Image style={style.itemImg} source={require('../assets/city/effeil.png')} />
                            <View style={style.itemText}>
                                <View style={style.avatarBlock}>
                                    <Image style={style.avatar} source={require('../assets/city/user.jpg')} />
                                </View>
                                <View style={style.itemInfo}>
                                    <Text style={style.itemTextUnit}>{element.name}</Text>
                                    <Text style={style.itemTextUnit}>{element.city}</Text>
                                    <Text style={style.itemTextUnit}>{element.people} pers. max</Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}