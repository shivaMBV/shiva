import {test, expect} from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";

const data = JSON.parse(JSON.stringify(require("../../Test_data/userDetails.json")));

test("login Test", async({page})=>{
    const manager = new PageObjectManager(page);
    const login = manager.getCustomerLoginPage();
    const signup = manager.getCustomerSignUpPage();
    await signup.navigate(data.details.URL);
    await login.loginUser();

});

