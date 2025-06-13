import { methods } from "../../utils/methods";
import { expect } from "@playwright/test";
import { LoginPage } from "../ClientPages/LoginPage";

import userData from "../../../Test_data/userDetails.json";

export class CustomerSignUpPage {

    constructor(page) {
        this.page = page;
        this.login = new LoginPage(this.page);
        this.in_firstName = page.getByPlaceholder("Enter first name");
        this.in_lastName = page.getByPlaceholder("Enter Last name");
        this.in_email = page.getByPlaceholder("Enter your email address");
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
        await this.page.goto(await methods.getClientUrl(userData.clientDetails.company,"login"));
    }

    async clickOnSignup(){
        await methods.waitFor_and_Click(await this.login.lT_signup);
    }

    async enterUserDetails(){
        const {firstName,lastName,email} = await methods.generateEmail();
        await methods.fillData(this.in_firstName,firstName);
        await methods.fillData(this.in_lastName,lastName);
        await methods.fillData(this.in_email,email);
        await this.btn_getOTP.click();
        return email;
    }

    async enterOTP(email){
        await methods.validateText(this.page,"We have sent an OTP on");
        const actual = await this.txt_email.textContent();
        if(actual === email){
            await methods.enterCode(this.page,"458795");
            await expect(this.ln_resendOTP).toBeVisible();
            await this.btn_submit.click();
        }else{
            console.log("Error : EMAIL IS NOT MATCHING");
        }
    }

    async setPin(){
        await methods.validateText(this.page,"Set Up Your Secure");
        await methods.enterCode(this.page,userData.clientDetails.pin);
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
