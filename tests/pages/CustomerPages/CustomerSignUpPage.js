import { methods } from "../../utils/methods";
import { expect } from "@playwright/test";
import { LoginPage } from "../ClientPages/LoginPage";

import userData from "../../../Test_data/userDetails.json";

export class CustomerSignUpPage {

    constructor(page) {
        this.page = page;
        this.login = new LoginPage(this.page);
        this.btn_phone = page.locator("[title='Phone number']");
        this.in_firstName = page.getByPlaceholder("Enter first name");
        this.in_lastName = page.getByPlaceholder("Enter Last name");
        this.in_email = page.getByPlaceholder("Enter your email address");
        this.in_phone = page.getByPlaceholder("Enter your phone number");
        this.btn_getOTP = page.getByRole('button', { name: 'Get OTP' });
        this.txt_email = page.locator("[id='35AFUolcYZNCLqATzENknA'] div ~div span");
        this.btn_submit = page.getByRole("button", { name: "Submit" });
        this.ln_terms = page.getByRole("link", { name: "Terms of Service" });
        this.ln_privacy = page.getByRole("link", { name: "Privacy Policy" });
        this.btn_google = page.locator("[title='Continue with Google']");
        this.ln_resendOTP = page.getByText("Resend OTP");
        this.verifyEmail = page.locator("//div[@id='35AFUolcYZNCLqATzENknA']/div[2]");
        this.toastMsg = page.locator("//div[@class='_msgString']");
    }

    async navigatingURL(){
        await this.page.goto(await methods.getClientUrl(userData.clientDetails.domain,"login"));
    }

    async clickOnSignup(){
        await methods.waitFor_and_Click(await this.login.lT_signup);
    }

    async firstName(){
        const {firstName,lastName,email} = await methods.generateEmail();
        const FN = await methods.getValueOrFallback(userData.customerDetails.firstName,firstName);
        return FN;
    }

    async lastName(){
        const {lastName} = await methods.generateEmail();
        const LN = await methods.getValueOrFallback(userData.customerDetails.lastName,lastName);
        return LN;
    }

    async userEmail(){
        const {email} = await methods.generateEmail();
        const EMAIL = await methods.getValueOrFallback(userData.customerDetails.email,email);
        //this.email = EMAIL;
        return EMAIL;
    }

    async userPhone(){
        const Phone = (await methods.fakerData()).phone;
        const PHONE = await methods.getValueOrFallback(userData.customerDetails.phone,Phone);
        this.phone = PHONE;
        return PHONE;
    }

    async enterOTP(EMAIL){
        await methods.validateText(this.page,"We have sent an OTP on");
        const actual = await this.txt_email.textContent();
        const mobile = `+91${this.phone}`;
        if(actual === EMAIL || actual === mobile){
            await methods.enterCode(this.page,"458795");
            await expect(this.ln_resendOTP).toBeVisible();
            await this.btn_submit.click();
        }
        else{
            console.log("Error : EMAIL OR PHONE IS NOT MATCHING");
        }
    }

    async setPin(){
        await methods.validateText(this.page,"Set Up Your Secure");
        await methods.enterCode(this.page,userData.customerDetails.pin);
        await this.btn_submit.click();
    }

    async verifyToastMsg(){
        const toastLocator = this.toastMsg;
        await expect(toastLocator).toHaveCount(userData.toast.expectedMessages.length);
        const actualMessages = await toastLocator.allTextContents();
          
        await toastLocator.first().waitFor({ state: "visible", timeout: 5000 });
        for (const expectedMessage of userData.toast.expectedMessages) {
            expect(actualMessages).toContain(expectedMessage);
            console.log(expectedMessage);
        }
    }
}
