import useApi from "@/hooks/useApi.js";

export class BusinessmansApiService {
    constructor() {
        this.apiMethods = useApi('/users/sellers');
    }

    async getAllBusinessmansApiService() {
        return await this.apiMethods.getObjects();
    }
}