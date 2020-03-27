export class Movie {
    constructor(data, list) {
        this.id = data.id;
        this.title = data.title;
        this.overview = data.overview;
        this.releaseDate = data.release_date;
        this.poster = data.poster_path !== null
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : `${window.location.href}public/img/movie-placeholder.png`;
        this.list = list;
        this.element = null;
        this.popup = null;

        this.createElement();
    };

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('single-movie');

        this.element.innerHTML = `
        <img src="${this.poster}"/>
        <div class="movie-infos">
            <h3>${this.title}</h3>
            <div class="actions">
                <button class="watch-details" data-movie-id="${this.id}">watch details</button>
            </div>
        </div>`;
    };
}