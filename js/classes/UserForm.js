import { Form } from "./Form.js";

export class UserForm extends Form {
    constructor(formId, action) {
        super(formId, action);
        this.formOpener = document.querySelector(`#${this.element.getAttribute('action')}-link`);
        this.formCloser = this.element.querySelector('.form-closer');

        this.display();
        this.hide();
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
    }
}