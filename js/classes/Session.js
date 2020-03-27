export class Session {
    constructor() {
        this.logged = !(localStorage.getItem('user_id') === null);
        this.sessionActions = document.querySelector('.header-title .actions');

        if (!this.logged) {
            this.sessionActions.querySelectorAll('.not-logged').forEach(item => {
                item.classList.remove('d-none');
            });
        } else {
            this.sessionActions.querySelector('.logged').classList.remove('d-none');
        }
    }

    createSession(userData) {
        this.logged = true;
        this.id = userData.user._id;
        this.email = userData.user.email;
        this.pseudo = userData.user.pseudo;
        this.token = userData.token;

        localStorage.setItem('user_id', this.id);
        localStorage.setItem('user_token', this.token);
        this.sessionActions.querySelectorAll('.not-logged').forEach(item => {
            item.classList.add('d-none');
        });
        this.sessionActions.querySelector('.logged').classList.remove('d-none');
    };

    destroySession() {
        this.logged = false;
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_token');
        this.sessionActions.querySelectorAll('.not-logged').forEach(item => {
            item.classList.remove('d-none');
        });
        this.sessionActions.querySelector('.logged').classList.add('d-none');
    }
}