import { Form } from "./classes/Form.js";
import { Toast } from "./classes/Toast.js";

document.addEventListener('DOMContentLoaded', () => {

    const USER_API = 'https://kebabtv.dwsapp.io/api/';

    const login = new Form('#login-form', userAPI + 'login');
    const register = new Form('#register-form', userAPI + 'register');

    login.element.addEventListener('submit', async e => {
        e.preventDefault();

        let response = await login.submit();
        if (typeof response !== 'undefined') {
            localStorage.setItem('user_id', response.data.user._id);
            localStorage.setItem('user_token', response.data.token);
        }
    });

    register.element.addEventListener('submit', e => {
        e.preventDefault();

        let response = await register.submit();
        if (typeof response !== 'undefined') {
            new Toast('success', 'Your account have been created<br>login to access all functionalities');
        }
    });

});