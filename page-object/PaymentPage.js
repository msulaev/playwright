export class PaymentPage { // work with iframe
    constructor(page){
        this.page = page;
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-test="discount-code]');
        this.discountInput = page.getByPlaceholder('Discount code'); 
        this.activateDiscountBtn = page.locator('[data-qa="submit-discount-button]');

    }

    async activateDiscount() { 
        await this.page.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.discountInput.waitFor();
     //   await this.discountInput.fill(code);
     //   await expect(this.discountInput).toHaveValue(code);
        await this.discountInput.focus();
        await this.discountInput.type(code, {delay: 1000});
        expect(await this.discountInput.inputValue()).toBe(code);
        await this.activateDiscountBtn.waitFor();
        await this.activateDiscountBtn.click();
    }
}