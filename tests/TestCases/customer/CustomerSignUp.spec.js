import { test } from "@playwright/test";
import{ PageObjectManager } from "../../utils/PageObjectManager";
import { methods } from "../../utils/methods";
const path = require('path');
import fs from "fs";
const userDetailsPath = path.resolve(__dirname, "../../../Test_data/userDetails.json"); //details save in this directory
import userData from "../../../Test_data/userDetails.json";


test("Registration Test", async({ page })=>{
     const manager = new PageObjectManager(page);
     const signUp = manager.getCustomerSignUpPage();
     await signUp.navigatingURL();
     await signUp.clickOnSignup();

     let userDetail = JSON.parse(fs.readFileSync(userDetailsPath, "utf-8"));

     if(userData.registration_loginType === "email"){
          const FN = await signUp.firstName();
          const LN = await signUp.lastName();
          const EMAIL = await signUp.userEmail();
          await methods.fillData(signUp.in_firstName, FN);
          await methods.fillData(signUp.in_lastName, LN);
          await methods.fillData(signUp.in_email, EMAIL);
          await methods.waitFor_and_Click(signUp.btn_getOTP);
          userDetail.customerDetails.email = EMAIL;
          fs.writeFileSync(userDetailsPath, JSON.stringify(userDetail, null, 2), "utf-8");
          await signUp.enterOTP(EMAIL);
     }
     else if(userData.registration_loginType === "phone"){
          await page.waitForTimeout(1500);
          await methods.waitFor_and_Click(signUp.btn_phone);
          const FN = await signUp.firstName();
          const LN = await signUp.lastName();
          const PHONE = await signUp.userPhone();
          await methods.fillData(signUp.in_firstName, FN);
          await methods.fillData(signUp.in_lastName, LN);
          await methods.fillData(signUp.in_phone, PHONE);
          await methods.waitFor_and_Click(signUp.btn_getOTP);
          userDetail.customerDetails.phone = PHONE;
          fs.writeFileSync(userDetailsPath, JSON.stringify(userDetail, null, 2), "utf-8");
          await signUp.enterOTP(PHONE);
     }

     await page.pause();
     await signUp.setPin();
     await signUp.verifyToastMsg();
})