import { test } from "@playwright/test";
import{ PageObjectManager } from "../../utils/PageObjectManager";
const path = require('path');
import fs from "fs";
const userDetailsPath = path.resolve(__dirname, "../../../Test_data/userDetails.json"); //details save in this directory
import userData from "../../../Test_data/userDetails.json"

test("Registration Test", async({page})=>{
     const manager = new PageObjectManager(page);
     const signUp = manager.getCustomerSignUpPage();
     await signUp.navigatingURL();
     await signUp.clickOnSignup();
     const email = await signUp.enterUserDetails();

     const userDetails = JSON.parse(fs.readFileSync(userDetailsPath, "utf-8"));
     userDetails.customerDetails.email = email;
     fs.writeFileSync(userDetailsPath, JSON.stringify(userDetails, null, 2), "utf-8");

     await signUp.enterOTP(email);
     await signUp.setPin();
     await signUp.verifyToastMsg();
})