import { test } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
import userData from "../../../Test_data/userDetails.json";

test("Project investmet test", async ({page})=>{
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    const customDash = manager.getCustomerDashboard();
    const add = manager.getaddProject();
    const properties = manager.getProperties();
    
    await login.loginUser(userData.clientDetails.email, userData.clientDetails.pin);
    await customDash.verify_dashboard();
    if(customDash.btn_exploreProperties.isVisible()){
        await customDash.btn_exploreProperties.click();
        
    }


});