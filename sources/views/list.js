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
            view: 'list',
            data: this.collection,
            type: {
                height: 'auto',
                classname: (obj, common, marks) => {
                    let nativeClassName = webix.ui.list.prototype.type.classname
                        .call(this, obj, common, marks);

                    return `${nativeClassName} webix_list_item_bucket`;
                },
                template: ({name, image, amount, suppliers}) => {
                    let suppliersList = suppliers.map(item => item.name).join(', ');
                    let requiredAmount = suppliers
                        .reduce((sum, curVal) => sum + curVal.requiredAmount, 0);

                    return `
                        <div class="webix_list_item_images">
                            <img src="${image}" alt="${name}">
                        </div>
                        <div class="webix_list_item_content">
                            <div class="webix_list_item_title">${name}</div>
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
                edit: this.editGood.bind(this),
                remove: this.removeGood.bind(this)
            }
        };
    }

    editGood(e, id) {
        this.windowEdit.show();
    }

    removeGood(e, id) {
        webix.confirm({
            title: 'Delete',
            type: 'confirm-warning',
            text: 'Are you sure you want to delete this part?',
            callback: (result) => {
                if (result) {
                    this.collection.removeGood(id);
                    this.collection.remove(id);
                }
            }
        });
    }

    init() {
        this.windowEdit = this.ui(AddEditGoodWindow);
    }
}
