import * as React from 'react';
import { View, Text, Button, Pressable, Image, ScrollView } from 'react-native';
import style from '../Style';
import { getProfil } from '../js/fetch';
import * as ImagePicker from 'expo-image-picker';

export default function ProfilScreen({ authContext, userId }) {
    const urlProfilImage = 'http://localhost:8080/api/auth/profil-image/';
    let [email, changeEmail] = React.useState();
    let [name, changeName] = React.useState();
    let [imageProfil, changeImageProfil] = React.useState();
    let [gender, changeGender] = React.useState();
    let [year, changeYear] = React.useState();
    let [image, setImage] = React.useState(null);
    let [imageType, setImageType] = React.useState();
    let [imageFilename, setImageFilename] = React.useState();
    let data = new FormData();
    data.append('userId', userId);
    data.append('image', {
        uri : image,
        type: imageType,
        name: imageFilename
    });

    React.useEffect(() => {
        getProfil(userId).then((data) => {
            changeName(data[0].name);
            changeEmail(data[0].email);
            changeGender(data[0].gender);
            changeYear(data[0].year);
            changeImageProfil(data[0].image);
        })
    }, []);

    const options = {
        method: "POST",
        headers: {'Content-Type': 'multipart/form-data'},
        body: data,
    };

    function setProfilImage() {
        console.log(data);
        fetch(urlProfilImage, options)
            .then(resp => resp.json)

            .catch(function (error) {
                console.log('There has been a problem with your fetch operation (setProfilImage): ' + error.message);
                throw error;
            })
    }

    const pickImage = async () => {
        
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result.assets[0].uri);

        if (!result.canceled) {
            let image = result.assets[0].uri;
            let firstName = image.substring(image.lastIndexOf("/") + 1);
            let finalName = firstName.split(".")[0];
            let uriParts = image.split(".");
            let fileType = uriParts[uriParts.length - 1];
            console.log(finalName);
            setImage(image);
            setImageType(fileType);
            setImageFilename(finalName);
        }
    };

    return (
        <View style={style.container}>
            <View style={style.caseText}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {imageProfil && <Image source={{ uri: imageProfil }} style={{ width: 200, height: 200 }} />}
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Choisir une image de profil" onPress={pickImage} color='#01C38E' />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                    {image && (
                        <Button 
                            title="Sauvegarder l'image"
                            color="#01C38E"
                            onPress={setProfilImage}
                        />
                    )}
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