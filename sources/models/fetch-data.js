class FetchData {
    _getUrl(url) {
        return `http://localhost:3000/${url}`;
    }

    get(url) {
        return webix.ajax().get(this._getUrl(url))
            .then(response => response.json());
    }

    delete(url) {
        return webix.ajax().del(this._getUrl(url));
    }

    put(url, data = {}) {
        return webix.ajax()
            .headers({
                'Content-type': 'application/json; charset=utf-8'
            })
            .put(this._getUrl(url), JSON.stringify(data));
    }

    post(url, data = {}) {
        return webix.ajax()
            .headers({
                'Content-type': 'application/json; charset=utf-8'
            })
            .post(this._getUrl(url), JSON.stringify(data));
    }
}

export default new FetchData();
