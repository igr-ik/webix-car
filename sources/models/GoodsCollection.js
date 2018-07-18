import FetchData from './FetchData';

export default class GoodsCollection extends webix.DataCollection {
    fetchData() {
        this.waitData = FetchData.get('goodsCollection')
            .then((res) => {
                this.waitData = null;
                this.parse(res);
                return res;
            });

        return this.waitData;
    }
}
