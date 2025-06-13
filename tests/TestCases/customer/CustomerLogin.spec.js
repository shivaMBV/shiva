import {test, expect} from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
import userData from "../../../Test_data/userDetails.json";

test("login Test", async({page})=>{
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    await login.loginUser(userData.customerDetails.email,"111111");
    await login.validateDashboardURL();
});

