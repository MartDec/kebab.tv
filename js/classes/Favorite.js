import { MoviePopup } from "./MoviePopup.js";
import { FetchRequest } from './FetchRequest.js';
import { Toast } from './Toast.js';

export class Favorite {
    constructor(session) {
        this.session = session;
        this.wrapper = document.querySelector('#favorite-wrapper');
    };

    async display() {
        if (this.session.logged) {
            let response = await new FetchRequest(
                'https://kebabtv.dwsapp.io/api/me',
                'POST',
                `{"token": "${localStorage.getItem('user_token')}"}`
            ).fetch();
            if (response.err === null || typeof response.err === 'undefined') {
                this.createElements(response.data.favorite);
            } else
                new Toast('error', response.err).show();
        } else {
            new Toast('error', 'You must be logged to access this functionnality').show();
        }
    };

    createElements(favorites) {
        document.querySelector('#movies-wrapper').innerHTML = '';
        this.wrapper.innerHTML = '';
        for (let favorite of favorites) {
            let element = document.createElement('div');
            element.classList.add('single-favorite');
            element.innerHTML = `
            <a href="#" class="show-details">
                <h3 data-movie-id="${favorite.id}" data-favorite-id="${favorite._id}">${favorite.title}</h3>
            </a>
            <a href="#" class="remove-favorite" data-movie-title="${favorite.title}" data-favorite-id="${favorite._id}">
                <i class="fas fa-trash"></i>
            </a>`;
            this.wrapper.appendChild(element);
        }
        this.showDetails();
        this.removeFavorite();
    };

    removeFavorite() {
        const removeButtons = this.wrapper.querySelectorAll('.remove-favorite');
        for (let button of removeButtons) {
            button.addEventListener('click', async e => {
                e.preventDefault();
                let response = await new FetchRequest(
                    `https://kebabtv.dwsapp.io/api/favorite/${button.getAttribute('data-favorite-id')}`,
                    'DELETE',
                    `{"token": "${localStorage.getItem('user_token')}"}`
                ).fetch();
                if (response.err === null || typeof response.err === 'undefined') {
                    this.wrapper.removeChild(button.parentElement);
                    new Toast('success', `${button.getAttribute('data-movie-title')} successfully removed from favorites`).show();
                    new Favorite(this.session).display();
                }
            })
        }
    }

    showDetails() {
        const buttons = this.wrapper.querySelectorAll('.show-details');
        for (let button of buttons) {
            button.addEventListener('click', e => {
                e.preventDefault();
                const movieId = e.target.getAttribute('data-movie-id');
                const favoriteId = e.target.getAttribute('data-favorite-id');
                new MoviePopup(movieId, this.session, 'favorite').display(favoriteId);
            })
        }
    }
}