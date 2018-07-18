import './styles/app.css';
import {JetApp, EmptyRouter, HashRouter} from 'webix-jet';

import SuppliersCollection from './models/SuppliersCollection';
import GoodsCollection from './models/GoodsCollection';


export default class MyApp extends JetApp {
    constructor(config) {
        const defaults = {
            id: APPNAME,
            version: VERSION,
            router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
            debug: !PRODUCTION,
            start: '/top/start'
        };

        super({...defaults, ...config});

        this.setService('suppliers', new SuppliersCollection());
        this.getService('suppliers').fetchData();

        this.setService('goodsCollection', new GoodsCollection());
        this.getService('goodsCollection').fetchData();
    }

    showErrorMessage(text) {
        webix.message({
            text,
            type: 'error'
        });
    }
}

if (!BUILD_AS_MODULE) {
    webix.ready(() => new MyApp().render());
}
