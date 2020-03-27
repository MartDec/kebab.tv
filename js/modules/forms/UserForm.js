import { Form } from "./Form.js";
import { FetchRequest } from "../FetchRequest.js";
import { Toast } from '../Toast.js';

export class UserForm extends Form {
    constructor(formId, action) {
        super(formId, action);
        this.formOpener = document.querySelector(`#${this.element.getAttribute('action')}-link`);
        this.formCloser = this.element.querySelector('.form-closer');

        this.display();
        this.hide();
    };

    async submit() {
        let userData = super._getPostData();
        let response = await super.submit();
        if (typeof response.data.token === 'undefined')
            response = await this._getUserToken(userData);

        if (typeof response !== 'undefined') {
            new Toast('success', `Welcome ${response.data.user.pseudo} !`).show();
            this.element.parentElement.classList.add('d-none');
        }

        return response;
    };

    display() {
        this.formOpener.addEventListener('click', e => {
            e.preventDefault();
            this.element.parentElement.classList.remove('d-none');
        });
    };

    hide() {
        this.formCloser.addEventListener('click', e => {
            e.preventDefault();
            this.element.parentElement.classList.add('d-none');
        });
    };

    async _getUserToken(userData) {
        let data = {
            email: userData.email,
            password: userData.password
        };

        let response = await new FetchRequest(
            'https://kebabtv.dwsapp.io/api/login',
            'POST',
            JSON.stringify(data)
        ).fetch();

        if (response.err === null || typeof response.err === 'undefined')
            return response;
        else
            new Toast('error', response.err).show();
    }
}