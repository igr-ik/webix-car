import {JetView} from 'webix-jet';

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
                        selector: 'head-title'
                    },
                    {
                        view: 'button',
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
                selector: 'form',
                elements: [
                    {
                        view: 'richselect',
                        label: 'Name',
                        name: 'goodId',
                        options: {
                            data: this.app.getService('goods'),
                            body: {
                                template: '#name#'
                            }
                        }
                    },
                    {
                        view: 'counter',
                        label: 'Amount',
                        name: 'amount',
                        step: 1,
                        min: 0
                    },
                    {
                        view: 'text',
                        hidden: true,
                        name: 'id'
                    },
                    {
                        view: 'text',
                        hidden: true,
                        name: 'suppliers'
                    },
                    {
                        cols: [
                            {
                                view: 'button',
                                value: 'Ok',
                                type: 'form',
                                click: () => this.onSubmit()
                            },
                            {
                                view: 'button',
                                value: 'Cancel',
                                click: () => this.close()
                            }
                        ]
                    }
                ],
                rules: {
                    goodId: webix.rules.isNotEmpty
                }
            },
            on: {
                onHide: () => this.callEvent('close')
            }
        };
    }

    setHeaderTitle(text) {
        this.getHeader().setValue(text);
    }

    showFor(good) {
        this.getForm().setValues(good || {
            id: undefined,
            amount: 0,
            suppliers: []
        });

        this.setHeaderTitle(good ? 'Edit good' : 'Add good');
        this.getRoot().show();
    }

    close() {
        this.getRoot().hide();
    }

    getHeader() {
        return this.getRoot().queryView({selector: 'head-title'});
    }

    getForm() {
        return this.getRoot().queryView({selector: 'form'});
    }

    onSubmit() {
        this.getForm().callEvent('submit:good', [this.getForm().getValues()]);
    }
}
