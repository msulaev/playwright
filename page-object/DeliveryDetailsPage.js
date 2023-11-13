import { expect } from "@playwright/test";

export class DeliveryDetailsPage{
    constructor(page){
        this.page = page;
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]');
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
        this.streetInput = page.locator('[data-qa="delivery-address-street"]');
        this.postCodeInput = page.locator('[data-qa=delivery-postcode]');
        this.cityInput = page.locator('[data-qa="delivery-city"]');
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
        this.saveAddressBtn = page.getByRole('button', { name: 'Save address for next time' });
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]');
        this.savedAdressFirstName = page.locator('[data-qa=saved-address-firstName]');
        this.savedAdressLastName = page.locator('[data-qa=saved-address-lastName]')
        this.savedAdressStreet = page.locator('[data-qa=saved-address-street]');
        this.savedAddressPostcode = page.locator('[data-qa=saved-address-postcode]');
        this.savedAdressCity = page.locator('[data-qa=saved-address-city]');
        this.savedAdressCountry = page.locator('[data-qa=saved-address-country]');
        this.continueToPaymentBtn = page.locator('[data-qa=continue-to-payment-button]');
    }

    async fillDetails(userAdress) {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(userAdress.firstName);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(userAdress.lastName);
        await this.streetInput.waitFor();
        await this.streetInput.fill(userAdress.street);
        await this.postCodeInput.waitFor();
        await this.postCodeInput.fill(userAdress.postCode);
        await this.cityInput.waitFor();
        await this.cityInput.fill(userAdress.city);
        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption({value: userAdress.country});
    }

    async saveDetails() {
        const addressCountBeforeSaving = await this.saveAddressContainer.count();
        await this.saveAddressBtn.waitFor();
        await this.saveAddressBtn.click();
        await this.saveAddressContainer.waitFor();
        await expect(this.saveAddressContainer).toHaveCount(addressCountBeforeSaving + 1);
        await this.savedAdressFirstName.first().waitFor();
        expect(await this.savedAdressFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue());
        expect(await this.savedAdressLastName.first().innerText()).toBe(await this.lastNameInput.inputValue());
        expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.postCodeInput.inputValue());
        expect(await this.savedAdressStreet.first().innerText()).toBe(await this.streetInput.inputValue());
        expect(await this.savedAdressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue());
        expect(await this.savedAdressCity.first().innerText()).toBe(await this.cityInput.inputValue());
    }

    async continueToPayment() {
        await this.continueToPaymentBtn.waitFor();
        await this.continueToPaymentBtn.click();
        await this.page.waitForURL(/\/payment/, {timeout: 3000})
    }
}