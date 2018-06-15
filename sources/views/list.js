import {JetView} from 'webix-jet';

export default class ListView extends JetView {
    constructor(app, name, config) {
        super(app, name);
        this.collection = config.collection;
    }

    config() {
        return {
            view: 'list',
            type: {
                height: 'auto',
                classname: (obj, common, marks) => {
                    let nativeClassName = webix.ui.list.prototype.type.classname
                        .call(this, obj, common, marks);

                    return `${nativeClassName} webix_list_item_bucket`;
                },
                template: `
                    <div class="webix_list_item_content">
                        <div class="webix_list_item_title">#title#</div>
                        <div class="webix_list_item_quantity">#quantity# of 20</div>
                    </div>
                    <div class="webix_list_item_btnset">
                        <div class="edit webix_list_item_btn"><span class="webix_icon fa-pencil"></span></div>
                        <div class="remove webix_list_item_btn"><span class="webix_icon fa-trash"></span></div>
                    </div>
                `
            },
            onClick: {
                edit: (e, id) => {
                    console.log('edit', id);

                    return false;
                },
                remove: (e, id) => {
                    console.log('remove', id);

                    return false;
                }
            },
            data: [
                {id: 1, title: 'Двигатели', quantity: 2},
                {id: 2, title: 'Бампера', quantity: 4},
                {id: 3, title: 'Колеса', quantity: 8}
            ]
        };
    }

    init() {
        let collection = this.collection.fetchData();

    }
}
