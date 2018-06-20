import FetchData from '../models/fetch-data';

export default class RequiredGoods extends webix.DataCollection {
    fetchData() {
        this.waitData = new FetchData().get('requiredGoods')
            .then((res) => {
                this.waitData = null;
                this.parse(res);
                return res;
            });

        return this.waitData;
    }

    removeGood(id) {
        return new FetchData().delete(`requiredGoods/${id}`);
    }

    updateGood(id, data) {
        return new FetchData().put(`requiredGoods/${id}`, data);
    }
}
