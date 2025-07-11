import useAxios from '@/hooks/useAxios';
import useApi from '../hooks/useApi'

export class DesignsApiService {
    constructor() {
        this.apiMehods = useApi('/designs');
        this.axiosInstance = useAxios();
    }

    async getDesign() {
        return await this.apiMehods.getObjects();
    }

    async getDesignbyid(id) {
        return await this.apiMehods.getObjectById(id);
    }

    async getDesignsByUserId(userId) {
        return await this.axiosInstance
            .get(`/designs/search-by-user?userId=${userId}`)
            .then(res => res.data);
    }

    async creatingDesign(design) {
        return await this.apiMehods.postObject(design);
    }

    async editDesign(design) {
        return await this.apiMehods.putObject(design.id,design);
    }

    async deleteDesign(id) {
        return await this.apiMehods.deleteObjectById(id);
    }

}