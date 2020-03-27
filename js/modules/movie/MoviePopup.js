import { Favorites } from "../favorite/Favorites.js";
import { Toast } from "../Toast.js";

export class MoviePopup {
    constructor(movie, details) {
        this.id = movie.id;
        this.title = movie.title;
        this.overview = movie.overview;
        this.releaseDate = movie.releaseDate;
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
            : `<button class="remove-favorite" favorite-id="${this.details.favoriteId}" data-movie-title="${this.title}">remove from favorite</button>`;
        
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
        if (this.details.type === 'list')
            this.setAddFavoriteListener();
        else
            this.setRemoveFavoriteListener();
    };

    setHideListerner() {
        const closeBtn = this.element.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            this.hide();
        });
    };

    setAddFavoriteListener() {
        const favoriteBtn = this.element.querySelector('.add-favorite');
        favoriteBtn.addEventListener('click', async () => {
            const favorites = new Favorites();
            await favorites.add(this.id, this.title);
            this.hide();
        });
    };

    setRemoveFavoriteListener() {
        const favoriteBtn = this.element.querySelector('.remove-favorite');
        favoriteBtn.addEventListener('click', async e => {
            const favoriteId = e.target.getAttribute('favorite-id');
            const favorites = new Favorites();
            await favorites.remove(favoriteId, this.title);
            this.hide();
            favorites.display();
        });
    }
}