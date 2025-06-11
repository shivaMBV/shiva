import { LoginPage } from "../pages/ClientPages/LoginPage.js";
import { SignUpPage } from "../pages/CustomerPages/SignUpPage.js";
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

export class PageObjectManager {

    constructor(page){
    this.page = page;
    this.login = new LoginPage(this.page);
    this.customer_signup = new SignUpPage(this.page);
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



}
