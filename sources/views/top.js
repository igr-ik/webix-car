import {JetView} from 'webix-jet';

import ListView from './list';
import SearchResultView from './search-result/search-result';
import RequiredGoods from '../models/reguired-goods';

export default class TopView extends JetView {
    constructor(app, name, config) {
        super(app, name, config);
        this.collection = new RequiredGoods();
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
                                collection: this.collection
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
                                collection: this.collection
                            }
                        )
                    ]
                }
            ]
        };
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
