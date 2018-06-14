import {JetView} from 'webix-jet';

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
                    css: 'bucket-add-btn'
                },
                {
                    view: 'button',
                    value: 'Search',
                    css: 'bucket-search-btn'
                }
            ]
        };
    }
}
