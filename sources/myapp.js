import './styles/app.css';
import {JetApp, EmptyRouter, HashRouter, JetView} from 'webix-jet';

import SuppliersCollection from './models/suppliers-collection';
import GoodsCollection from './models/goods-collection';

webix.extend(JetView.prototype, webix.EventSystem);
JetView.prototype.off = function off(id) {
    const i = this._events.findIndex(event => event.id === id);
    if (i !== -1) {
        const eventData = this._events[i];
        eventData.obj.detachEvent(id);
        this._events.splice(i, 1);
    }
    return this;
};

JetView.prototype.once = function once(obj, name, code) {
    let id;
    let self = this;
    function wrappedCode(...args) {
        code.call(this, ...args);
        self.off(id);
    }
    id = this.on(obj, name, wrappedCode);
    return id;
};


JetView.prototype.getName = function getName() {
    return this._name;
};


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

        this.setService('goods', new GoodsCollection());
        this.getService('goods').fetchData();
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
