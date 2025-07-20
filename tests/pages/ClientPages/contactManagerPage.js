import { methods } from "../../utils/methods";
import { ClientOnBoardingPage } from "./ClientOnBoardingPage";
import plpData from "../../../Test_data/Project_configuration.json"

export class contactManagerPage{
    constructor(page){
        this.page = page;
        this.on = new ClientOnBoardingPage(this.page);
        this.name = page.getByPlaceholder("Enter Name");
        this.in_email = page.getByPlaceholder("Enter Email Id");
        this.phone = page.getByPlaceholder("Enter Phone number");
        this.img = page.locator("(//div[@id='4oBZmvuk4nDS7u5nETu3zO']//img)[1]");
        this.toastMSG = page.locator("[class='_msgString']");
        this.btn_save = page.getByRole("button",{name : "Save & Continue"});
    }

    async managerName(){
        const {firstName,lastName,email} = await methods.generateEmail();
        const NAME = await methods.getValueOrFallback(plpData.contactManager.name,firstName);
        await methods.fillData(this.name,NAME);
    }

    async managerEmail(){
        const {firstName,lastName,email} = await methods.generateEmail();
        const EMAIL = await methods.getValueOrFallback(plpData.contactManager.emailID,email);
        await methods.fillData(this.in_email,EMAIL);
    }

    async managerPhone(){
        const phone = (await methods.fakerData()).phone;
        const PHONE = await methods.getValueOrFallback(plpData.contactManager.phoneNumber,phone);
        await methods.fillData(this.phone,PHONE);
    }


    async uploadImage(){
        await methods.uploadFile(this.page, this.img, this.on._fileInput, "images/profile.jpg", "profile.jpg", this.on._select);
    }

    async onSaving(){
        await this.btn_save.click();
    }
    async verifyToastMSG(){
        await methods.validateText(this.page,"Contact manager details are updated");
    }
    
}