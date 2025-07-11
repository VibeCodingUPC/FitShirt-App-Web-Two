import useAxios from '@/hooks/useAxios';
import useApi from '../hooks/useApi'
import { jwtDecode } from 'jwt-decode';
import { environment } from '@/environments/environment';

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
            const token = res.data;

            sessionStorage.setItem('jwt', token);

            const decodedToken = jwtDecode(token);

            return decodedToken;
        } catch (error) {
            throw error.response.data.StatusCode;
        }
    }

    getUserIdFromToken() {
        const token = sessionStorage.getItem('jwt');
        if (!token) return environment.userId;

        const decodedToken = jwtDecode(token);
        return parseInt(decodedToken.sid);
    }
}