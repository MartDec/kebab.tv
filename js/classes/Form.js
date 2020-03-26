import { FetchRequest } from "./FetchRequest.js";
import { Toast } from "./Toast.js";

export class Form {
    constructor(formId, action) {
        this.element = document.querySelector(formId);
        this.action = action;
        this.method = this.element.getAttribute('method').toUpperCase();
    };

    async submit() {
        let response = null;

        if (this.method === 'POST') {
            const data = this._getPostData();
            response = await new FetchRequest(this.action, this.method, JSON.stringify(data)).fetch();
        } else {
            const params = this._getGetData();
            const url = this.action + params;
            response = await new FetchRequest(url).fetch();
        }

        if (response.err === null || typeof response.err === 'undefined')
            return response;
        else
            new Toast('error', response.err).show();
    };

    _getPostData() {
        const inputs = this.element.querySelectorAll('input');
        const values = {};

        for (let input of inputs) {
            values[input.getAttribute('name')] = input.value;
        }

        return values;
    };

    _getGetData() {
        const inputs = this.element.querySelectorAll('input');
        let values = '';

        for (let input of inputs) {
            values += `&${input.getAttribute('name')}=${input.value}`;
        }

        return values;
    }
}