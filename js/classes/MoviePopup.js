export class MoviePopup {
    constructor(movie, details) {
        this.id = movie.id;
        this.title = movie.title;
        this.overview = movie.overview;
        this.releaseDate = movie.release_date;
        this.poster = movie.poster;
        this.details = details;
        this.element = null;
    };

    display() {
        this.createElement();
        document.body.appendChild(this.element);
    };

    hide() {
        document.body.removeChild(this.element);
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'movie-details-wrapper');
        const disableFav = localStorage.getItem('user_id') ? '' : ' disabled';
        const action = this.details.type === 'list'
            ? `<button class="add-favorite" data-movie-id="${this.id}" data-movie-title="${this.title}"${disableFav}>add to favorite</button>`
            : `<button class="remove-favorite" data-favorite-id="${this.details.favoriteId}" data-movie-title="${this.title}">remove from favorite</button>`;
        
        this.element.innerHTML = `
        <div id="movie-details">
            <img src="${this.poster}"/>
            <div>
                <h3>${this.title}</h3>
                <p>${this.overview}</p>
                <p>release date : ${this.releaseDate}</p>
                <div class="actions">
                    ${action}
                    <button class="close">close</button>
                </div>
            </div>
        </div>`;
        this.setHideListerner();
    };

    setHideListerner() {
        const closeBtn = this.element.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            this.hide();
        });
    }
}