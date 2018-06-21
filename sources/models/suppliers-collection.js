import FetchData from './fetch-data';

export default class SuppliersCollection extends webix.DataCollection {
    fetchData() {
        this.waitData = FetchData.get('suppliers')
            .then((res) => {
                this.waitData = null;
                this.parse(res);
                return res;
            });

        return this.waitData;
    }
}
