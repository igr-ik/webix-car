import {JetView} from 'webix-jet';

export default class AddEditGoodWindow extends JetView {
    constructor(app, name, config) {
        super(app, name);

        this.submitHandler = config.submitHandler;
    }

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
                        value: 0,
                        min: 0
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
        this.getHeaderTitle().setValue(text);
    }

    showForEdit(good) {
        let {goodId, amount, suppliers} = good;
        this.setHeaderTitle('Edit good');
        this.setRichselectValue(goodId);
        this.setAmountValue(amount);
        this.goodSuppliers = suppliers;
        this.getRoot().show();
    }

    showForAdd() {
        this.setHeaderTitle('Add good');
        this.setRichselectValue(1);
        this.setAmountValue(0);
        this.goodSuppliers = [];
        this.getRoot().show();
    }

    close() {
        this.getRoot().hide();
    }

    getHeaderTitle() {
        return this.getRoot().queryView({selector: 'head-title'});
    }

    getRichselectView() {
        return this.getRoot().queryView({selector: 'richselect'});
    }

    getAmountView() {
        return this.getRoot().queryView({selector: 'amount'});
    }

    setRichselectValue(value) {
        this.getRichselectView().setValue(value);
    }

    setAmountValue(value) {
        this.getAmountView().setValue(value);
    }

    getRichselectValue() {
        return this.getRichselectView().getValue();
    }

    getAmountValue() {
        return this.getAmountView().getValue();
    }

    onSubmit() {
        let data = {
            goodId: this.getRichselectValue(),
            amount: this.getAmountValue(),
            suppliers: this.goodSuppliers
        };

        this.submitHandler(data);
        this.close();
    }
}
