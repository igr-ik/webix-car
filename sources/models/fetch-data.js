export default class FetchData {
    constructor() {
        this.baseUrl = 'http://localhost:3000/';
    }

    getUrl(url) {
        return this.baseUrl + url;
    }

    _fetch(url, config) {
        return fetch(url, config)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error('Something went wrong ...');
            });
    }

    get(url) {
        return this._fetch(this.getUrl(url), {
            method: 'GET'
        });
    }

    delete(url) {
        return this._fetch(this.getUrl(url), {
            method: 'DELETE'
        });
    }
}
