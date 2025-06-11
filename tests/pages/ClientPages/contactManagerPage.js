import { methods } from "../../utils/methods";
import { ClientOnBoardingPage } from "./ClientOnBoardingPage";

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

    async enterName(){
        await this.page.waitForTimeout(1000);
        await this.name.fill((await methods.fakerData()).lastName);
    }

    async enterEmail(){
        await this.page.waitForTimeout(1000);
        const email = await methods.generateEmail();
        await methods.fillData(this.in_email,email);   
    }

    async enterPhone(){
        const phone = (await methods.fakerData()).phone;
        await this.phone.fill(phone);
    }

    async uploadImage(){
        await methods.uploadFile(this.page, this.img, this.on._fileInput, "images/images.jpg", "images.jpg", this.on._select);
    }

    async onSaving(){
        await this.btn_save.click();
    }
    async verifyToastMSG(){
        await methods.validateText(this.page,"Contact manager details are updated");
    }
    
}