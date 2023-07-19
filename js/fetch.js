const url = 'http://192.168.0.28:8080/api/post/post/';

// Requête POST pour les posts (party):
export async function addParty(options, navigation) {
    // console.log('OK 2');
    fetch(url, options)
        .then(resp => resp.json())

        .then(() => {
            console.log("Soirée ajouté à la BDD !");
        })

    // .catch(function (error) {
    //     console.log('There has been a problem with your fetch operation: ' + error.message);
    //     throw error;
    // })
};