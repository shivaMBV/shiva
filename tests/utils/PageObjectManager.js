import { LoginPage } from "../pages/ClientPages/LoginPage.js";
import { ClientSignUpPage } from "../pages/ClientPages/ClientSignUpPage.js";
import { ClientOnBoardingPage } from "../pages/ClientPages/ClientOnBoardingPage.js";
import { ClientDashboard } from "../pages/ClientPages/ClientDashboardPage.js";
import { addProject } from "../pages/ClientPages/addProjectPage.js";
import { ProjectBentogrids } from "../pages/ClientPages/projectBentogridsPage.js";
import { Plp_basicDetailsPage } from "../pages/ClientPages/Plp_basicDetailsPage.js";
import { Plp_overviewPage } from "../pages/ClientPages/Plp_overviewPage.js";
import { Plp_tenantPage } from "../pages/ClientPages/Plp_tenantPage.js";
import { Plp_leaseOverviewPage } from "../pages/ClientPages/Plp_leaseOverviewPage.js";
import { Plp_documentPage } from "../pages/ClientPages/Plp_documentPage.js";
import { Plp_galleryPage } from "../pages/ClientPages/Plp_galleryPage.js";
import { contactManagerPage } from "../pages/ClientPages/contactManagerPage.js";
import { ScheduleCallPage } from "../pages/ClientPages/scheduleCallPage.js";
import { inventorymanagement } from "../pages/ClientPages/inventorymanagementPage.js";
import { uploadConfiguration } from "../pages/ClientPages/uploadConfiguration.js";
import { inventorySetupPage } from "../pages/ClientPages/inventorySetupPage.js";

import { CustomerSignUpPage } from "../pages/CustomerPages/CustomerSignUpPage.js";
import { customerShell_DashboardPage } from "../pages/CustomerPages/customerShell_DashboardPage.js";
import { PropertiesPage } from "../pages/CustomerPages/PropertiesPage.js";
import { ManageAccountsPage } from "../pages/CustomerPages/manageAccountsPage.js";
import { kycBentogridsPage } from "../pages/CustomerPages/kycBentogridsPage.js";
import { authorizePerson } from "../pages/CustomerPages/other_kycs/authorizePerson.js";
import { authorizePersonAddress } from "../pages/CustomerPages/other_kycs/authorizePersonAddress.js";
import { bankDetails } from "../pages/CustomerPages/other_kycs/bankDetails.js";
import { companyAddress } from "../pages/CustomerPages/other_kycs/companyAddress.js";

import { kyc_personalDetailsPage } from "../pages/CustomerPages/KYC Individual/kyc_personalDetailsPage.js";
import { kyc_professionalDetailsPage } from "../pages/CustomerPages/KYC Individual/kyc_professionalDetails.js"
import { kyc_pan_bankDetailsPage } from "../pages/CustomerPages/KYC Individual/kyc_pan&bankDetailsPage.js"
import { kyc_authorizedPersonDetailsPage } from "../pages/CustomerPages/KYC Individual/kyc_authorizedPersonDetailsPage.js"

export class PageObjectManager {

    constructor(page){
    this.page = page;
    this.login = new LoginPage(this.page);
    this.customer_signup = new CustomerSignUpPage(this.page);
    this.client_signup = new ClientSignUpPage(this.page);
    this.clientOnBoard  = new ClientOnBoardingPage(this.page);
    this.clientDash = new ClientDashboard(this.page);
    this.project = new addProject(this.page);
    this.ProjectBento = new ProjectBentogrids(this.page);
    this.plpbasic = new Plp_basicDetailsPage(this.page);
    this.plpoverview = new Plp_overviewPage(this.page);
    this.plpTenant = new Plp_tenantPage(this.page);
    this.plpleaseOverview = new Plp_leaseOverviewPage(this.page);
    this.document = new Plp_documentPage(this.page);
    this.gallery = new Plp_galleryPage(this.page);
    this.contact = new contactManagerPage(this.page);
    this.schedule = new ScheduleCallPage(this.page);
    this.inventory = new inventorymanagement(this.page);
    this.uploadConfig = new uploadConfiguration(this.page);
    this.inventroySetUp = new inventorySetupPage(this.page);

    this.customshell_dash = new customerShell_DashboardPage(this.page);
    this.properties = new PropertiesPage(this.page);
    this.basicdetails = new kyc_personalDetailsPage(this.page);
    this.manage = new ManageAccountsPage(this.page);
    this.kycbento =  new kycBentogridsPage(this.page);
    this.llp = new authorizePerson(this.page);
    this.llpAddress = new authorizePersonAddress(this.page);
    this.bank = new bankDetails(this.page);
    this.companyaddress = new companyAddress(this.page);
    this.professional = new kyc_professionalDetailsPage(this.page);
    this.panDetails = new kyc_pan_bankDetailsPage(this.page);
    this.authorize = new kyc_authorizedPersonDetailsPage(this.page);

}

    getLoginPage(){
        return this.login;
    }
    getCustomerSignUpPage(){
        return this.customer_signup;
    }
    getClientSignUpPage(){
        return this.client_signup;
    }
    getClientOnBoardPage(){
        return this.clientOnBoard;
    }
    getClientDashboard(){
        return this.clientDash;
    }
    getaddProject(){
        return this.project;
    }
    getProjectBentos(){
       return this.ProjectBento;
    }
    getPlpConfig(){
        return this.plpbasic;
    }
    getPlpOverview(){
        return this.plpoverview;
    }
    getplpTenant(){
    return this.plpTenant;
    }
    getplpleaseOverview(){
        return this.plpleaseOverview;
    }
    getplpDocument(){
        return this.document;
    }
    getplpGallery(){
        return this.gallery;
    }
    getContactManager(){
        return this.contact;
    }
    getScheduleCall(){
        return this.schedule;
    }
    getInventoryManagement(){
        return this.inventory;
    }
    getUploadConfig(){
        return this.uploadConfig;
    }
    getCustomershell_dash(){
        return this.customshell_dash;
    }
    getProperties(){
        return this.properties;
    }
    getbasicDetails(){
        return this.basicdetails;
    }
    getManageAccounts(){
        return this.manage;
    }
    getkycbento(){
        return this.kycbento;
    }
    getKYCLLP(){
        return this.llp;
    }
    getllpaddress(){
        return this.llpAddress;
    }
    getbankdetails(){
        return this.bank;
    }
    getCompanyAddress(){
        return this.companyaddress;
    }
    getInventroySetup(){
        return this.inventroySetUp;
    }
    getProfessionalDetails(){
        return this.professional;
    }
    getPanDetails(){
        return this.panDetails;
    }
    getAuthorizePerson(){
        return this.authorize;
    }
}
