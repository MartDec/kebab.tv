import { Toast } from "./Toast.js";

export class FetchRequest {
    constructor(url, method = 'GET', data = null) {
        this.url = url;
        this.method = method.toUpperCase();
        this.data = data;
    };

    fetch() {
        let params = {
            method: this.method,
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (this.data !== null && this.method !== 'GET')
            params.body = this.data;

        return fetch(this.url, params)
            .then(response => response.ok ? response.json() : {err: response.statusText})
            .then(data => {
                if (data.error !== null)
                    return data;
                else
                    new Toast('error', data.error).show();
            })
            .catch(err => console.error(err));
    }
}