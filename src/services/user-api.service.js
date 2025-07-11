import useAxios from '@/hooks/useAxios';
import useApi from '../hooks/useApi';

export class UserApiService {
  constructor() {
      this.apiMethods = useApi('/users');
      this.axiosInstance = useAxios();
  }

  async getUserById(id) {
    return await this.apiMethods.getObjectById(id);
  }
}