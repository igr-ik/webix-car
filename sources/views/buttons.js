import {JetView} from 'webix-jet';

import AddEditGoodWindow from './add-edit-window';

export default class ButtonsView extends JetView {
    config() {
        return {
            height: 70,
            cols: [
                {
                    view: 'button',
                    type: 'iconButton',
                    icon: 'plus',
                    label: 'Add',
                    css: 'bucket-btn',
                    click: () => this.showAddWindow()
                },
                {
                    view: 'button',
                    type: 'iconButton',
                    icon: 'search',
                    label: 'Search',
                    css: 'bucket-btn'
                }
            ]
        };
    }

    showAddWindow() {
        this.windowAdd.showForAdd();
    }

    addGood(data) {
        this.app.callEvent('window:add:submit', [data]);
    }

    init() {
        this.windowAdd = this.ui(new AddEditGoodWindow(this.app, '', {
            submitHandler: this.addGood.bind(this)
        }));
    }
}
