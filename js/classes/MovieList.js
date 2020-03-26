import { FetchRequest } from "./FetchRequest.js";

export class MovieList {
    constructor(moviesData) {
        this.currentPage = moviesData.page;
        this.totalPages = moviesData.total_pages;
        this.totalResults = moviesData.total_results;
        this.currentResults = moviesData.results;
        this.wrapper = document.querySelector('#movies-wrapper');
        this.posterUrl = 'https://image.tmdb.org/t/p/w500';
        this.findMovieUrl = 'https://api.themoviedb.org/3/movie/';
    };

    display() {
        for (let movie of this.currentResults) {
            let element = document.createElement('div');
            element.classList.add('single-movie');

            let poster = movie.poster_path !== null
                ? this.posterUrl + movie.poster_path
                : '../../public/img/movie-placeholder.png';

            element.innerHTML = `
            <img src="${poster}"/>
            <div class="movie-infos">
                <h3>${movie.title}</h3>
                <div class="actions">
                    <button class="watch-details" data-movie-id="${movie.id}">watch details</button>
                </div>
            </div>`;
            this.wrapper.appendChild(element);
        }
        this._getDetails();
    };

    _getDetails() {
        let buttons = document.querySelectorAll('.watch-details');
        for (let button of buttons) {
            button.addEventListener('click', async e => {
                const movieId = e.target.getAttribute('data-movie-id');
                const url = `${this.findMovieUrl + movieId}?api_key=6fd32a8aef5f85cabc50cbec6a47f92f`;
                const movie = await new FetchRequest(url).fetch();
                this._displayMoviePopup(movie);
            });
        }
    };

    _displayMoviePopup(movie) {
        let element = document.createElement('div');
        element.setAttribute('id', 'movie-details-wrapper');

        let poster = movie.poster_path !== null
        ? this.posterUrl + movie.poster_path
        : '../../public/img/movie-placeholder.png';

        element.innerHTML = `
        <div id="movie-details">
            <img src="${poster}"/>
            <div>
                <h3>${movie.title}</h3>
                <p>${movie.overview}</p>
                <p>release date : ${movie.release_date}</p>
                <div class="actions">
                    <button class="add-favorite" data-movie-id="${movie.id}" data-movie-title="${movie.title}">add to favorite</button>
                    <button class="close">close</button>
                </div>
            </div>
        </div>
        `;
        document.body.appendChild(element);
    }
}