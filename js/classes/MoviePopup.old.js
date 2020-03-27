import { FetchRequest } from "./FetchRequest.js";
import { Toast } from "./Toast.js";
import { Favorite } from "./Favorite.js";

export class MoviePopup {
    constructor(movieId, session, type) {
        this.id = movieId;
        this.session = session;
        this.type = type;
        this.posterUrl = 'https://image.tmdb.org/t/p/w500';
        this.detailsUrl = 'https://api.themoviedb.org/3/movie/';
    };

    async display(favoriteId = null) {
        const movie = await new FetchRequest(`${this.detailsUrl + this.id}?api_key=6fd32a8aef5f85cabc50cbec6a47f92f`).fetch();
        this._createElement(movie, favoriteId);
        document.body.appendChild(this.element);
        if (this.type === 'list')
            this.addToFavorite();
        else
            this.removeFromFavorite();
        this.close();
    };

    close() {
        let closeBtn = this.element.querySelector('.actions .close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(this.element);
        });
    };

    addToFavorite() {
        const button = this.element.querySelector('.add-favorite');
        const data = {
            id: button.getAttribute('data-movie-id'),
            title: button.getAttribute('data-movie-title'),
            token: localStorage.getItem('user_token')
        };
        button.addEventListener('click', async () => {
            let response = await new FetchRequest(
                'https://kebabtv.dwsapp.io/api/favorite',
                'POST',
                JSON.stringify(data)
            ).fetch();
            if (response.err === null || typeof response.err === 'undefined') {
                document.body.removeChild(this.element);
                new Toast('success', `${data.title} successfully added to favorites`).show();
            }
        });
    };

    removeFromFavorite() {
        const button = this.element.querySelector('.remove-favorite');
        button.addEventListener('click', async () => {
            let response = await new FetchRequest(
                `https://kebabtv.dwsapp.io/api/favorite/${button.getAttribute('data-favorite-id')}`,
                'DELETE',
                `{"token": "${localStorage.getItem('user_token')}"}`
            ).fetch();
            if (response.err === null || typeof response.err === 'undefined') {
                document.body.removeChild(this.element);
                new Toast('success', `${button.getAttribute('data-movie-title')} successfully removed from favorites`).show();
                new Favorite(this.session).display();
            }
        });
    };

    _createElement(movie, favoriteId) {
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'movie-details-wrapper');

        let poster = movie.poster_path !== null
            ? this.posterUrl + movie.poster_path
            : '../../public/img/movie-placeholder.png';

        let disableFav = this.session.logged ? '' : ' disabled';
        let action = this.type === 'list'
            ? `<button class="add-favorite" data-movie-id="${this.id}" data-movie-title="${movie.title}"${disableFav}>add to favorite</button>`
            : `<button class="remove-favorite" data-favorite-id="${favoriteId}" data-movie-title="${movie.title}">remove from favorite</button>`;

        this.element.innerHTML = `
        <div id="movie-details">
            <img src="${poster}"/>
            <div>
                <h3>${movie.title}</h3>
                <p>${movie.overview}</p>
                <p>release date : ${movie.release_date}</p>
                <div class="actions">
                    ${action}
                    <button class="close">close</button>
                </div>
            </div>
        </div>`;
    }
}