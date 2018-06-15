import FetchData from '../models/fetch-data';

export default class RequiredGoods extends webix.DataCollection {
    fetchData() {
        this.waitData = new FetchData().get('requiredGoods').then((res) => {
            console.log(res);
            this.parse(JSON.stringify(res), 'json');
            return res;
        });

        return this.waitData;
    }
}
