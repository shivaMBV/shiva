import userData from "../../../Test_data/userDetails.json";
import { methods } from "../../utils/methods";
import { expect } from "@playwright/test";


export class LoginPage{
    
    constructor(page){
        this.page = page;
        this.in_email = page.locator("input#t_48TgEcj5yxsFLcXtNwO3MZ");
        this.btn_continue = page.getByRole("button",{name : 'Continue'});
        this.btn_submit = page.getByRole("button",{name : "Submit"});
        this.lT_signup = page.locator("[title='SIGNUP']");
    }

    async loginUser(email,otpCode){
        await this.page.goto(await methods.getClientUrl(userData.clientDetails.company,"login"));
        await methods.fillData(this.in_email,email)
        await this.btn_continue.click();
        await methods.validateText(this.page,"Enter your secure");
        await methods.enterCode(this.page,otpCode);
        await this.btn_submit.click();
     }
     async validateDashboardURL(){
        const expectedURL = await methods.getClientUrl(userData.clientDetails.company,"dashboard");
        await this.page.waitForURL(expectedURL);
        const actualURL = await this.page.url();
        await expect(expectedURL).toEqual(actualURL);
     }
    
    async signupLink(){
        await this.lT_signup.waitFor({ state: 'visible' });
        await this.lT_signup.click();
    }
    
}


