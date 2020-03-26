import { FetchRequest } from "./FetchRequest.js";
import { Toast } from "./Toast.js";

export class Form {
    constructor(formId, action = null) {
        this.element = document.querySelector(formId);
        this.action = action === null ? this.element.getAttribute('action') : action;
        this.method = this.element.getAttribute('method').toUpperCase();
    };

    async submit() {
        const data = this._getData();
        let response = await new FetchRequest(this.action, this.method, JSON.stringify(data)).fetch();
        if (response.err === null) {
            return response;
        } else {
            new Toast('error', response.error).show();
        }
    };

    _getData() {
        const inputs = this.element.querySelectorAll('input');
        const values = {};

        for (let input of inputs) {
            values[input.getAttribute('name')] = input.value;
        }

        return values;
    };
}