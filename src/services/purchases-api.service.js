import useApi from '../hooks/useApi'

export class PurchasesApiService {
    constructor() {
        this.apiMehods = useApi('/purchases');
    }

    async postPurchase(purchase){
        return await this.apiMehods.postObject(purchase);
    }
}