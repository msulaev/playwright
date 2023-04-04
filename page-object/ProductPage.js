import { expect  } from "@playwright/test";
import { NavigationElement } from "./NavigatorElement";

export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.addBtn = page.locator('[data-qa=product-button]');
    }

    async visit() {
        await this.page.goto("http://localhost:2221");
    }

    async addProductToBusket(index) {
       const btn = this.addBtn.nth(index);
       const navigationElement = new NavigationElement(this.page);
       await btn.waitFor();
       await expect(btn).toHaveText("Add to Basket");
       const basketCountBefore = await navigationElement.getBasketCounter();
       await btn.click();
       await expect(btn).toHaveText("Remove from Basket");
       const basketCountAfter = await navigationElement.getBasketCounter();
       expect(basketCountAfter).toBeGreaterThan(basketCountBefore);
    }
}