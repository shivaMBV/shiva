import { test } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";



test("client login", async({page})=>{
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    await login.Client_login();
    await login.validateDashboardURL();
})