import AddEditGoodWindow from './add-edit-window';
import ButtonsView from './buttons';
import RequiredGoods from '../models/ReguiredGoods';
import ExtendedJetView from './ExtendedJetView';

export default class ListView extends ExtendedJetView {
    constructor(app, name, config) {
        super(app, name);
        this.requiredGoodsCollection = config.requiredGoodsCollection;
        this.requiredGoodsCollection.fetchData();
    }

    config() {
        return {
            rows: [
                {
                    view: 'list',
                    data: this.requiredGoodsCollection,
                    type: {
                        height: 'auto',
                        classname: (obj, common, marks) => {
                            let nativeClassName = webix.ui.list.prototype.type.classname
                                .call(this, obj, common, marks);

                            return `${nativeClassName} webix_list_item_bucket`;
                        },
                        template: (good) => {
                            const {goodId, requiredAmount, suppliers} = good;

                            let suppliersList = suppliers
                                .map(item => this.app.getService('suppliers')
                                    .getItem(item.supplierId).name)
                                .join(', ');

                            let selectedAmount = RequiredGoods.getTotalRequiredAmount(good);
                            let goodItem = this.app.getService('goodsCollection')
                                .getItem(goodId);

                            return `
                                <div class="webix_list_item_images">
                                    <img src="${goodItem.image}" alt="${goodItem.name}">
                                </div>
                                <div class="webix_list_item_content">
                                    <div class="webix_list_item_title">${goodItem.name}</div>
                                    <div class="webix_list_item_quantity">${selectedAmount} of ${requiredAmount}</div>
                                    <div class="webix_list_item_suppliers">Suppliers: ${suppliersList}</div>
                                </div>
                                <div class="webix_list_item_btnset">
                                    <div class="edit webix_list_item_btn"><span class="webix_icon fa-pencil"></span></div>
                                    <div class="remove webix_list_item_btn"><span class="webix_icon fa-trash"></span></div>
                                </div>
                            `;
                        }
                    },
                    onClick: {
                        edit: this.showEditWindow.bind(this),
                        remove: this.removeHandler.bind(this)
                    }
                },
                new ButtonsView(this.app, 'button_view')
            ]
        };
    }

    getButtonsView() {
        return this.getRoot()
            .queryView({name: 'button_view'}).$scope;
    }

    getWindowForm() {
        return this.windowEdit.getForm();
    }

    showEditWindow(e, id) {
        this.windowEdit.showFor(this.requiredGoodsCollection.getItem(id));

        const submitGoodListener = this.on(this.getWindowForm(), 'submit:good', (data) => {
            this.editGood(data);
        });

        this.once(this.windowEdit, 'close', () => {
            this.off(submitGoodListener);
        });
    }

    showAddWindow() {
        this.windowEdit.showFor();

        const submitGoodListener = this.on(this.getWindowForm(), 'submit:good', (data) => {
            if (this.getWindowForm().validate()) {
                this.addGood(data);
            }
            else {
                this.app.showErrorMessage('Form data is invalid');
            }
        });

        this.once(this.windowEdit, 'close', () => {
            this.off(submitGoodListener);
        });
    }

    removeHandler(e, id) {
        webix.confirm({
            title: 'Delete',
            type: 'confirm-warning',
            text: 'Are you sure you want to delete this part?',
            callback: (result) => {
                if (result) {
                    this.requiredGoodsCollection.removeGood(id)
                        .fail(() => this.app.showErrorMessage('Uninstall error'));
                }
            }
        });
    }

    editGood(data) {
        this.requiredGoodsCollection.updateGood(data)
            .then(() => this.windowEdit.close())
            .fail(() => this.app.showErrorMessage('Error editing'));
    }

    addGood(data) {
        this.requiredGoodsCollection.addGood(data)
            .then(() => this.windowEdit.close())
            .fail(() => this.app.showErrorMessage('Error additing'));
    }

    init() {
        this.windowEdit = this.ui(AddEditGoodWindow);
    }

    ready() {
        this.on(this.getButtonsView(), 'button:add', this.showAddWindow.bind(this));
    }
}
