class ClassementService {
    constructor(httpClient) {
      this.httpClient = httpClient;
    }
  
    
    async getClassementUtilisateurActuel() {
      try {
        const response = await this.httpClient.get(process.env.EXPO_PUBLIC_URL_API+'classementUtilisateurActuel');
        console.log(response)
        return response.json();
      } catch (error) {
        console.error("Erreur dans getClassementUtilisateurActuel :", error);
        throw error;
      }
    }
  
    async getClassementEntiteActuel() {
      try {
        const response = await this.httpClient.get(process.env.EXPO_PUBLIC_URL_API+'classementEntiteActuel');
        return response.json();
      } catch (error) {
        console.error("Erreur dans getClassementEntiteActuel :", error);
        throw error;
      }
    }
  
    async getClassementEntiteMereActuel() {
      try {
        const response = await this.httpClient.get(process.env.EXPO_PUBLIC_URL_API+'classementEntiteMereActuel');
        return response.json();
      } catch (error) {
        console.error("Erreur dans getClassementEntiteMereActuel :", error);
        throw error;
      }
    }
  
    async getMonclassementEntiteMereActuel() {
      try {
        const response = await this.httpClient.get(process.env.EXPO_PUBLIC_URL_API+'MonclassementEntiteMereActuel');
        return response.json();
      } catch (error) {
        console.error("Erreur dans getMonclassementEntiteMereActuel :", error);
        throw error;
      }
    }
  
    async getMonclassementEntiteFilleActuel() {
      try {
        const response = await this.httpClient.get(process.env.EXPO_PUBLIC_URL_API+'MonclassementEntiteFilleActuel');
        return response.json();
      } catch (error) {
        console.error("Erreur dans getMonclassementEntiteFilleActuel :", error);
        throw error;
      }
    }
  }
  
  export default ClassementService;
  