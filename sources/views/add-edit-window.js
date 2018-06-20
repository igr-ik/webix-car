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
                elements: [
                    {
                        view: 'richselect',
                        selector: 'richselect',
                        label: 'Name',
                        options: {
                            data: this.app.getService('goods'),
                            body: {
                                template: '#name#'
                            }
                        }
                    },
                    {
                        view: 'counter',
                        selector: 'amount',
                        label: 'Amount',
                        name: 'amount',
                        step: 1,
                        value: 33,
                        min: 1,
                        max: 100
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
                ]
            }
        };
    }

    setHeaderTitle(text) {
        this.getRoot().queryView({selector: 'head-title'}).setValue(text);
    }

    show() {
        this.getRoot().show();
    }

    close() {
        this.getRoot().hide();
    }

    getView(view) {
        return this.getRoot().queryView({selector: view});
    }

    setRichselectValue(value) {
        this.getView('richselect').setValue(value);
    }

    onSubmit() {
        this.getParentView().onSubmit({
            goodId: this.getView('richselect').getValue(),
            amount: this.getView('amount').getValue(),
            suppliers: [
                {
                    supplierId: 6,
                    requiredAmount: 4
                }
            ]
        });

        this.close();
    }
}
