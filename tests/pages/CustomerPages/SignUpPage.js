import { enterCode } from "../../utils/methods";
import { validateText } from "../../utils/methods";
import { expect } from "@playwright/test";

const data = JSON.parse(JSON.stringify(require("../../../Test_data//userDetails.json")));

export class SignUpPage {

    constructor(page) {
        this.page = page;
        this.in_firstName = page.getByPlaceholder("Enter first name");
        this.in_lastName = page.getByPlaceholder("Enter Last name");
        this.in_email = page.getByPlaceholder("Enter your email address");
        this.btn_getOTP = page.getByRole('button', { name: 'Get OTP' });
        this.btn_submit = page.getByRole("button", { name: "Submit" });
        this.ln_terms = page.getByRole("link", { name: "Terms of Service" });
        this.ln_privacy = page.getByRole("link", { name: "Privacy Policy" });
        this.btn_google = page.locator("[title='Continue with Google']");
        this.resendOTP = page.getByText("Resend OTP");
        this.verifyEmail = page.locator("//div[@id='35AFUolcYZNCLqATzENknA']/div[2]");
        this.toastMsg = page.locator("//div[@class='_msgString']");

    }

    async navigate(URL){
        await this.page.goto(URL);
    }

    async Register({firstName,lastName,email}) {
        await this.in_firstName.fill(firstName);
        await this.in_lastName.fill(lastName);
        await this.in_email.fill("cxapp123+"+firstName+email);
        await this.btn_getOTP.click();
        await validateText(this.page,"cxapp123+"+firstName+email);
        await enterCode(this.page,"458795");
        await this.btn_submit.click();
        await validateText(this.page,"Set Up Your Secure");
        await enterCode(this.page, "000000");
        await this.btn_submit.click();
    }
    async verifyToastMsg(){
        const toastLocator = this.toastMsg;
        await expect(toastLocator).toHaveCount(data.toast.expectedMessages.length);
        const actualMessages = await toastLocator.allTextContents();
          
        await toastLocator.first().waitFor({ state: "visible", timeout: 5000 });
        for (const expectedMessage of data.toast.expectedMessages) {
            expect(actualMessages).toContain(expectedMessage);
            console.log(expectedMessage);
          }
        };
}
