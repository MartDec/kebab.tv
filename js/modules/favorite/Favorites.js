import { Toast } from "../Toast.js";
import { Favorite } from "./Favorite.js";
import { FetchRequest } from '../FetchRequest.js';

export class Favorites {
    constructor() {
        this.wrapper = document.querySelector('#favorite-wrapper');
        this.api = 'https://kebabtv.dwsapp.io/api';
        this.favorites = null;
    };

    async init() {
        await this.getFavorites();
        return this;
    }

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
        document.querySelector('#movies-wrapper').innerHTML = '';
        this.wrapper.innerHTML = '';
        for (let favoriteData of this.favorites) {
            let favorite = new Favorite(favoriteData, this);
            this.wrapper.appendChild(favorite.element);
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
            await this.getFavorites();
            new Toast('success', `${movieTitle} successfully added to favorites`).show();
        } else {
            new Toast('error', response.err).show();
        }
    };

    async remove(favoriteId, movieTitle) {
        let response = await new FetchRequest(
            `${this.api}/favorite/${favoriteId}`,
            'DELETE',
            `{"token": "${localStorage.getItem('user_token')}"}`
        ).fetch();

        if (response.err === null || typeof response.err === 'undefined') {
            await this.getFavorites();
            new Toast('success', `${movieTitle} successfully removed from favorites`).show();
        } else {
            new Toast('error', response.err).show();
        }
    }
}