import useAxios from '@/hooks/useAxios';
import useApi from '../hooks/useApi'

export class MessagesApiService {
    constructor() {
        this.apiMethods = useApi('/messages');
        this.axiosInstance = useAxios();
    }

    async getConversation(userId, contactId) {
        return await this.axiosInstance
            .get(`messages/conversation?userId=${userId}&contactId=${contactId}`)
            .then(res => res.data);
    }

    async sendMessage(content, senderId, receiverId) {
        return await this.axiosInstance
            .post(`messages?content=${encodeURIComponent(content)}&senderId=${senderId}&receiverId=${receiverId}`)
            .then(res => res.data);
    }

    async deleteMessage(id) {
        return await this.apiMethods.deleteObjectById(id);
    }

    async updateMessage(id, newContent) {
        return await this.axiosInstance
            .put(`messages/${id}?newContent=${encodeURIComponent(newContent)}`)
            .then(res => res.data);
    }
}
