export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('E-Mail');
        this.passwordInput = page.getByPlaceholder('Password');
        this.registerBtn = page.getByRole('button', { name: 'Register'});

    }

    async signUpAsNewUser(email, password) {
        await this.emailInput.waitFor();
       // const email = uuidv4() + '@gmail.com';
       // const pwd = uuidv4();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.registerBtn.waitFor();
        await this.registerBtn.click();
    }
}