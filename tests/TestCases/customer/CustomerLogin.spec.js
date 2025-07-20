import {test, expect} from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";

test("login Test", async({page})=>{
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    await login.Customer_login();
    await login.validateDashboardURL();
});

