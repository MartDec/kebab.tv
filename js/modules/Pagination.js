export class Pagination {
    constructor(data) {
        this.list = data.list;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;
        this.totalResults = data.totalResults;
        this.element = null;

        this.createElement();
    };

    createElement() {
        this.element = document.createElement('div');
        this.element.setAttribute('id', 'pagination');

        for (let i = 1; i <= this.totalPages; i++) {
            const link = document.createElement('a');
            link.href = i;
            link.innerText = i;
            if (i === +this.currentPage)
                link.classList.add('active');

            this.setNavigationListener(link);
            this.element.append(link);
        }

        this.element.prepend(this.getNavElt('prev'));
        this.element.append(this.getNavElt('next'));
    };

    getNavElt(direction) {
        const element = document.createElement('a');
        element.href = '#';
        element.classList.add(direction);
        element.innerHTML = direction === 'prev' ? '&laquo;' : '&raquo;';
        if ((this.currentPage === this.totalPages && direction === 'next') ||
            (this.currentPage === 1 && direction === 'prev')) {

                element.classList.add('disabled');
            }

        this.setNavigationListener(element);
        return element;
    };

    setNavigationListener(element) {
        element.addEventListener('click', async e => {
            e.preventDefault();

            let page = null;
            switch (e.target.classList[0]) {
                case 'prev':
                    page = await this.list.getPage(this.currentPage - 1);
                    break;

                case 'next':
                    page = await this.list.getPage(this.currentPage + 1);
                    break;

                default:
                    page = await this.list.getPage(element.getAttribute('href'));
                    break;
            }
            page.display();
        });
    }
}