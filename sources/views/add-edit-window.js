import {JetView} from 'webix-jet';

import goodsList from '../models/goods-list';

export default class AddEditGoodWindow extends JetView {
    config() {
        return {
            view: 'window',
            modal: true,
            position: 'center',
            width: 350,
            head: {
                view: 'toolbar',
                cols: [
                    {
                        view: 'label',
                        label: 'Edit'
                    },
                    {
                        view: 'button',
                        title: 'ADASDAS',
                        type: 'icon',
                        icon: 'times',
                        width: 30,
                        align: 'right',
                        click: () => this.close()
                    }
                ]
            },
            body: {
                view: 'form',
                elements: [
                    {
                        view: 'select',
                        label: 'Name',
                        options: ['Master', 'Release']
                    },
                    {
                        view: 'counter',
                        label: 'Amount',
                        step: 1,
                        value: 33,
                        min: 21,
                        max: 100
                    },
                    {
                        cols: [
                            {
                                view: 'button',
                                value: 'Ok',
                                type: 'form'
                            },
                            {
                                view: 'button',
                                value: 'Cancel',
                                click: () => this.close()
                            }
                        ]
                    }
                ]
            }
        };
    }

    show() {
        this.getRoot().show();
    }

    close() {
        this.getRoot().hide();
    }
}
