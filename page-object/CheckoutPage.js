import { expect } from "@playwright/test";

export class CheckoutPage {
constructor(page) {
        this.page = page;
        this.basketCards = page.locator('[data-qa=basket-card]');
        this.basketItamPrice = page.locator('[data-qa=basket-item-price]');
        this.removeBtn = page.locator('[data-qa=basket-card-remove-item]');
        this.continueBtn = page.locator('[data-qa=continue-to-checkout]');
    }

    async removeCheapestItem() {
        await this.basketCards.first().waitFor();
        await this.basketItamPrice.first().waitFor();
        const itemsBeforeRemoval = await this.basketCards.count();
        await this.basketItamPrice.first().waitFor();
        const allPriceTexts = await this.basketItamPrice.allInnerTexts();
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace("$", ""); // '499$' -> '499'
            return parseInt(withoutDollarSign, 10)
        });
        const smallestPrice = Math.min(justNumbers);
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice);
        const specificRemoveButton = this.removeBtn.nth(smallestPriceIdx);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
    }

    async continueToCheckout() {
       await this.continueBtn.waitFor();
       await this.continueBtn.click();
       await this.page.waitForURL(/\/login/, {timeout: 3000});

    }
}