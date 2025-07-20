import userData from "../../../Test_data/userDetails.json";
import { methods } from "../../utils/methods";
import { expect } from "@playwright/test";

export class LoginPage{
    
    constructor(page){
        this.page = page;
        this.btn_phone = page.locator("[title='Phone number']");
        this.in_email = page.locator("input#t_48TgEcj5yxsFLcXtNwO3MZ");
        this.in_phone = page.getByPlaceholder("Enter your phone number");
        this.btn_continue = page.getByRole("button",{name : 'Continue'});
        this.btn_submit = page.getByRole("button",{name : "Submit"});
        this.lT_signup = page.locator("[title='SIGNUP']");
    }

    set signupLink(locator){
        this.lT_signup = locator;
    }
    get signupLink(){
        return this.lT_signup;
    }

    async Client_login(){
        await this.page.goto(await methods.getClientUrl(userData.clientDetails.domain,"login"));
        if(userData.registration_loginType === "email"){
            await methods.fillData(this.in_email,userData.clientDetails.email)
        }
        else if(userData.registration_loginType === "phone"){
            await methods.waitFor_and_Click(this.btn_phone);
            await methods.fillData(this.in_phone,userData.clientDetails.phone);
        }
        await methods.waitFor_and_Click(this.btn_continue);
        await methods.validateText(this.page,"Enter your secure");
        await methods.enterCode(this.page,userData.clientDetails.pin);
        await methods.waitFor_and_Click(this.btn_submit);
    }

    async Customer_login(){
        await this.page.goto(await methods.getClientUrl(userData.clientDetails.domain,"login"));
        if(userData.registration_loginType === "email"){
            await methods.fillData(this.in_email,userData.customerDetails.email)
        }
        else if(userData.registration_loginType === "phone"){
            await methods.waitFor_and_Click(this.btn_phone);
            await methods.fillData(this.in_phone,userData.customerDetails.phone);
        }
        await methods.waitFor_and_Click(this.btn_continue);
        await methods.validateText(this.page,"Enter your secure");
        await methods.enterCode(this.page,userData.customerDetails.pin);
        await methods.waitFor_and_Click(this.btn_submit);
    }

     async validateDashboardURL(){
        const expectedURL = await methods.getClientUrl(userData.clientDetails.domain,"dashboard");
        await this.page.waitForURL(expectedURL);
        const actualURL = await this.page.url();
        expect(expectedURL).toEqual(actualURL);
    }
    
    async signupLink(){
        await this.lT_signup.waitFor({ state: 'visible' });
        await this.lT_signup.click();
    }
    
}


