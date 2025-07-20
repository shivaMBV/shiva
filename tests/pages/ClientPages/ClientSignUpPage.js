import { methods } from "../../utils/methods";
import { expect } from "@playwright/test";
import userData from "../../../Test_data/userDetails.json";
import faker from "@playwright/test";
const path = require('path');
import fs from "fs";
const userDetailsPath = path.resolve(__dirname, "../../../Test_data/userDetails.json"); //details save in this directory


export class ClientSignUpPage{

    constructor(page){
        this.page = page;
        this.btn_getStarted = page.locator("button[title='Get Started']");
        this.txt_register = page.getByText("Register here");
        this.btn_phone = page.locator("[title='Phone number']");
        this.in_email = page.getByPlaceholder("Enter your email address");
        this.in_phone = page.getByPlaceholder("Enter your phone number");
        this.btn_getotp = page.getByRole("button",{ name : "Get OTP" });
        this.btn_submit = page.getByRole("button", { name : "Submit" });
        this.ln_resendotp =  page.getByText("Resend OTP");
        this.in_business = page.getByPlaceholder("Enter your business name");
        this.domain = page.getByPlaceholder("Enter your sub domain");
        this.fullDomain = page.locator("span[class='_supportText ']");
        this.btn_register = page.getByRole("button", { name : "Register"});
        this.txt_email_phone = page.locator("[id='35AFUolcYZNCLqATzENknA'] div ~div span");
        this.toastMSG = page.locator("[class='_msgString']");
    }

    async navigateToCxlanding(){
        await this.page.goto("https://cxlanding."+userData.clientDetails.env+".modlix.com/");
    }
    
    async startFromLandingPage(){
        await this.page.waitForTimeout(5000);
        const btn = this.btn_getStarted.nth(1);
        await methods.waitFor_and_Click(btn);  
    }

    async enterEmail(){
        await methods.validateText(this.page,"Register here")
        const {email} = await methods.generateEmail();
        const Email = await methods.getValueOrFallback(userData.clientDetails.email,email);
        await this.page.waitForTimeout(1000);
        await methods.fillData(this.in_email,Email);
        await this.btn_getotp.click();
        return Email;    
    }

    async enterPhone(){
        await methods.validateText(this.page,"Register here");
        await methods.waitFor_and_Click(this.btn_phone);
        const PHONE = (await methods.fakerData()).phone;
        const Phone = await methods.getValueOrFallback(userData.clientDetails.phone,PHONE);
        await this.page.waitForTimeout(1000);
        await methods.fillData(this.in_phone,Phone);
        await this.btn_getotp.click();
        this.phone = Phone;
        return Phone;
    }

    async verifyOTP(Email){
        await methods.validateText(this.page,"Enter your OTP");
        const actual = await this.txt_email_phone.textContent();
        const mobile = `+91${this.phone}`;
        if(actual === Email  || actual === mobile){ 
            await methods.enterCode(this.page,"458795");
            await expect(this.ln_resendotp).toBeVisible();
            await this.btn_submit.click();   
        }else{
            console.log("Error : EMAIL OR PHONE IS NOT MATCHING");
        }
    }

    async setPin(){
        await methods.validateText(this.page, "Set your PIN");
        await methods.enterCode(this.page, userData.clientDetails.pin);
        await this.btn_submit.click();
        await methods.toastMessage(this.page, "PIN Generated Successfully");
    }
    
    async enterBusinessDetails(){
        await this.page.waitForTimeout(3000);
        const Domain  = (await methods.fakerData()).company;
        const DOMAIN = await methods.getValueOrFallback(userData.clientDetails.domain,Domain);
        await this.in_business.fill(DOMAIN);
        await this.in_phone.fill((await methods.fakerData()).phone);
        await methods.fillData(this.domain,DOMAIN);
        const expectedDomain = (DOMAIN+"."+userData.clientDetails.env+".modlix.com");
        const actualDomain = await this.fullDomain.textContent();
        expect(actualDomain).toEqual(expectedDomain);
        await this.btn_register.click();
        return DOMAIN;
    }

    async verifyURL(DOMAIN){
        await methods.validateText(this.page, "Login here");
        const url = await this.page.url();
        expect(url).toContain(await methods.getClientUrl(DOMAIN,"login"));
    }

    async existingMSG(){
        if(await methods.toastMessage(this.page, "Email already exists")){
           await this.in_email.fill("");
           const {email} = await methods.generateEmail();
           await this.in_email.fill(email);
           const userDetails = JSON.parse(fs.readFileSync(userDetailsPath, "utf-8"));
           userDetails.clientDetails.email = email;
           fs.writeFileSync(userDetailsPath, JSON.stringify(userDetails, null, 2), "utf-8");
           await this.btn_getotp.click();
        }
        else if(await methods.toastMessage(this.page, "Phone number already exists")){
           await this.in_phone.fill("");
           const Phone = (await methods.fakerData()).phone;
           await this.in_phone.fill(Phone);
           await this.btn_getotp.click();
        }
    }
}



        