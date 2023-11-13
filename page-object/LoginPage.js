export class LoginPage {
    constructor(page) {
        this.page = page;

        this.loginBtn = page.getByRole('submit', {name:"Login"});
        this.registerBtn = page.locator('[data-qa="go-to-signup-button"]');
    }

    async login(){
        await this.registerBtn.waitFor();
        await this.registerBtn.click();
        await this.page.waitForURL(/\/signup/, {timeout: 3000});
    }
}