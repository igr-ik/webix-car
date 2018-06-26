import {JetView} from 'webix-jet';
import SupplierView from './views/supplier';

export default class SearchResulstView extends JetView {
    constructor(app, name, config) {
        super(app, name, config);

        this.collection = config.collection;
        this.collection.fetchData();
    }

    config() {
        return {
            view: 'scrollview',
            body: {
                type: 'space',
                rows: [
                    SupplierView,
                    SupplierView,
                    SupplierView,
                    SupplierView,
                    SupplierView,
                    SupplierView,
                    SupplierView,
                    SupplierView,
                    SupplierView
                ]
            }
        };
    }
}
