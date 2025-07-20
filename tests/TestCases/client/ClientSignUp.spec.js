import { test } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
const path = require('path');
import fs from "fs";
const userDetailsPath = path.resolve(__dirname, "../../../Test_data/userDetails.json"); //details save in this directory
import userData from "../../../Test_data/userDetails.json";

test("client registration", async ({ page }) => {
  const manager = new PageObjectManager(page);
  const signup = manager.getClientSignUpPage();
  await signup.navigateToCxlanding();
  await signup.startFromLandingPage();

  let userDetails = JSON.parse(fs.readFileSync(userDetailsPath, "utf-8"));

  if(userData.registration_loginType === "email") {
     const Email = await signup.enterEmail();
     userDetails.clientDetails.email = Email;
     fs.writeFileSync(userDetailsPath, JSON.stringify(userDetails, null, 2), "utf-8");
     await signup.verifyOTP(Email); 
  } 
  else if(userData.registration_loginType === "phone") {
    const Phone = await signup.enterPhone();
    userDetails.clientDetails.phone = Phone;
    fs.writeFileSync(userDetailsPath, JSON.stringify(userDetails, null, 2), "utf-8");
    await signup.verifyOTP(Phone);
  }
  await signup.setPin();
  const DOMAIN = await signup.enterBusinessDetails();
  userDetails.clientDetails.domain = DOMAIN;
  await signup.verifyURL(DOMAIN);
  fs.writeFileSync(userDetailsPath, JSON.stringify(userDetails, null, 2), "utf-8");
});