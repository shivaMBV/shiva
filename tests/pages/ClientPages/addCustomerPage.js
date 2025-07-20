import { PageObjectManager } from "../../utils/PageObjectManager";
import { CustomerSignUpPage } from "../CustomerPages/CustomerSignUpPage";
import { methods } from "../../utils/methods";

class addCustomerPage {

    constructor(page){
        this.page = page;
        this.signup = new CustomerSignUpPage(this.page);
        this.firstName = page.getByPlaceholder("Enter first name");
        this.lastName = page.getByPlaceholder("Enter last name");
        this.phoneNumber = page.getByPlaceholder("Enter phone number");
        this.email = page.getByPlaceholder("Enter email");

        this.btn_save = page.getByRole("button", { name : "Save & Continue" });
        this.successMSG = page.locator("[class='_msgString']");

        this.btn_addCustomer = page.getByPlaceholder("button", { name : "Add new customer" });
    }


    async enterFirstName(){
        const FN = await this.signup.firstName();
        await methods.fillData(this.firstName, FN);
    }

    async enterLastName(){
        const LN = await this.signup.lastName();
        await methods.fillData(this.lastName, LN);
    }

    async enterPhoneNumber(){
        const PHONE = await this.signup.userPhone();
        await methods.fillData(this.phoneNumber, PHONE);
    }

    async enterEmail(){
        const EMAIL = await this.signup.userEmail();
        await methods.fillData(this.email, EMAIL);
    }

    async clickOnSave(){
        await methods.waitFor_and_Click(this.btn_save);
    }
}