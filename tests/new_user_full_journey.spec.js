import { test } from "@playwright/test"
import { ProductsPage } from "../page-object/ProductPage"
import { NavigationElement } from "../page-object/NavigatorElement"
import { CheckoutPage } from "../page-object/CheckoutPage"
import { LoginPage } from "../page-object/LoginPage"
import { RegisterPage } from "../page-object/RegisterPage";
import {v4 as uuidv4 } from "uuid";
import { DeliveryDetailsPage } from "../page-object/DeliveryDetailsPage"
import { deliveryDetails as userAdress } from "./../data/deliveryDetails"
import { PaymentPage } from "../page-object/PaymentPage"
import { paymentDetails as paymantDetails } from "./../data/paymentDetails"



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

    const registerPage = new RegisterPage(page);
    const email = uuidv4() + '@gmail.com';
    const password = uuidv4();
    await registerPage.signUpAsNewUser(email, password);
    const deliveryDetailsPage = new DeliveryDetailsPage(page);
    await deliveryDetailsPage.fillDetails(userAdress);
    await deliveryDetailsPage.saveDetails();
    await deliveryDetailsPage.continueToPayment();

    const paymentPage = new PaymentPage(page);
    await paymentPage.activateDiscount();
    await paymentPage.fillPaymentDetails(paymantDetails);
    await paymentPage.completePayment();

    }
)

