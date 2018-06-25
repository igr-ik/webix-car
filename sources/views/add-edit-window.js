import RequiredGoods from '../models/reguired-goods';
import WindowChangeSelectedAmount from './window-change-selected-amout';
import ExtendedJetView from './ExtendedJetView';

export default class AddEditGoodWindow extends ExtendedJetView {
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
                        name: 'requiredAmount',
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
            requiredAmount: 0,
            suppliers: []
        });

        this.setHeaderTitle(good ? 'Edit good' : 'Add good');
        this.getRoot().show();
        this.currentGoodId = good.goodId;
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

    showWindowChangeAmount(onFinish) {
        const windowChangeAmount = this.ui(new WindowChangeSelectedAmount(this.app, '', {
            suppliers: this.formValue.suppliers,
            requiredAmount: this.formValue.requiredAmount
        }));

        windowChangeAmount.show();

        const submitAmountListener = this.on(windowChangeAmount.getForm(), 'submit:amount', (data) => {
            this.setSuppliers(data);
            onFinish();
        });

        this.once(windowChangeAmount, 'close', () => {
            this.off(submitAmountListener);
        });
    }

    setSuppliers(suppliers) {
        this.formValue.suppliers = suppliers;
        this.getForm().setValues(this.formValue);
    }

    onSubmit() {
        new Promise((resolve) => {
            this.formValue = this.getForm().getValues();

            if (this.formValue.goodId !== this.currentGoodId) {
                this.setSuppliers([]);
                resolve();
            }
            else {
                let totalOrderedGoods = RequiredGoods.getTotalRequiredAmount(this.formValue);

                if (totalOrderedGoods > this.formValue.requiredAmount) {
                    this.showWindowChangeAmount(resolve);
                }
                else {
                    resolve();
                }
            }
        }).then(() => {
            this.getForm().callEvent('submit:good', [this.formValue]);
        });
    }
}
