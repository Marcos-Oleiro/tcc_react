import Constants from "../util/Constants";

export default class Service {
    constructor(endpoint) {
        this.url = `${Constants.HOST}/${endpoint}`;
    }

    doReq(method, data, headers) {
        return fetch(this.url, {
            method: method,
            mode: "cors",
            headers: headers,
            body: data
        });
    }

    doAsynReq(options) {
        return fetch(this.url, options);
    }
}