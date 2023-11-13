export class PaymentPage { // work with iframe
    constructor(page){
        this.page = page;
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-test="discount-code]');
        this.discountInput = page.getByPlaceholder('Discount code'); 
        this.activateDiscountBtn = page.locator('[data-qa="submit-discount-button]');
        this.totalValue = page.locator('[data-qa="total-value"]');
        this.discountedValue = page.locator('[data-qa="total-with-discount-value"]');
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]'); 
        this.creditCardOwnerInput = page.getByPlaceholder("Credit card owner");
        this.creditCardNumberInput = page.getByPlaceholder("Credit card number");
        this.creitCardvalidUntilInput = page.getByPlaceholder("Valid until");
        this.creditCardCvcInput = page.getByPlaceholder("Credit Card CVC");
        this.payButton = page.locator('[data-qa="pay-button"]');     
    }

    async activateDiscount() { 
        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountActiveMessage.isVisible()).toBe(false)
        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        await this.discountActiveMessage.waitFor()
        await this.discountedValue.waitFor()
        const discountValueText = await this.discountedValue.innerText() // "345$"
        const discountValueOnlyStringNumber = discountValueText.replace("$", "")
        const discountValueNumber = parseInt(discountValueOnlyStringNumber, 10)

        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText() // "345$"
        const totalValueOnlyStringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)
        expect(discountValueNumber).toBeLessThan(totalValueNumber)
    }

    async fillPaymentDetails(paymentDetails) {
        await this.page.creditCardOwnerInput.waitFor();
        await this.page.creditCardOwnerInput.fill(paymentDetails.owner);
        await this.page.creditCardNumberInput.waitFor();
        await this.page.creditCardNumberInput.fill(paymentDetails.number);
        await this.page.creitCardvalidUntilInput.waitFor();
        await this.page.creitCardvalidUntilInput.fill(paymentDetails.validUntil);
        await this.page.creditCardCvcInput.waitFor();
        await this.page.creditCardCvcInput.fill(paymentDetails.cvc);
    }
    async completePayment() {
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForUrl("**/thank-you", { timeout: 3000 });
    }
}