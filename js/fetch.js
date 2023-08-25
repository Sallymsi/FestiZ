const urlAddParty = 'http://192.168.0.28:8080/api/post/set-party/';
const urlAddUser = 'http://192.168.0.28:8080/api/auth/signup/';
const urlLogUser = 'http://192.168.0.28:8080/api/auth/login/';
const urlProfilUser = 'http://192.168.0.28:8080/api/auth/profil/';

import * as SecureStore from 'expo-secure-store';

// Requête POST pour les posts (party):
export async function addParty(options) {
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

export async function signup(options) {
    return fetch(urlAddUser, options)
        .then(resp => resp.json())

        .then(async (data) => {
            if (data) {
                await SecureStore.setItemAsync('userToken', JSON.stringify(data.token));
                await SecureStore.setItemAsync('userId', JSON.stringify(data.userId));
                console.log("User ajouté à la BDD !");
                return data;
            } else {
                console.log('Echec Fetching....')
            }
        })

        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        })
};

export async function login(options) {
    return fetch(urlLogUser, options)
        .then(resp => resp.json())

        .then(async (data) => {
            if (data.token) {
                await SecureStore.setItemAsync('userToken', JSON.stringify(data.token));
                await SecureStore.setItemAsync('userId', JSON.stringify(data.userId));
                console.log("User connecté !");
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