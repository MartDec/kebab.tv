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
        <a href="#">
            <h3 movie-id="${this.movieId}">${this.title}</h3>
        </a>
        <a href="#" class="remove-favorite">
            <i class="fas fa-trash"></i>
        </a>`;
        this.setRemoveListener();
    };

    setRemoveListener() {
        const removeBtn = this.element.querySelector('.remove-favorite');
        removeBtn.addEventListener('click', async e => {
            e.preventDefault();
            await this.favorites.remove(this.id, this.title);
            this.favorites.display();
        })
    }
}