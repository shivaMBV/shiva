import { test } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";

test("client On board test", async ({page})=>{
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    const on = manager.getClientOnBoardPage();

    await login.Client_login();
    await on.onBoardingPage();
    await on.uploadBuilderLogo();
    await on.uploadAppLogo();
    await on.onboardDetails();
    await on.saveOnBoard();
});