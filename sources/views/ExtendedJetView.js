import {JetView} from 'webix-jet/dist/index';

export default class ExtendedJetView extends JetView {
    constructor(app, name, config) {
        super(app, name, config);
        webix.extend(this, webix.EventSystem);
    }

    off(id) {
        const i = this._events.findIndex(event => event.id === id);
        if (i !== -1) {
            const eventData = this._events[i];
            eventData.obj.detachEvent(id);
            this._events.splice(i, 1);
        }
        return this;
    }

    once(obj, name, code) {
        let id;
        let self = this;
        function wrappedCode(...args) {
            code.call(this, ...args);
            self.off(id);
        }
        id = this.on(obj, name, wrappedCode);
        return id;
    }

    getName() {
        return this._name;
    }
}