import {JetView} from 'webix-jet';

import AddEditGoodWindow from './add-edit-window';

export default class ListView extends JetView {
    constructor(app, name, config) {
        super(app, name);
        this.collection = config.collection;
        this.collection.fetchData();
    }

    config() {
        return {
            id: 'bucket',
            view: 'list',
            data: this.collection,
            type: {
                height: 'auto',
                classname: (obj, common, marks) => {
                    let nativeClassName = webix.ui.list.prototype.type.classname
                        .call(this, obj, common, marks);

                    return `${nativeClassName} webix_list_item_bucket`;
                },
                template: ({goodId, amount, suppliers}) => {
                    let suppliersList = suppliers
                        .map(item => this.app.getService('suppliers').getItem(item.supplierId).name)
                        .join(', ');

                    let requiredAmount = suppliers
                        .reduce((sum, curVal) => sum + curVal.requiredAmount, 0);

                    let good = this.app.getService('goods').getItem(goodId);

                    return `
                        <div class="webix_list_item_images">
                            <img src="${good.image}" alt="${good.name}">
                        </div>
                        <div class="webix_list_item_content">
                            <div class="webix_list_item_title">${good.name}</div>
                            <div class="webix_list_item_quantity">${requiredAmount} of ${amount}</div>
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
        };
    }

    showEditWindow(e, id) {
        this.windowEdit.showForEdit(this.collection.getItem(id));
        this.currentEditGoodId = id;
    }

    removeHandler(e, id) {
        webix.confirm({
            title: 'Delete',
            type: 'confirm-warning',
            text: 'Are you sure you want to delete this part?',
            callback: (result) => {
                if (result) {
                    this.collection.removeGood(id)
                        .fail(() => this.app.appErrorMessage('Uninstall error'));
                }
            }
        });
    }

    editGood(data) {
        this.collection.updateGood(this.currentEditGoodId, data)
            .fail(() => this.app.appErrorMessage('Error editing'));
    }

    addGood(data) {
        this.collection.addGood(data)
            .fail(() => this.app.appErrorMessage('Error additing'));
    }

    init() {
        this.app.attachEvent('window:add:submit', data => this.addGood(data));

        this.windowEdit = this.ui(new AddEditGoodWindow(this.app, '', {
            submitHandler: this.editGood.bind(this)
        }));
    }
}
