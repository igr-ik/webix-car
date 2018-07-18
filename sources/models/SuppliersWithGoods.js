import FetchData from './FetchData';

export default class SuppliersWithGoods extends webix.DataCollection {
    fetchData(goodsId) {
        FetchData.get(`goods?${goodsId.map(id => `goodId=${id}`).join('&')}`)
            .then((array) => {
                console.log('array', array);
                let suppl = array.filter(item => item.supplierId === 1);

                console.log('arrayGoods', suppl);

                console.log(this._getUniqueIdOfSuppliers(array));
            });
    }

    _getUniqueIdOfSuppliers(goods) {
        return goods
            .map(good => good.supplierId)
            .filter((id, index, goodsId) => goodsId.indexOf(id) === index);
    }
}
