import { test,expect } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
import { methods } from "../../utils/methods";
const path = require('path');
import fs from "fs";
const userDetailsPath = path.resolve(__dirname, "../../../Test_data/userDetails.json"); //details save in this directory

test("clietn registration", async ({page})=>{
   const manager = new PageObjectManager(page);
   const signup = manager.getClientSignUpPage();
   await signup.navigateToCxlanding();
   await signup.startFromLandingPage();
   const email = await signup.enterEmail();
   //await methods.storeData("../../../Test_data/userDetails.json", { email });

   const userDetails = JSON.parse(fs.readFileSync(userDetailsPath, "utf-8"));
   userDetails.clientDetails.email = email;
   fs.writeFileSync(userDetailsPath, JSON.stringify(userDetails, null, 2), "utf-8");

   await signup.verifyOTP(email);
   await signup.setPin();
   const company = await signup.enterBusinessDetails();
   userDetails.clientDetails.company = company;
   //await methods.storeData("../../../Test_data/userDetails.json", { company });
   await signup.verifyURL(company);
   fs.writeFileSync(userDetailsPath, JSON.stringify(userDetails, null, 2), "utf-8");
})