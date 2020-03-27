import { FetchRequest } from "./FetchRequest.js";
import { MoviePopup } from "./MoviePopup.js";

export class MovieList {
    constructor(moviesData, session) {
        this.currentPage = moviesData.page;
        this.totalPages = moviesData.total_pages;
        this.totalResults = moviesData.total_results;
        this.currentResults = moviesData.results;
        this.wrapper = document.querySelector('#movies-wrapper');
        this.findMovieUrl = 'https://api.themoviedb.org/3/movie/';
        this.posterUrl = 'https://image.tmdb.org/t/p/w500';
        this.session = session;
    };

    display() {
        this.wrapper.innerHTML = '';
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
                new MoviePopup(movie, this.session).display();
            });
        }
    };
}