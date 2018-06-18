import {JetView} from 'webix-jet';
import RequiredGoods from '../models/reguired-goods';

export default class ListView extends JetView {
    constructor(app, name, config) {
        super(app, name);
        this.collection = config.collection;
        this.collection.fetchData()
            .then(res => $$('list').parse(JSON.stringify(res), 'json'));
    }

    config() {
        return {
            id: 'list',
            view: 'list',
            type: {
                height: 'auto',
                classname: (obj, common, marks) => {
                    let nativeClassName = webix.ui.list.prototype.type.classname
                        .call(this, obj, common, marks);

                    return `${nativeClassName} webix_list_item_bucket`;
                },
                template: ({name, image, amount, suppliers}) => {
                    let suppliersList = [];

                    let requiredAmount = suppliers
                        .reduce((sum, curVal) => sum + curVal.requiredAmount, 0);

                    suppliers.forEach(item => suppliersList.push(item.name));

                    return `
                        <div class="webix_list_item_images">
                            <img src="${image}" alt="">
                        </div>
                        <div class="webix_list_item_content">
                            <div class="webix_list_item_title">${name}</div>
                            <div class="webix_list_item_quantity">${requiredAmount} of ${amount}</div>
                            <div class="webix_list_item_suppliers">Suppliers: ${suppliersList.join(', ')}</div>
                        </div>
                        <div class="webix_list_item_btnset">
                            <div class="edit webix_list_item_btn"><span class="webix_icon fa-pencil"></span></div>
                            <div class="remove webix_list_item_btn"><span class="webix_icon fa-trash"></span></div>
                        </div>
                    `;
                }
            },
            onClick: {
                edit: (e, id) => {
                    console.log('edit', id);

                    return false;
                },
                remove: (e, id) => {
                    webix.confirm({
                        type: 'confirm-warning',
                        text: 'Are you sure you want to delete this part?',
                        callback: (result) => {
                            if (result) {
                                new RequiredGoods().removeGood(id);
                            }
                        }
                    });
                }
            }
        };
    }
}
