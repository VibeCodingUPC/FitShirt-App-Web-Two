import useAxios from '@/hooks/useAxios';
import useApi from '../hooks/useApi'

export class AccountApiService {
    constructor() {
        this.apiMehods = useApi('/account');
        this.axiosInstance = useAxios();
    }

    async register(userRegisterRequest) {
        try {
            let res = await this.axiosInstance.post('/account/register', userRegisterRequest);
            return res.data;
        }
        catch (error) {
            throw error.response.data.StatusCode;
        }
    }

    async login(userLoginRequest) {
        try {
            let res = await this.axiosInstance.post(`/account/login`, userLoginRequest);
            return res.data;
        }
        catch (error) {
            throw error.response.data.StatusCode;
        }
    }
}