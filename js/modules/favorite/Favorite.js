import { MovieList } from "../movie/MovieList.js";
import { MoviePopup } from "../movie/MoviePopup.js";

export class Favorite {
    constructor(data, favorites) {
        this.id = data._id;
        this.movieId = data.id;
        this.title = data.title;
        this.favorites = favorites;
        this.element = null;

        this.createElement();
    };

    createElement() {
        this.element = document.createElement('div');
        this.element.classList.add('single-favorite');
        this.element.innerHTML = `
        <a href="#" class="show-details">
            <h3 movie-id="${this.movieId}">${this.title}</h3>
        </a>
        <a href="#" class="remove-favorite">
            <i class="fas fa-trash"></i>
        </a>`;
        this.setShowDetailsListener();
        this.setRemoveListener();
    };

    async showDetails() {
        const movie = await new MovieList().getMovie(this.movieId);
        new MoviePopup(
            movie,
            {
                type: 'favorite',
                favoriteId: this.id
            }
        ).display();
    }

    setRemoveListener() {
        const removeBtn = this.element.querySelector('.remove-favorite');
        removeBtn.addEventListener('click', async e => {
            e.preventDefault();
            await this.favorites.remove(this.id, this.title);
            this.favorites.display();
        })
    };

    setShowDetailsListener() {
        const showBtn = this.element.querySelector('.show-details');
        showBtn.addEventListener('click', e => {
            e.preventDefault();
            this.showDetails();
        });
    }
}