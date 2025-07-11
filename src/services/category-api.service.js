import useApi from '../hooks/useApi'

export class CategoryApiService {
  constructor() {
    this.apiMehods = useApi('/categories');
  }

  async getCategories() {
    return await this.apiMehods.getObjects();
  }

}
