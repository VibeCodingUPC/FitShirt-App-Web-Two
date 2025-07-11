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
            .get(`posts/SearchByUser?userId=${userId}`)
            .then(res => res.data);
    }

    async publishPost(post){
        return await this.apiMehods.postObject(post);
    }

    async editPost(post){
        return await this.apiMehods.putObject(post.id, post);
    }

    async deletePost(id){
        return await this.apiMehods.deleteObjectById(id);
    }

}