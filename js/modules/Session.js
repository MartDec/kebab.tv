export class Session {
    constructor() {
        this.logged = !(localStorage.getItem('user_id') === null);
        this.sessionActions = document.querySelector('.header-title .actions');

        if (!this.logged) {
            this.sessionActions.querySelectorAll('.not-logged').forEach(item => {
                item.classList.remove('d-none');
            });
        } else {
            this.sessionActions.querySelectorAll('.logged').forEach(item => {
                item.classList.remove('d-none');
            });
        }
    }

    create(userData) {
        this.logged = true;
        localStorage.setItem('user_id', userData.user._id);
        localStorage.setItem('user_token', userData.token);

        this.sessionActions.querySelectorAll('.not-logged').forEach(item => {
            item.classList.add('d-none');
        });
        this.sessionActions.querySelectorAll('.logged').forEach(item => {
            item.classList.remove('d-none');
        });
    };

    destroy() {
        this.logged = false;
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_token');
        this.sessionActions.querySelectorAll('.not-logged').forEach(item => {
            item.classList.remove('d-none');
        });
        this.sessionActions.querySelectorAll('.logged').forEach(item => {
            item.classList.add('d-none');
        });
        document.querySelector('#favorite-wrapper').innerHTML = '';
    };
}