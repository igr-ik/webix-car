import {JetView} from 'webix-jet';

import ListView from './list';
import ButtonsView from './buttons';
import SearchResultView from './search-result/search-result';
import RequiredGoods from '../models/reguired-goods';

export default class TopView extends JetView {
    config() {
        return {
            id: 'layout',
            cols: [
                {
                    minWidth: 400,
                    maxWidth: 600,
                    rows: [
                        new ListView(
                            this.app,
                            '',
                            {
                                collection: new RequiredGoods()
                            }
                        ),
                        ButtonsView
                    ]
                },
                {
                    view: 'resizer'
                },
                SearchResultView
            ]
        };
    }
}
