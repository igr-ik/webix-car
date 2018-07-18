import {JetView} from 'webix-jet';

import ListView from './list';
import SearchResultView from './search-result/search-result';
import RequiredGoods from '../models/ReguiredGoods';
import SuppliersWithGoods from '../models/SuppliersWithGoods';

export default class TopView extends JetView {
    constructor(app, name, config) {
        super(app, name, config);
        this.requiredGoodsCollection = new RequiredGoods();
        this.suppliersWithGoodsCollection = new SuppliersWithGoods();
    }

    config() {
        return {
            id: 'layout',
            cols: [
                {
                    minWidth: 400,
                    maxWidth: 600,
                    rows: [
                        new ListView(
                            this.app,
                            '',
                            {
                                requiredGoodsCollection: this.requiredGoodsCollection
                            }
                        )
                    ]
                },
                {
                    view: 'resizer'
                },
                {
                    rows: [
                        new SearchResultView(
                            this.app,
                            '',
                            {
                                collection: this.requiredGoodsCollection
                            }
                        )
                    ]
                }
            ]
        };
    }

    init() {
        setTimeout(() => {
            let goodsId = this.requiredGoodsCollection.getIdOrderedGoods();

            this.suppliersWithGoodsCollection.fetchData(goodsId);
        }, 3000);

        // setTimeout(() => {
        //     let rez = this.suppliersWithGoodsCollection.serialize();
        //     console.log(rez);
        // }, 3000);
    }


    // init() {
    //     this.on(this.getSearchView(), 'changeOrderedAmount', (supplierId, goodId, newAmount) => {
    //         const targetRequiredGood = this.collection.find({goodId: goodId});
    //         const relatedSupplier = targetRequiredGood.suppliers.find({supplierId: supplierId});
    //         relatedSupplier.amount = newAmount;
    //
    //         this.collection.updateGood(targetRequiredGood);
    //     });
    // }
}
