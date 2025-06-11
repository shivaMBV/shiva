import { test } from "@playwright/test";
import userData from "../../../Test_data/userDetails.json";
import { PageObjectManager } from "../../utils/PageObjectManager";



test("client login", async({page})=>{
    const manager = new PageObjectManager(page);
    const login = await manager.getLoginPage();
    await login.loginUser(userData.clientDetails.email,userData.clientDetails.pin);
    await login.validateDashboardURL();
    const onboard = await manager.getClientOnBoardPage();
    await onboard.onBoardingPage();
    await onboard.uploadBuilderLogo();
    await onboard.uploadAppLogo();
    await onboard.onboardDetails();
})