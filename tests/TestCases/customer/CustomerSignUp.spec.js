import {test, expect} from "@playwright/test";
import{ PageObjectManager } from "../../utils/PageObjectManager";

const data = JSON.parse(JSON.stringify(require("../../Test_data/userDetails")));

test("Registration Test", async({page})=>{
     const manager = new PageObjectManager(page);
     const signup = manager.getSignUpPage();
     const login = manager.getLoginPage();
     data.details.email = `cxapp123${data.signup.firstName}@gmail.com`;
     await signup.navigate(data.details.URL);
     await login.signupLink();
     await signup.Register(data.details);
     await signup.verifyToastMsg();
     
})