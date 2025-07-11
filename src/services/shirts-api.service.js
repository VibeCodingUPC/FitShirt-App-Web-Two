import useAxios from '@/hooks/useAxios';
import useApi from '../hooks/useApi'

export class ShirtsApiService {
  constructor() {
    this.apiMehods = useApi('/posts');
    this.axiosInstance = useAxios();
  }

  async getShirts() {
    return await this.apiMehods.getObjects();
  }

  async getShirtById(id) {
    return await this.apiMehods.getObjectById(id);
  }

  async getShirtsByCategoryAndColor(categoryId, colorId) {
    let path;

    if (categoryId!=null && colorId!=null) {
      path=`/posts/filter-shirts?categoryId=${categoryId}&colorId=${colorId}`;
    }
    else if (categoryId!=null) {
      path=`/posts/filter-shirts?categoryId=${categoryId}`;
    }
    else if (colorId!=null) {
      path=`/posts/filter-shirts?colorId=${colorId}`;
    }
    else {
      path=`/posts/filter-shirts`;
    }

    return await this.axiosInstance
        .get(path)
        .then(res => res.data);
  }

}