import { test } from "@playwright/test"
import { ProductsPage } from "../page-object/ProductPage"
import { NavigationElement } from "../page-object/NavigatorElement"
import { CheckoutPage } from "../page-object/CheckoutPage"
import { LoginPage } from "../page-object/LoginPage"
import { RegisterPage } from "../page-object/RegisterPage"


test.only("New user full e2e test journey", async ({ page }) =>{
    const productPage = new ProductsPage(page);
    const navigationElement = new NavigationElement(page);
    await productPage.visit();
    await productPage.sortByCheapest();
    await productPage.addProductToBusket(0);
    await productPage.addProductToBusket(1);
    await productPage.addProductToBusket(2);
    await navigationElement.goToCheckout();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.removeCheapestItem();
    await checkoutPage.continueToCheckout();

    const loginPage = new LoginPage(page);
    await loginPage.login();

    const registerPage = new RegisterPage();
    registerPage.signUpAsNewUser();

})

