import FetchData from '../models/fetch-data';

export default class RequiredGoods extends webix.DataCollection {
    fetchData() {
        this.waitData = new FetchData().get('requiredGoods').then((res) => {
            this.waitData = null;
            return res;
        });

        return this.waitData;
    }

    removeGood(id) {
        new FetchData().delete(`requiredGoods/${id}`);
    }
}
