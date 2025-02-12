class UtilisateurService {

    constructor(httpClient){
        this.httpClient = httpClient;
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

    async finaliserInscription(body){
        try{
            const response = await this.httpClient.postFichier(process.env.EXPO_PUBLIC_URL_API+'finaliserInscription', body)
            return response.json()
        } catch(error){
            console.log("Erreur service : "+ error)
            throw error
        }
    }

    async GetAllUtilisateur(){
        
        try{
            const response = await this.httpClient.get(process.env.EXPO_PUBLIC_URL_API+'getAllUtilisateurs')
            return response.json()
        } catch(error){
            console.log("Erreur service : "+ error)
            throw error
        }
    }

    async GetCompteUtilisateur(params){
        try{
            const response = await this.httpClient.get(process.env.EXPO_PUBLIC_URL_API+'compteUtilisateur/'+params)
            return response.json()
        } catch(error){
            console.log("Erreur service : "+ error)
            throw error
        }
    }
}

export default UtilisateurService