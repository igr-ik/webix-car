import {JetView} from 'webix-jet';

export default class ListView extends JetView {
    config() {
        return {
            id: 'bucket-list',
            view: 'list',
            css: 'bucket',
            type: {
                templateStart: '<div webix_l_id="#id#" class="bucket__item">',
                template: '<div>#title#</div>'
                        + '<div>#quantity# of 20</div>',
                templateEnd: '</div>'
            },
            data: [
                {id: 1, title: 'Двигатели', quantity: 2},
                {id: 2, title: 'Бампера', quantity: 4},
                {id: 3, title: 'Колеса', quantity: 8}
            ]
        };
    }
}
