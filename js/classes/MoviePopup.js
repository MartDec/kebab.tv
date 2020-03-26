export class MoviePopup {
    constructor(movieData) {
        this.id = movieData.id;
        this.poster = movieData.poster_path;
        this.title = movieData.title;
        this.overview = movieData.overview;
        this.releaseDate = movieData.release_date;
        this.posterUrl = 'https://image.tmdb.org/t/p/w500';
    };

    display() {
        let element = this._createElement();
        document.body.appendChild(element);
        console.log(element);
        this.close(element);
    };

    close(element) {
        let closeBtn = element.querySelector('.actions .close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(element);
        });
    }

    _createElement() {
        let element = document.createElement('div');
        element.setAttribute('id', 'movie-details-wrapper');

        let poster = this.poster !== null
            ? this.posterUrl + this.poster
            : '../../public/img/movie-placeholder.png';

        element.innerHTML = `
        <div id="movie-details">
            <img src="${poster}"/>
            <div>
                <h3>${this.title}</h3>
                <p>${this.overview}</p>
                <p>release date : ${this.releaseDate}</p>
                <div class="actions">
                    <button class="add-favorite" data-movie-id="${this.id}" data-movie-title="${this.title}">add to favorite</button>
                    <button class="close">close</button>
                </div>
            </div>
        </div>`;

        return element;
    }
}