import useApi from "@/hooks/useApi.js";
import useAxios from "@/hooks/useAxios.js"

export class BusinessmansApiService {
    constructor() {
        this.apiMethods = useApi('/users/sellers');
        this.axiosInstance = useAxios();
    }

    async getAllBusinessmansApiService() {
        return await this.apiMethods.getObjects();
    }

    async getBusinessmansByIdApiService(id) {
        return await this.apiMethods.getObjectById(id)
    }
    async getPostByUserId2(id){
        return await this.axiosInstance
            .get(`posts/search-by-user?userId=${id}`)

    }
}