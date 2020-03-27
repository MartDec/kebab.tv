import { FetchRequest } from "./FetchRequest.js";
import { Toast } from "./Toast.js";

export class MoviePopup {
    constructor(movieData, session) {
        this.id = movieData.id;
        this.poster = movieData.poster_path;
        this.title = movieData.title;
        this.overview = movieData.overview;
        this.releaseDate = movieData.release_date;
        this.posterUrl = 'https://image.tmdb.org/t/p/w500';
        this.session = session;
    };

    display() {
        this._createElement();
        document.body.appendChild(this.element);
        this.addToFavorite();
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
            id: this.id,
            title: this.title,
            token: localStorage.getItem('user_token')
        };
        button.addEventListener('click', async () => {
            let response = await new FetchRequest(
                'https://kebabtv.dwsapp.io/api/favorite',
                'POST',
                JSON.stringify(data)
            ).fetch();
            console.log(data);
            if (response.err === null || typeof response.err === 'undefined') {
                new Toast('success', `${this.title} successfully added to favorites`).show();
            }
        });
    };

    _createElement() {
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'movie-details-wrapper');

        let poster = this.poster !== null
            ? this.posterUrl + this.poster
            : '../../public/img/movie-placeholder.png';

        let disableFav = this.session.logged ? '' : ' disabled';
        this.element.innerHTML = `
        <div id="movie-details">
            <img src="${poster}"/>
            <div>
                <h3>${this.title}</h3>
                <p>${this.overview}</p>
                <p>release date : ${this.releaseDate}</p>
                <div class="actions">
                    <button class="add-favorite" data-movie-id="${this.id}" data-movie-title="${this.title}"${disableFav}>add to favorite</button>
                    <button class="close">close</button>
                </div>
            </div>
        </div>`;
    }
}