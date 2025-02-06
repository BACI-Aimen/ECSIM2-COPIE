import Config from 'react-native-config'


class UtilisateurService {

    constructor(httpClient){
        this.httpClient = httpClient
    }

    async connexionUtilisateur(body){
        
        try{
            const response = await this.httpClient.postConnexion(process.env.EXPO_PUBLIC_URL_API+'login', body)
            return response.json()
        } catch(error){
            console.log("Erreur service : "+ error)
            throw error
        }
    }
}

export default UtilisateurService