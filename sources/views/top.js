import {JetView} from 'webix-jet';

import ListView from 'views/list';
import ButtonsView from 'views/buttons';
import SearchResultView from 'views/search-result';

export default class TopView extends JetView {
    config() {
        return {
            id: 'layout',
            cols: [
                {
                    minWidth: 400,
                    maxWidth: 600,
                    rows: [ListView, ButtonsView]
                },
                {
                    view: 'resizer'
                },
                SearchResultView
            ]
        };
    }
}
