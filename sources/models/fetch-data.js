export default class FetchData {
    constructor() {
        this.baseUrl = 'http://localhost:3000/';
    }

    getUrl(url) {
        return this.baseUrl + url;
    }

    _fetch(url, method) {
        return webix.ajax()[method](url)
            .then(response => response.json());
    }

    get(url) {
        return this._fetch(this.getUrl(url), 'get');
    }

    delete(url) {
        return this._fetch(this.getUrl(url), 'del');
    }
}
