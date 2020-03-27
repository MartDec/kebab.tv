import { UserForm } from "./classes/UserForm.js";
import { Form } from "./classes/Form.js";
import { MovieList } from "./classes/MovieList.js";
import { Session } from "./classes/Session.js";
import { Favorites } from './classes/Favorites.js';

document.addEventListener('DOMContentLoaded', () => {

    const USER_API = 'https://kebabtv.dwsapp.io/api/';
    const MOVIE_API = 'https://api.themoviedb.org/3/search/movie?api_key=6fd32a8aef5f85cabc50cbec6a47f92f';

    const login = new UserForm('#login-form form', USER_API + 'login');
    const register = new UserForm('#register-form form', USER_API + 'register');
    const search = new Form('#search-form', MOVIE_API);

    const favorite = document.querySelector('#favorite-link');
    const logout = document.querySelector('#logout-link');

    const session = new Session;

    login.element.addEventListener('submit', async e => {
        e.preventDefault();
        let userData = await login.submit();
        session.create(userData.data);
    });

    register.element.addEventListener('submit', async e => {
        e.preventDefault();
        let userData = await register.submit();
        session.create(userData.data);
    });

    search.element.addEventListener('submit', async e => {
        e.preventDefault();
        const keyword = e.target.querySelector('input').value;
        const list = await new MovieList().search(keyword);
        list.display();
    });

    favorite.addEventListener('click', async e => {
        e.preventDefault();
        let favorites = await new Favorites().init();
        favorites.display();
    })

    logout.addEventListener('click', e => {
        e.preventDefault();
        session.destroy();
    })

});