import useAxios from '@/hooks/useAxios';
import useApi from '../hooks/useApi'

export class PostsApiService {
    constructor() {
        this.apiMehods = useApi('/posts');
        this.axiosInstance = useAxios();
    }

    async getPosts() {
        return await this.apiMehods.getObjects();
    }

    async getPostById(id) {
        return await this.apiMehods.getObjectById(id);
    }

    async getPostByUserId(userId) {
        return await this.axiosInstance
            .get(`posts/search-by-user?userId=${userId}`)
            .then(res => res.data);
    }

    async filterPosts(categoryId, colorId) {
        const params = {};

        // Agregar parámetros solo si están definidos
        if (categoryId) params.categoryId = categoryId;
        if (colorId) params.colorId = colorId;

        try {
            const response = await this.axiosInstance.get('posts/filter-posts', { params });
            return response.data;
        } catch (error) {
            console.error("Error al obtener las camisetas filtradas:", error);
            throw new Error("Error fetching filtered posts");
        }
    }

    async publishPost(post){
        return await this.apiMehods.postObject(post);
    }

    async editPost(id, post){
        return await this.apiMehods.putObject(id, post);
    }

    async deletePost(id){
        return await this.apiMehods.deleteObjectById(id);
    }

}