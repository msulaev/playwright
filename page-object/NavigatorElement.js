export class NavigationElement {
    constructor(page){
        this.page = page;
        this.basketCounter = page.locator('[data-qa=header-basket-count]');
        this.checkoutLink = page.locator('[data-qa=desktop-nav-link]').filter({ hasText: 'Checkout' });
    }

    async getBasketCounter() {
        const text = await this.basketCounter.innerText();
        return parseInt(text,10);
    }

    async goToCheckout() {
        await this.checkoutLink.click();
        await this.page.waitForURL("http://localhost:2221/basket");
    }

}