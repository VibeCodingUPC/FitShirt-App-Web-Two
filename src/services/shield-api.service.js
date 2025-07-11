import useApi from '../hooks/useApi'

export class ShieldApiService{
    constructor() {
        this.apiMehods = useApi('/shields');
    }

    async getShield() {
        return await this.apiMehods.getObjects();
    }
}