export class MyAccountPage {
    constructor(page) {
        this.page = page;
        this.pageHeading = page.getByRole("heading", {name: "My account"});
    }
    async visit() {
        await this.page.goto("https://localhost:2221/my-account");
    }
    async waitForPageHeading() {
        await this.page.waitForSelector(this.pageHeading);
    }
}