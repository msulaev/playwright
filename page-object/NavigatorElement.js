export class NavigationElement {
    constructor(page){
        this.page = page;
        this.basketCounter = page.locator('[data-qa=header-basket-count]');
    }

    async getBasketCounter() {
        const text = await this.basketCounter.innerText();
        return parseInt(text,10);
    }

}