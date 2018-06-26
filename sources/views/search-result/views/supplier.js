import {JetView} from 'webix-jet';

export default class SupplierView extends JetView {
    config() {
        return {
            rows: [
                {
                    view: 'template',
                    template: 'Some supplier <i class="webix_icon fa-star"></i><i class="webix_icon fa-star"></i><i class="webix_icon fa-star"></i>',
                    type: 'header'
                },
                {
                    view: 'datatable',
                    autoheight: true,
                    scrollX: false,
                    editable: true,
                    columns: [
                        {id: 'name', header: 'Name', fillspace: true},
                        {id: 'price', header: 'Price', width: 100},
                        {id: 'amount', header: 'Amount', width: 100},
                        {id: 'quantity', header: 'Quantity', width: 100, editor: 'text'}
                    ],
                    data: [
                        {name: 'The Shawshank Redemption', price: '$2002', amount: 67, quantity: 1},
                        {name: 'The Godfather', price: '$3206', amount: 51, quantity: 2},
                        {name: 'The Shawshank Redemption', price: '$2716', amount: 87, quantity: 3},
                        {name: 'The Godfather', price: '$2901', amount: 14, quantity: 4}
                    ]
                }
            ]
        };
    }
}
