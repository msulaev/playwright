import { test } from "@playwright/test"
import { ProductsPage } from "../page-object/ProductPage"

test.only("New user full e2e test journey", async ({ page }) =>{
    const productPage = new ProductsPage(page);
    await productPage.visit();
    await productPage.addProductToBusket(0);
    await productPage.addProductToBusket(1);
    await productPage.addProductToBusket(2);
    await page.pause();
})

