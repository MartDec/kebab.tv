export class Toast {
    constructor(type, message) {
        this.type = type;
        this.message = message;
    };

    show() {
        let element = document.createElement('div');
        element.classList.add('toast');
        element.classList.add(`toast-${this.type}`);
        element.innerHTML = this.message;
        document.body.appendChild(element);
        setTimeout(() => {
            document.body.removeChild(element);
        }, 2500);
    }
}