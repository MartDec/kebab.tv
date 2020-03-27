import { Toast } from "./Toast.js";
import { Favorite } from "./Favorite.js";

export class Favorites {
    constructor() {
        this.wrapper = document.querySelector('#favorite-wrapper');
        this.api = 'https://kebabtv.dwsapp.io/api';
        this.favorites = null;

        this.getFavorites();
    };

    async getFavorites() {
        let response = await new FetchRequest(
            `${this.api}/me`,
            'POST',
            `{"token": "${localStorage.getItem('user_token')}"}`
        ).fetch();

        if (response.err === null || typeof response.err === 'undefined') {
            this.favorites = response.data.favorite;
        } else {
            new Toast('error', response.err).show();
        }
    };

    display() {
        this.wrapper.innerHTML = '';
        for (let favoriteData of this.favorites) {
            favorite = new Favorite(favoriteData, this);
            this.wrapper.appendChild(this.favorite.element);
        }
    };

    async add(movieId, movieTitle) {
        const params = {
            id: movieId,
            title: movieTitle,
            token: localStorage.getItem('user_token')
        };
        let response = await new FetchRequest(
            `${this.api}/favorite`,
            'POST',
            JSON.stringify(params)
        ).fetch();

        if (response.err === null || typeof response.err === 'undefined') {
            new Toast('success', `${response.data.data.title} successfully added to favorites`).show();
        } else {
            new Toast('error', response.err).show();
        }
    };

    async remove(favoriteId) {
        let response = await new FetchRequest(
            `${this.api}/favorite/${favoriteId}`,
            'DELETE',
            `{"token": "${localStorage.getItem('user_token')}"}`
        ).fetch();

        if (response.err === null || typeof response.err === 'undefined') {
            new Toast('success', `${response.data.data.title} successfully removed from favorites`).show();
        } else {
            new Toast('error', response.err).show();
        }
    }
}