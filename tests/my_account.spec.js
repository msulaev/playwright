import {test} from "@playwright/test";
import {MyAccountPage} from "../page-object/MyAccountPage";
import {getLoginToken} from "../utils/login";

test("Basic test with cookie", async ({page}) => {
    const loginToken = await getLoginToken();
    console.log(loginToken);
    const myAccount = new MyAccountPage(page);
    await myAccount.visit();
    
});