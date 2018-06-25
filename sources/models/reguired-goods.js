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

    updateGood(data) {
        return FetchData.put(`requiredGoods/${data.id}`, data)
            .then((res) => {
                const updateData = res.json();
                this.updateItem(updateData.id, updateData);
                return updateData;
            });
    }

    addGood(data) {
        return FetchData.post('requiredGoods', data)
            .then((res) => {
                const addData = res.json();
                this.add(addData);
                return addData;
            });
    }

    static getTotalRequiredAmount(good) {
        return good.suppliers.reduce((sum, curVal) => sum + curVal.selectedAmount, 0);
    }
}
