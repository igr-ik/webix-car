import FetchData from '../models/fetch-data';
import goodsList from '../models/goods-list';
import suppliersList from '../models/suppliers-list';

export default class RequiredGoods extends webix.DataCollection {
    fetchData() {
        this.waitData = new FetchData().get('requiredGoods')
            .then((res) => {
                this.waitData = null;
                this.parse(this._mergeData(res));
                return res;
            });

        return this.waitData;
    }

    removeGood(id) {
        new FetchData().delete(`requiredGoods/${id}`);
    }

    _mergeData(data) {
        return goodsList.then((res) => {
            data.forEach((item) => {
                item.name = res[item.name - 1].name;
                item.image = res[item.image - 1].image;
            });

            return this._mergeSuppliers(data);
        });
    }

    _mergeSuppliers(data) {
        return suppliersList.then((res) => {
            data.forEach((item) => {
                item.suppliers.forEach((supplier) => {
                    supplier.name = res[supplier.name - 1].name;
                });
            });

            return data;
        });
    }
}
