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
                        label: 'Change selected amount'
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
                        selector: 'selected-label'
                    },
                    {
                        view: 'fieldset',
                        selector: 'fieldset',
                        label: 'Selected suppliers',
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
                                        onChange: () => this.changeSelectedAmount()
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

    setHTMLInSelectedAmountLabel() {
        this.selectedAmount = Object.values(this.getForm().getValues()).reduce((a, b) => a + b);
        const className = (this.selectedAmount <= this.requiredAmount) ? 'success' : 'danger';

        return this.getRoot().queryView({selector: 'selected-label'})
            .setValue(`
                Selected amount:
                <span class="selected-amount-${className}">
                    <b>${this.selectedAmount}</b>
                </span>
            `);
    }

    changeSelectedAmount() {
        this.setHTMLInSelectedAmountLabel();
    }

    onSubmit() {
        if (this.selectedAmount <= this.requiredAmount) {
            const formData = this.getForm().getValues();

            const newData = Object.keys(formData).map(key => ({
                supplierId: +key,
                selectedAmount: formData[key]
            }));

            this.getForm().callEvent('submit:amount', [newData]);
            this.close();
        }
        else {
            this.app.showErrorMessage('You have more selected amount than you required');
        }
    }

    init() {
        this.setHTMLInSelectedAmountLabel();
    }
}
