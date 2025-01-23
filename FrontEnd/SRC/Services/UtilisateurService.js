import Config from 'react-native-config'


class UtilisateurService {

    constructor(httpClient){
        this.httpClient = httpClient
    }

    async getUtilisateur(){
        try{
            const response = await this.httpClient.get('https://jsonplaceholder.typicode.com/todos')
            return response.json()
        } catch(error){
            console.error(error)
            throw error
        }
    }

    async createUtilisateur(todo){
        try{
            const response = await this.httpClient.post('https://jsonplaceholder.typicode.com/todos', todo)
            return response.json()
        } catch(error){
            console.error(error)
            throw error
        }
    }

    async connexionUtilisateur(body){
        try{
            const response = await this.httpClient.post(process.env.EXPO_PUBLIC_URL_API+'/loginUser', body)
            return response.json()
        } catch(error){
            console.log("Erreur service : "+ error)
            throw error
        }
    }
}

export default UtilisateurService