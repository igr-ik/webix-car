import {JetView} from 'webix-jet';

export default class ButtonsView extends JetView {
    config() {
        return {
            height: 70,
            name: this.getName(),
            cols: [
                {
                    view: 'button',
                    type: 'iconButton',
                    icon: 'plus',
                    label: 'Add',
                    css: 'bucket-btn',
                    click: () => this.callEvent('button:add')
                },
                {
                    view: 'button',
                    type: 'iconButton',
                    icon: 'search',
                    label: 'Search',
                    css: 'bucket-btn',
                    click: () => this.callEvent('button:search')
                }
            ]
        };
    }
}
