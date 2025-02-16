class EntiteService {

    constructor(httpClient){
        this.httpClient = httpClient;
    }

    async GetAllEntiteFille(){
        try{
            const response = await this.httpClient.get(process.env.EXPO_PUBLIC_URL_API+'getAllEntiteFilles')
            return response.json()
        } catch(error){
            console.log("Erreur service : "+ error)
            throw error
        }
    }
}

export default EntiteService