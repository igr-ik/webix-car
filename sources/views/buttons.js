import {JetView} from 'webix-jet';

export default class ButtonsView extends JetView {
    config() {
        return {
            id: 'bucket-toolbar',
            height: 70,
            cols: [
                {
                    container: 'bucket-toolbar',
                    id: 'bucket-button',
                    view: 'button',
                    type: 'iconButton',
                    icon: 'plus',
                    label: 'Add',
                    css: 'bucket-add-btn'
                },
                {
                    container: 'bucket-toolbar',
                    id: 'bucket-search',
                    view: 'search',
                    placeholder: 'Search..',
                    css: 'bucket-search'
                }
            ]
        };
    }
}
