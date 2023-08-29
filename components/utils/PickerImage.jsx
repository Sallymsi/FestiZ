import React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PickerImage({ image, setImage, userId, data}) {

    const pickImage = async () => {
        
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            // base64: true,
        });

        console.log(result.assets[0].uri);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            data.append('userId', userId);
            data.append('fileData', {
                'uri': result.assets[0].uri,
                'type': result.assets[0].type,
                'name': result.assets[0].fileName
            });
            console.log(data);
        }
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Choisir une image de profil" onPress={pickImage} color='#01C38E' />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}