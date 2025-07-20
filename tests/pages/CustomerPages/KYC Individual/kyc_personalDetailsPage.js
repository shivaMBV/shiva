import { methods } from "../../../utils/methods";
import { kycMethods } from "../../../utils/kycMethods";
import { ClientOnBoardingPage } from "../../ClientPages/ClientOnBoardingPage";
import userData from "../../../../Test_data/userDetails.json";
import kycIndividual from "../../../../Test_data/KYC.json";
import { faker } from "@faker-js/faker";

export class kyc_personalDetailsPage{

    constructor(page){
        this.page = page;
        this.on = new ClientOnBoardingPage(this.page);
        this.img_upload = page.locator("[class='_imageButton']");
        this.relation = page.locator("[placeholder='Select']");
        this.relationDD = page.locator("//div[@class='_validationMessages _floatingMessages']/following-sibling::div");
        this.firstName = page.getByPlaceholder("Enter first name");
        this.middleName = page.getByPlaceholder("Enter middle name");
        this.lastName = page.getByPlaceholder("Enter last name");
        this.email = page.getByPlaceholder("Enter email address");
        this.btn_verify = page.getByRole("button", { name : "Verify" });
        this.phoneNumber = page.getByPlaceholder("Enter number");
        this.nationality = page.locator("[id='1hYLBHGGUkq5TFAu7pHLf1']");
        this.nationalityDD = page.locator("[class='_dropdownContainer _atBottom']");
        this.DDsearch = page.locator("[class='_dropdownSearchBox']");
        this.DDlabel = page.locator("[class='_dropdownItem   _nextToOption'] label");
        this.DOB = page.getByPlaceholder("Select date");
        this.residential = page.getByPlaceholder("Select residential");
        this.gender_ = page.getByPlaceholder("Select gender");
        this.martialStatus = page.getByPlaceholder("Select status");
        this.relativeName = page.getByPlaceholder("Enter relative name");
        this.selectRelation = page.getByPlaceholder("Select relation");
        this.aadharUpload = page.locator("//div[@id='4zMZZecurgc5ONqIs00idf']//label");
        this.input_aadhar = page.getByPlaceholder("Enter aadhar number");
        this.passportUpload = page.locator("//div[@id='2XkhfN1nPgqspFQTWovyzI']//label");
        this.input_passport = page.getByPlaceholder("Enter passport number");

        //current Address
        this.selectAddress = page.getByPlaceholder("Select your locatio");
        this.house = page.getByPlaceholder("Enter House / Flat / Floor no.");
        this.selectLocality = page.getByPlaceholder("Enter your locality");
        this.selectPincode = page.getByPlaceholder("Enter pincode");
        this.selectState = page.getByPlaceholder("Enter state");
        this.selectAddressValue = page.locator("div[class='comp compArrayRepeater _SINGLECOLUMNLAYOUT'] div");
        this.checkbox = page.locator("[role='checkbox']");
        this.save = page.getByRole("button", { name : "Save & Continue" });

        //communication address
        this.input_com_location = page.locator("//div[@id='4M63gbA0W1DGweGNN2n5ly']//input[@placeholder='Select your location']");
        this.input_com_flat = page.locator("//div[@id='4M63gbA0W1DGweGNN2n5ly']//input[@placeholder='Enter House / Flat / Floor no.']");
        this.input_com_locality = page.locator("//div[@id='4M63gbA0W1DGweGNN2n5ly']//input[@placeholder='Enter your locality']");

        //overseas address
        this.input_os_location = page.locator("//div[@id='5gyabn3qL5qZ4jO0MSWPJy']//input[@placeholder='Select your location']");
        this.input_os_flat = page.locator("//div[@id='5gyabn3qL5qZ4jO0MSWPJy']//input[@placeholder='Enter House / Flat / Floor no.']");
        this.input_os_locality = page.locator("//div[@id='5gyabn3qL5qZ4jO0MSWPJy']//input[@placeholder='Enter your locality']");
        this.input_os_pincode = page.locator("//div[@id='5gyabn3qL5qZ4jO0MSWPJy']//input[@placeholder='Enter pincode']");
        this.inptut_os_stae = page.locator("//div[@id='5gyabn3qL5qZ4jO0MSWPJy']//input[@placeholder='Enter state']");
        this.input_os_city = page.locator("//div[@id='5gyabn3qL5qZ4jO0MSWPJy']//input[@placeholder='Enter city']");

        //toast message locator
        this.toastMSG = page.locator("[class='_msgString']");
        this.tickIcon = page.locator("//div//div[2]//div[2][@class='_rightSection1']//div[2]");
    }

    async uploadProfileImage(){
        await methods.uploadFile(this.page, this.img_upload, this.on._fileInput, "images/profile.jpg", "profile.jpg", this.on._select);
    }

    async femaleName(){
        const firstName_F = faker.helpers.arrayElement(kycIndividual.KYC.individual.basicDetails.firstName.Female);
        const lastName_F = faker.helpers.arrayElement(kycIndividual.KYC.individual.basicDetails.lastName);
        await methods.fillData(this.firstName,firstName_F);
        await methods.fillData(this.lastName,lastName_F);
        await methods.selectDropdownOption(this.page,this.gender_,"Female");
    }

    async maleName(){
        const firstName_M = faker.helpers.arrayElement(kycIndividual.KYC.individual.basicDetails.firstName.Male);
        const lastName_M = faker.helpers.arrayElement(kycIndividual.KYC.individual.basicDetails.lastName);
        await methods.fillData(this.firstName,firstName_M);
        await methods.fillData(this.lastName,lastName_M);
        await methods.selectDropdownOption(this.page,this.gender_,"Male");
    }

    async select_Relation(){
        if(await this.relation.getAttribute("value") === "Self"){
            const emailValue = await this.email.inputValue();
            const phoneValue = await this.phoneNumber.inputValue();
            if(!emailValue){
                await this.email.fill(userData.customerDetails.email);
                await kycMethods.veryify_Email_phone_inKYC(this.page, userData.customerDetails.email);
            }
            else if(!phoneValue){
                await this.phoneNumber.fill(userData.customerDetails.phone);
                const PhoneNumber = "+91"+userData.customerDetails.phone;
                await kycMethods.veryify_Email_phone_inKYC(this.page,PhoneNumber);
            }
        }
        else if(!await this.relation.getAttribute("value")){
            const kycRelations = faker.helpers.arrayElement(kycIndividual.KYC.individual.basicDetails.selectRealtion);
            await methods.selectDropdownOption(this.page,this.relation,kycRelations);

            const relationValue = await this.relation.getAttribute("value");
            if(relationValue === "Mother" || relationValue === "Daughter"){
                await this.femaleName();
            }
            else{
                await this.maleName();
            }
            const {email} = await methods.generateEmail();
            await methods.fillData(this.email,email);
            const Phone = (await methods.fakerData()).phone;
            await methods.fillData(this.phoneNumber,Phone);
            await methods.fillData(this.DOB,kycIndividual.KYC.individual.basicDetails.dob);
        } 
    }

    async personalDetails(){
        const nation = faker.helpers.arrayElement(kycIndividual.KYC.individual.basicDetails.nationality);
        await methods.selectDropdownOption(this.page,this.nationality,nation);
        if(await this.nationality.getAttribute("value") === "Indian"){
            const resident = faker.helpers.arrayElement(kycIndividual.KYC.individual.basicDetails.residentialStatus);
            console.log(resident);
            await methods.selectDropdownOption(this.page,this.residential,resident);
            this.resident = resident;
        }
        else{
            console.log("NRI is selected");
        }
        const martial = faker.helpers.arrayElement(kycIndividual.KYC.individual.basicDetails.martialStatus);
        await methods.selectDropdownOption(this.page, this.martialStatus, martial);
    } 

    async aadharDetails(){
        await methods.uploadFile(this.page, null, this.aadharUpload, "docs/Dummy Aadhar.pdf", null, null);
        await methods.fillData(this.input_aadhar,kycIndividual.KYC.individual.basicDetails.aadharNumber);
       }

    async passportDetails(){
        await methods.uploadFile(this.page, null, this.passportUpload, "docs/passport.pdf", null, null);
        await methods.fillData(this.input_passport,kycIndividual.KYC.individual.basicDetails.passportNumber);
    }
    async currentAddress(){
        const add = this.selectAddress.first();
        await methods.fillData(add, kycIndividual.KYC.individual.basicDetails.currentAddress);
        await methods.waitFor_and_Click(this.selectAddressValue.first());
        await this.page.waitForTimeout(2000);
    }

    async overseasAddress(){
        await methods.fillData(this.input_os_location, kycIndividual.KYC.individual.basicDetails.overseasAddress);
        await methods.waitFor_and_Click(this.selectAddressValue.first());
        await this.page.waitForTimeout(2000);
    }

    async sameAsCurrentAddress(){
        await methods.waitFor_and_Click(this.checkbox);
    }

    async onClickSave(){
        await methods.waitFor_and_Click(this.save);
    }
}