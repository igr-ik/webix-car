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
                    click: () => this.addHandler()
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

    addHandler() {
        this.windowAdd.setHeaderTitle('Add good');
        this.windowAdd.setRichselectValue(1);
        this.windowAdd.show();
    }

    onSubmit(data) {
        console.log(this.getParentView().getRoot() );
        console.log(this.getParentView().getRoot().getChildViews() );

        // this.getParentView().addGood(data);
    }

    init() {
        this.windowAdd = this.ui(AddEditGoodWindow);
    }
}
