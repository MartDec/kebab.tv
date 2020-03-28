import { MoviePopup } from "./MoviePopup.js";

export class Movie {
    constructor(data, list = null) {
        this.id = data.id;
        this.title = data.title;
        this.overview = data.overview;
        this.releaseDate = data.release_date;
        this.poster = data.poster_path !== null
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : `${window.location.href}public/img/movie-placeholder.png`;
        this.list = list;
        this.element = null;

        this.createElement();
    };

    showDetails() {
        new MoviePopup(this, {type: 'list'}).display();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('single-movie');

        this.element.innerHTML = `
        <img src="${this.poster}" class="show-details"/>
        <div class="movie-infos">
            <h3 class="show-details">${this.title}</h3>
            <div class="actions">
                <button class="show-details">show details</button>
            </div>
        </div>`;
        this.setShowDetailsListener();
    };

    setShowDetailsListener() {
        const showBtns = this.element.querySelectorAll('.show-details');
        for (let button of showBtns) {
            button.addEventListener('click', () => {
                this.showDetails();
            });
        }
    };
}