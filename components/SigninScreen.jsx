import * as React from 'react';
import { TextInput, Button, SafeAreaView } from 'react-native';
import CustomPicker from './utils/CustomPicker';
// import PickerImage from './utils/PickerImage';
import style from '../Style';

export default function SigninScreen({ authContext }) {
    const [name, onChangeName] = React.useState('');
    const [year, onChangeYear] = React.useState('');
    const [genderTypeIndex, setGenderTypeIndex] = React.useState(0);
    const [genderType, setGenderType] = React.useState('Homme');
    const [email, onChangeEmail] = React.useState('');
    const [pass, onChangePass] = React.useState('');
    // const [image, setImage] = React.useState(null);
    // const [file, setFile] = React.useState(null);

    const genderList = [
        'Femme',
        'Homme',
    ];

    // function handleClick(e) {
    //     const formData = new FormData();
    //     formData.append('name', name);
    //     formData.append('year', year);
    //     formData.append('gender', genderType);
    //     formData.append('email', email);
    //     formData.append('password', pass);
    //     formData.append('image', file);
    //     e.preventDefault();
    //     // formData.append('image', {
    //     //     uri: image,
    //     //     filename: filename,
    //     //     type: typeImage,
    //     // });

    //     authContext.signUp({ formData });
    //     // console.log("test" + formData);
    // }


    const form = {
        "name": name,
        "year": year,
        "gender": genderType,
        "email": email,
        "password": pass,
    };

    const selectedGender = (index, item) => {
        setGenderTypeIndex(index);
        setGenderType(item);
    };

    return (
        <SafeAreaView>
            <TextInput
                style={style.input}
                onChangeText={onChangeName}
                placeholder="Pseudo"
                keyboardAppearance="dark"
                maxLength={30}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangeYear}
                placeholder="Age"
                keyboardAppearance="dark"
                maxLength={2}
            />
            <CustomPicker
                data={genderList}
                currentIndex={genderTypeIndex}
                onSelected={selectedGender}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangeEmail}
                // value={email}
                placeholder="Email"
                keyboardAppearance="dark"
                maxLength={50}
            />
            <TextInput
                style={style.input}
                onChangeText={onChangePass}
                // value={pass}
                placeholder="Mot de passe"
                keyboardAppearance="dark"
                maxLength={30}
            />
            {/* <PickerImage
                image={image}
                setImage={setImage}
                setFile={setFile}
            /> */}
            <Button
                color="#01C38E"
                title="S'inscrire !"
                onPress={() => authContext.signUp({ form })}
            />
        </SafeAreaView>
    );
};