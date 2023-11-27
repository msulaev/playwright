import {test} from "@playwright/test";
import {MyAccountPage} from "../page-object/MyAccountPage";
import {getLoginToken} from "../utils/login";
import { adminDetailes } from "../data/userDetails";

test("Basic test with cookie", async ({page}) => {
    const loginToken = await getLoginToken(adminDetailes.name, adminDetailes.password);
    const myAccount = new MyAccountPage(page);
    await myAccount.visit();
    //page.evaluate() is a method that allows you to run JavaScript code in the context of the page
    await page.evaluate((token) => {
        document.cookie = `token=${token}`;
    }, [loginToken]);
    await myAccount.visit();
    await myAccount.waitForPageHeading();
});