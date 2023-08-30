import * as React from 'react';
import { TextInput, Button, SafeAreaView, View, Image } from 'react-native';
import CustomPicker from './utils/CustomPicker';
import style from '../Style';
import * as ImagePicker from 'expo-image-picker';

export default function SigninScreen({ authContext }) {
    const [name, onChangeName] = React.useState('');
    const [year, onChangeYear] = React.useState('');
    const [genderTypeIndex, setGenderTypeIndex] = React.useState(0);
    const [genderType, setGenderType] = React.useState('Homme');
    const [email, onChangeEmail] = React.useState('');
    const [pass, onChangePass] = React.useState('');
    const [image, setImage] = React.useState(null);
    const [imageType, setImageType] = React.useState();
    const [imageFilename, setImageFilename] = React.useState();
    const form = new FormData();
    form.append('name', name);
    form.append('year', year);
    form.append('gender', genderType);
    form.append('email', email);
    form.append('password', pass);
    form.append('image', {
        uri : image,
        type: imageType,
        name: imageFilename
    });

    const selectedGender = (index, item) => {
        setGenderTypeIndex(index);
        setGenderType(item);
    };

    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            let image = result.assets[0].uri;
            let firstName = image.substring(image.lastIndexOf("/") + 1);
            let finalName = firstName.split(".")[0];
            let uriParts = image.split(".");
            let fileType = uriParts[uriParts.length - 1];
            setImage(image);
            setImageType(fileType);
            setImageFilename(finalName);
        }
    };

    return (
        <SafeAreaView>
            <TextInput
                style={style.input}
                onChangeText={onChangeName}
                selectionColor={'#01C38E'}
                placeholder="Pseudo"
                maxLength={30}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangeYear}
                placeholder="Age"
                selectionColor={'#01C38E'}
                keyboardType="number-pad"
                maxLength={2}
            />
            <CustomPicker
                data={["Homme", "Femme"]}
                currentIndex={genderTypeIndex}
                onSelected={selectedGender}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Choisir une image de profil" onPress={pickImage} color='#01C38E' />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View> 
            <TextInput
                style={style.input}
                onChangeText={onChangeEmail}
                selectionColor={'#01C38E'}
                placeholder="Email"
                keyboardType="email-address"
                maxLength={50}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangePass}
                selectionColor={'#01C38E'}
                placeholder="Mot de passe"
                secureTextEntry={true}
                maxLength={30}
            />
            <Button
                color="#01C38E"
                title="S'inscrire !"
                onPress={() => authContext.signUp( form )}
            />
        </SafeAreaView>
    );
};

