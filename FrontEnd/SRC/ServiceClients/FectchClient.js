import * as SecureStore from 'expo-secure-store';

const FetchClient = {
    async get(url){
        return await fetch(url,{
            headers:{
                'Content-Type':'application/json',
                't_USER_STEPBYMIAGE': SecureStore.getItem('token')
            }
        });
    },

    async postFichier(url, body){
        return await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'form-data',
            },
            body: JSON.stringify(body)
        });
    },

    async postConnexion(url, body){
        return await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(body)
        });
    },

    async post(url, body){
        return await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                't_USER_STEPBYMIAGE': SecureStore.getItem('token')
            },
            body: JSON.stringify(body)
        });
    }
}

export default FetchClient