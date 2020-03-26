import { FetchRequest } from './classes/FetchRequest.js';
import { Toast } from './classes/Toast.js';

document.addEventListener('DOMContentLoaded', () => {

    const userApi = 'https://kebabtv.dwsapp.io/api/';
    const apiKey = '6fd32a8aef5f85cabc50cbec6a47f92f';
    const searchFilm = 'https://api.themoviedb.org/3/search/movie?api_key=6fd32a8aef5f85cabc50cbec6a47f92f&query=';
    const findFilm = 'https://api.themoviedb.org/3/movie/';
    const movieImg = 'https://image.tmdb.org/t/p/w500';

    const registerForm = document.querySelector('#register-form');
    const loginForm = document.querySelector('#login-form');
    const searchForm = document.querySelector('#search-form');
    const userFormWrapper = document.querySelector('#user-forms-wrapper');
    const userFormDisplayers = document.querySelectorAll('.user-form-displayer');

    const movieWrapper = document.querySelector('#movie-wrapper');

    const getFormData = form => {
        const inputs = form.querySelectorAll('input');
        const data = {};
        for (let input of inputs) {
            data[input.getAttribute('name')] = input.value;
        }

        return data;
    }

    const setDisplayDetailsListeners = () => {
        const buttons = document.querySelectorAll('.show-details');
        for (let button of buttons) {
            button.addEventListener('click', e => {
                const movieId = e.target.getAttribute('data-movie-id');
                displayMovieDetails(movieId);
            })
        }
    }

    const setAddFavListener = () => {
        const button = document.querySelector('.add-favourites');
        button.addEventListener('click', async e => {
            const data = {
                id: e.target.getAttribute('data-movie-id'),
                title: e.target.getAttribute('data-movie-title'),
                token: localStorage.getItem('user_token')
            };
            let response = await new FetchRequest(userApi + 'favorite', 'POST', JSON.stringify(data)).fetch();
            console.log(response);
        });
    }

    const displayMovies = data => {
        for (let movie of data.results) {
            let element = document.createElement('div');
            element.classList.add('single-movie');
            let posterPath = movie.poster_path !== null
                ? movieImg + movie.poster_path
                : '../public/img/movie-placeholder.png';
            element.innerHTML = `
            <img src="${posterPath}"/>
            <div>
                <h3>${movie.title}</h3>
                <button class="show-details" data-movie-id="${movie.id}">show details</button>
            </div>
            `;
            movieWrapper.appendChild(element);
        }
        setDisplayDetailsListeners();
    }

    const removeMovieDetails = details => {
        const button = details.querySelector('.close');
        button.addEventListener('click', () => {
            document.body.removeChild(details);
        });
    };

    const displayMovieDetails = async movieId => {
        const movie = await new FetchRequest(`${findFilm + movieId}?api_key=${apiKey}`).fetch();
        let element = document.createElement('div');
        element.setAttribute('id', 'movie-details-wrapper');
        let posterPath = movie.poster_path !== null
            ? movieImg + movie.poster_path
            : '../public/img/movie-placeholder.png';
        element.innerHTML = `
        <div id="movie-details">
            <img src="${posterPath}"/>
            <div>
                <h3>${movie.title}</h3>
                <p>${movie.overview}</p>
                <p>release date : ${movie.release_date}</p>
                <div class="actions">
                    <button class="add-favourites" data-movie-id="${movie.id}" data-movie-title="${movie.title}">add to favourites</button>
                    <button class="close">close</button>
                </div>
            </div>
        </div>
        `;
        document.body.appendChild(element);
        setAddFavListener();
        removeMovieDetails(element);
    }

    for (let link of userFormDisplayers) {
        link.addEventListener('click', e => {
            e.preventDefault();

            userFormWrapper.classList.remove('d-none');
        });
    }

    searchForm.addEventListener('submit', async e => {
        e.preventDefault();

        const keyword = e.target.querySelector('input').value;
        const url = searchFilm + keyword;
        let response = await new FetchRequest(url).fetch();
        console.log(typeof response.status_code)
        if (typeof response.status_code == 'undefined')
            displayMovies(response);
    });

    registerForm.addEventListener('submit', async e => {
        e.preventDefault();

        const url = userApi + e.target.getAttribute('action');
        const method = e.target.getAttribute('method');
        const data = getFormData(e.target);

        let response = await new FetchRequest(url, method, JSON.stringify(data)).fetch();
        if (response.err === null) {
            new Toast('success', `welcome ${response.data.user.pseudo} !`).show();
            localStorage.setItem('user_id', response.data.user._id);
        }
    });

    loginForm.addEventListener('submit', async e => {
        e.preventDefault();

        const url = userApi + e.target.getAttribute('action');
        const method = e.target.getAttribute('method');
        const data = getFormData(e.target);

        let response = await new FetchRequest(url, method, JSON.stringify(data)).fetch();
        if (response.err === null) {
            new Toast('success', `welcome ${response.data.user.pseudo} !`).show();
            localStorage.setItem('user_id', response.data.user._id);
            localStorage.setItem('user_token', response.data.token);
        }
    });

});