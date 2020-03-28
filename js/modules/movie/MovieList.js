import { FetchRequest } from "../FetchRequest.js";
import { Movie } from "./Movie.js";
import { Toast } from "../Toast.js";
import { Pagination } from "../Pagination.js";

export class MovieList {
    constructor() {
        this.wrapper = document.querySelector('#movies-wrapper');
        this.searchUrl = 'https://api.themoviedb.org/3/search/movie';
        this.findUrl = 'https://api.themoviedb.org/3/movie';
        this.apiKey = '6fd32a8aef5f85cabc50cbec6a47f92f';
        this.movies = null;
        this.currentPage = null;
        this.totalPages = null;
        this.totalResults = null;
        this.keyword = null;
    };

    display() {
        document.querySelector('#favorite-wrapper').innerHTML = '';
        this.wrapper.innerHTML = '';
        const moviesContainer = document.createElement('div');
        moviesContainer.setAttribute('id', 'movies-container');
        for (let movieData of this.movies) {
            let movie = new Movie(movieData, this);
            moviesContainer.appendChild(movie.element);
        }
        const pagination = new Pagination({
            list: this,
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            totalResults: this.totalResults
        });
        this.wrapper.appendChild(moviesContainer);
        this.wrapper.appendChild(pagination.element);
    };

    async search(keyword) {
        this.keyword = keyword;
        const url = `${this.searchUrl}?query=${keyword}&api_key=${this.apiKey}`;
        const response = await new FetchRequest(url).fetch();

        if (response.err === null || typeof response.err === 'undefined') {
            this.movies = response.results;
            this.currentPage = +response.page;
            this.totalPages = +response.total_pages;
            this.totalResults = +response.total_results;
        } else {
            new Toast('error', response.err).show();
        }

        return this;
    };

    async getMovie(movieId) {
        const url = `${this.findUrl}/${movieId}?api_key=${this.apiKey}`;
        const response = await new FetchRequest(url).fetch();

        if (response.err === null || typeof response.err === 'undefined') {
            return new Movie(response);
        } else {
            new Toast('error', response.err).show();
        }
    };

    async getPage(number) {
        const url = `${this.searchUrl}?query=${this.keyword}&page=${number}&api_key=${this.apiKey}`;
        const response = await new FetchRequest(url).fetch();

        if (response.err === null || typeof response.err === 'undefined') {
            this.movies = response.results;
            this.currentPage = +response.page;
            this.totalPages = +response.total_pages;
            this.totalResults = +response.total_results;
        } else {
            new Toast('error', response.err).show();
        }

        return this;
    };
}