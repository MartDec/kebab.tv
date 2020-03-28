export class Pagination {
    constructor(data) {
        this.content = data.content;
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
            link.href = '#';
            link.innerText = i;
            if (i === +this.currentPage)
                link.classList.add('active');

            this.element.append(link);
        }

        this.element.prepend(this.getNavElt('prev'));
        this.element.append(this.getNavElt('next'));
    };

    getNavElt(direction) {
        const element = document.createElement('a');
        element.href = '#';
        element.innerHTML = direction === 'prev' ? '&laquo;' : '&raquo;';
        if (+this.currentPage === +this.totalPages)
            element.classList.add('disabled');

        return element;
    }
}