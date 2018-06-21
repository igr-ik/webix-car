import FetchData from '../models/fetch-data';

export default class RequiredGoods extends webix.DataCollection {
    fetchData() {
        this.waitData = FetchData.get('requiredGoods')
            .then((res) => {
                this.waitData = null;
                this.parse(res);
                return res;
            });

        return this.waitData;
    }

    removeGood(id) {
        return FetchData.delete(`requiredGoods/${id}`)
            .then(() => this.remove(id));
    }

    updateGood(id, data) {
        return FetchData.put(`requiredGoods/${id}`, data)
            .then((res) => {
                this.updateItem(id, data);
                return res.json();
            });
    }

    addGood(data) {
        return FetchData.post('requiredGoods', data)
            .then((res) => {
                this.add(data);
                return res.json();
            });
    }
}
