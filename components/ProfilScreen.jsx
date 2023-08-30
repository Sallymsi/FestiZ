import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import style from '../Style';
import { getProfil } from '../js/fetch';

export default function ProfilScreen({ authContext, userId }) {
    let [email, changeEmail] = React.useState();
    let [name, changeName] = React.useState();
    let [imageProfil, changeImageProfil] = React.useState();
    let [gender, changeGender] = React.useState();
    let [year, changeYear] = React.useState();
    let [image, setImage] = React.useState(null);

    React.useEffect(() => {
        getProfil(userId).then((data) => {
            changeName(data[0].name);
            changeEmail(data[0].email);
            changeGender(data[0].gender);
            changeYear(data[0].year);
            changeImageProfil(data[0].image);
        })
    }, []);


    return (
        <View style={style.container}>
            <View style={style.caseText}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {imageProfil && <Image source={{ uri: imageProfil }} style={{ width: 200, height: 200 }} />}
                </View>
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