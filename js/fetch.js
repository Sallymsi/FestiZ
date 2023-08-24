const urlAddParty = 'http://localhost:8080/api/post/set-party/';
const urlAddUser = 'http://localhost:8080/api/auth/signup/';
const urlLogUser = 'http://localhost:8080/api/auth/login/';
const urlProfilUser = 'http://localhost:8080/api/auth/profil/';

import * as SecureStore from 'expo-secure-store';

// Requête POST pour les posts (party):
export async function addParty(options, navigation) {
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

export async function login(options) {
    return fetch(urlLogUser, options)
        .then(resp => resp.json())

        .then( async (data) => {
            console.log(data);
            if (data.token) {
                await SecureStore.setItemAsync('userToken', JSON.stringify(data.token));
                await SecureStore.setItemAsync('userId', JSON.stringify(data.userId));
                console.log('UserID (signIn) : ' + data.userId);
                console.log('UserToken (signIn) : ' + data.userToken);
            }
            return data;
        })

        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        })
};

export async function getProfil(userId) {
    return fetch(urlProfilUser + userId)
        .then(resp => resp.json())

        .then((data) => {
            return data;
        })

        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        })
};