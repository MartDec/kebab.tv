import { FetchRequest } from "./FetchRequest.js";
import { Movie } from "./Movie.js";

export class MovieList {
    constructor() {
        this.wrapper = document.querySelector('#movies-wrapper');
        this.api = 'https://api.themoviedb.org/3/search/movie';
        this.apiKey = '6fd32a8aef5f85cabc50cbec6a47f92f';
        this.movies = null;
        this.currentPage = null;
        this.totalPage = null;
        this.totalResults = null;
    };

    async search(keyword) {
        const url = `${this.api}?query=${keyword}&api_key=${this.apiKey}`;
        const response = await new FetchRequest(url).fetch();

        if (response.err === null || typeof response.err === 'undefined') {
            this.movies = response.results;
            this.currentPage = response.page;
            this.totalPage = response.total_pages;
            this.totalResults = response.total_results;
        } else {
            new Toast('error', response.err).show();
        }

        return this;
    };

    display() {
        document.querySelector('#favorite-wrapper').innerHTML = '';
        this.wrapper.innerHTML = '';
        for (let movieData of this.movies) {
            let movie = new Movie(movieData, this);
            this.wrapper.appendChild(movie.element);
        }
    };
}