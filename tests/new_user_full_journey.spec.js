import { test } from "@playwright/test"
import { ProductsPage } from "../page-object/ProductPage"
import { NavigationElement } from "../page-object/NavigatorElement"

test.only("New user full e2e test journey", async ({ page }) =>{
    const productPage = new ProductsPage(page);
    const navigationElement = new NavigationElement(page);
    await productPage.visit();
    await productPage.addProductToBusket(0);
    await productPage.addProductToBusket(1);
    await productPage.addProductToBusket(2);
    await navigationElement.goToCheckout();

})

