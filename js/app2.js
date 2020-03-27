import { UserForm } from "./classes/UserForm.js";
import { Form } from "./classes/Form.js";
import { MovieList } from "./classes/MovieList.js";
import { Session } from "./classes/Session.js";

document.addEventListener('DOMContentLoaded', () => {

    const USER_API = 'https://kebabtv.dwsapp.io/api/';
    const MOVIE_API = 'https://api.themoviedb.org/3/search/movie?api_key=6fd32a8aef5f85cabc50cbec6a47f92f';

    const login = new UserForm('#login-form form', USER_API + 'login');
    const register = new UserForm('#register-form form', USER_API + 'register');
    const search = new Form('#search-form', MOVIE_API);

    const logout = document.querySelector('#logout-link');

    const session = new Session;

    login.element.addEventListener('submit', async e => {
        e.preventDefault();
        let userData = await login.submit();
        session.createSession(userData.data);
    });

    register.element.addEventListener('submit', async e => {
        e.preventDefault();
        let userData = await register.submit();
        session.createSession(userData.data);
    });

    search.element.addEventListener('submit', async e => {
        e.preventDefault();
        let response = await search.submit();
        const movieList = new MovieList(response).display();
    });

    logout.addEventListener('click', e => {
        e.preventDefault();
        session.destroySession();
    })

});