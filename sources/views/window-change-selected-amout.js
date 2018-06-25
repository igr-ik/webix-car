import ExtendedJetView from './ExtendedJetView';

export default class WindowChangeSelectedAmount extends ExtendedJetView {
    constructor(app, name, config) {
        super(app, name);
        this.suppliers = config.suppliers;
        this.requiredAmount = config.requiredAmount;
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
                        label: 'Change order amount'
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
                selector: 'form-change',
                elements: [
                    {
                        view: 'label',
                        label: `Required amount: <b>${this.requiredAmount}</b>`
                    },
                    {
                        view: 'label',
                        selector: 'order-label'
                    },
                    {
                        view: 'fieldset',
                        selector: 'fieldset',
                        label: 'Order suppliers',
                        body: {
                            rows: this.suppliers.map(item => (
                                {
                                    view: 'counter',
                                    label: this.app.getService('suppliers').getItem(item.supplierId).name,
                                    name: item.supplierId,
                                    value: item.selectedAmount,
                                    step: 1,
                                    min: 0,
                                    labelWidth: 195,
                                    on: {
                                        onChange: () => this.updateTotalOrderAmount()
                                    }
                                }
                            ))
                        }
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
            },
            on: {
                onHide: () => this.callEvent('close')
            }
        };
    }

    show() {
        this.getRoot().show();
    }

    close() {
        this.getRoot().hide();
    }

    getForm() {
        return this.getRoot().queryView({selector: 'form-change'});
    }

    calculateTotalOrderAmount() {
        return Object.values(this.getForm().getValues()).reduce((a, b) => a + b);
    }

    updateTotalOrderAmount() {
        const totalOrderAmount = this.calculateTotalOrderAmount();
        const className = (totalOrderAmount <= this.requiredAmount) ? 'success' : 'danger';

        return this.getRoot().queryView({selector: 'order-label'})
            .setValue(`
                Order amount:
                <span class="order-amount-${className}">
                    <b>${totalOrderAmount}</b>
                </span>
            `);
    }

    onSubmit() {
        const totalOrderAmount = this.calculateTotalOrderAmount();

        if (totalOrderAmount <= this.requiredAmount) {
            const formData = this.getForm().getValues();

            const newData = Object.keys(formData).map(key => ({
                supplierId: +key,
                selectedAmount: formData[key]
            }));

            this.getForm().callEvent('submit:amount', [newData]);
            this.close();
        }
        else {
            this.app.showErrorMessage('You have more order amount than you required');
        }
    }

    init() {
        this.updateTotalOrderAmount();
    }
}
