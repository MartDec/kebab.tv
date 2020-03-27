import { UserForm } from "./modules/forms/UserForm.js";
import { Form } from "./modules/forms/Form.js";
import { MovieList } from "./modules/movie/MovieList.js";
import { Session } from "./modules/Session.js";
import { Favorites } from './modules/favorite/Favorites.js';

document.addEventListener('DOMContentLoaded', () => {

    const USER_API = 'https://kebabtv.dwsapp.io/api/';

    const login = new UserForm('#login-form form', USER_API + 'login');
    const register = new UserForm('#register-form form', USER_API + 'register');

    const search = document.querySelector('#search-form');
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

    search.addEventListener('submit', async e => {
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