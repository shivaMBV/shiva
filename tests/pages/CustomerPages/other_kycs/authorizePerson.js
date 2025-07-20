import { methods } from "../../../utils/methods";
import { ClientOnBoardingPage } from "../../ClientPages/ClientOnBoardingPage";
import KYCother from "../../../../Test_data/KYCother.json";
import { faker } from "@faker-js/faker"; 

export class authorizePerson{
    constructor(page){
        this.page = page;
        this.on = new ClientOnBoardingPage(this.page);

        //authorize person locators
        this.text = page.locator("[title='Personal Information']");
        this.profileImg = page.locator("[class='_imageButton']");
        this.firstName = page.getByPlaceholder("Enter first name");
        this.lastName = page.getByPlaceholder("Enter last name");
        this.phone = page.getByPlaceholder("Enter number");
        this.email = page.getByPlaceholder("Enter email address");
        this.dob = page.getByPlaceholder("Select date");
        this._gender = page.getByPlaceholder("Select gender");
        this.onSave = page.getByRole("button", { nmae : "Save & Continue" });
    }

    async uploadImg(){
        await methods.uploadFile(this.page, this.profileImg, this.on._fileInput, "images/profile.jpg", "profile.jpg",this.on._select);
    }

    async fillAuthorizePersonDetails(){
        const FN = faker.helpers.arrayElement(KYCother.AuthorizePerson.firstName) 
        await methods.fillData(this.firstName, FN);
        await methods.fillData(this.lastName, KYCother.AuthorizePerson.lastName);

        const mobile = (await methods.fakerData()).phone;
        const Mobile = await methods.getValueOrFallback(KYCother.AuthorizePerson.phoneNumber, mobile);
        await methods.fillData(this.phone, Mobile);

        const {email} = await methods.generateEmail();
        const Email = await methods.getValueOrFallback(KYCother.AuthorizePerson.email, email);
        await methods.fillData(this.email, Email);
        
        await methods.fillData(this.dob,KYCother.AuthorizePerson.DOB);
        await methods.waitFor_and_Click(this.text);

        const Gender = faker.helpers.arrayElement(KYCother.AuthorizePerson.gender);
        await methods.selectDropdownOption(this.page, this._gender, Gender);
    }

    async clickonSave(){
        await methods.waitFor_and_Click(this.onSave);
    }
}