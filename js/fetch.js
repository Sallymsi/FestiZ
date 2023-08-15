const urlAddParty = 'http://192.168.0.28:8080/api/post/set-party/';
const urlAddUser = 'http://192.168.0.28:8080/api/auth/signup/';
const urlLogUser = 'http://192.168.0.28:8080/api/auth/login/';

import * as SecureStore from 'expo-secure-store';

// Requête POST pour les posts (party):
export async function addParty(options, navigation) {
    // console.log('OK 2');
    fetch(urlAddParty, options)
        .then(resp => resp.json())

        .then(() => {
            console.log("Soirée ajouté à la BDD !");
        })

        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        })
};

export async function signin(options, navigation) {
    fetch(urlAddUser, options)
        .then(resp => resp.json())

        .then(() => {
            console.log("User ajouté à la BDD !");
        })

        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        })
};

export function login(options, navigation) {
    fetch(urlLogUser, options)
        .then(resp => resp.json())

        .then((data) => {
            console.log(data);
            if (data.token) {
                SecureStore.setItemAsync('token', data.token)
                    .then(response => console.log(response))
                    .catch(err => console.log(err));
            }
            navigation.navigate('Home');
            alert('Connected !');
        })

        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        })
};