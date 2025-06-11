import { faker } from "@faker-js/faker";
import { methods } from "../../utils/methods";
import { expect } from "@playwright/test";
import userData from "../../../Test_data/userDetails.json";


export class ClientSignUpPage{

    constructor(page){
        this.page = page;
        this.btn_getStarted = page.locator("button[title='Get Started']");
        this.txt_register = page.getByText("Register here");
        this.in_email = page.getByPlaceholder("Enter your email address");
        this.btn_getotp = page.getByRole("button",{ name : "Get OTP" });
        this.txt_email = page.locator("[id='35AFUolcYZNCLqATzENknA'] div ~div span");
        this.btn_submit = page.getByRole("button", { name : "Submit" });
        this.ln_resenotp =  page.getByText("Resend OTP");
        this.in_business = page.getByPlaceholder("Enter your business name");
        this.phone = page.locator("input#t_4UR21KuCPqhC14Pke6XJ4F");
        this.domain = page.getByPlaceholder("Enter your sub domain");
        this.fullDomain = page.locator("span[class='_supportText ']");
        this.btn_register = page.getByRole("button", { name : "Register"});
    }

    async navigateToCxlanding(){
        await this.page.goto("https://cxlanding."+userData.clientDetails.env+".modlix.com/");
    }
    
    async startFromLandingPage(){
        await this.page.waitForTimeout(4000);
        const btn = this.btn_getStarted.nth(1);
        await methods.waitFor_and_Click(btn);  
    }

    async enterEmail(){
        await methods.validateText(this.page,"Register here")
        const email = await methods.generateEmail();
        await methods.fillData(this.in_email,email);
        await this.btn_getotp.click();
        return email;
        
    }
    async verifyOTP(email){
        await methods.validateText(this.page,"Enter your OTP");
        const actual = await this.txt_email.textContent();
        if(actual === email){ 
            await methods.enterCode(this.page,"458795");
            await expect(this.ln_resenotp).toBeVisible();
            await this.btn_submit.click();   
        }else{
            console.log("Error : EMAIL IS NOT MATCHING");
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
        const company  = (await methods.fakerData()).company;
        await this.in_business.fill(company);
        await this.phone.fill((await methods.fakerData()).phone);
        await methods.fillData(this.domain,company);
        const expectedDomain = (company+"."+userData.clientDetails.env+".modlix.com");
        const actualDomain = await this.fullDomain.textContent();
        await expect(actualDomain).toEqual(expectedDomain);
        await this.btn_register.click();
        return company;
    }

    async verifyURL(company){
        await methods.validateText(this.page, "Login here");
        const url = await this.page.url();
        await expect(url).toContain(await methods.getClientUrl(company,"login"));
       
    }
}



        