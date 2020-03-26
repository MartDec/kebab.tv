import { Toast } from "./classes/Toast.js";
import { UserForm } from "./classes/UserForm.js";
import { Form } from "./classes/Form.js";
import { MovieList } from "./classes/MovieList.js";

document.addEventListener('DOMContentLoaded', () => {

    const USER_API = 'https://kebabtv.dwsapp.io/api/';
    const MOVIE_API = 'https://api.themoviedb.org/3/search/movie?api_key=6fd32a8aef5f85cabc50cbec6a47f92f';

    const login = new UserForm('#login-form form', USER_API + 'login');
    const register = new UserForm('#register-form form', USER_API + 'register');
    const search = new Form('#search-form', MOVIE_API);

    login.element.addEventListener('submit', async e => {
        e.preventDefault();

        let response = await login.submit();
        if (typeof response !== 'undefined') {
            localStorage.setItem('user_id', response.data.user._id);
            localStorage.setItem('user_token', response.data.token);
        }
    });

    register.element.addEventListener('submit', async e => {
        e.preventDefault();

        let response = await register.submit();
        if (typeof response !== 'undefined') {
            new Toast('success', 'Your account have been created<br>login to access all functionalities').show();
        }
    });

    search.element.addEventListener('submit', async e => {
        e.preventDefault();
        let response = await search.submit();
        const movieList = new MovieList(response).display();
    });

});