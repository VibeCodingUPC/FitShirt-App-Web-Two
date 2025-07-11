import useApi from '../hooks/useApi'

export class SizeApiService{
    constructor() {
        this.apiMehods = useApi('/sizes');
    }

    async getSizes() {
        return await this.apiMehods.getObjects();
    }
}