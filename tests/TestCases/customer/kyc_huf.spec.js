import { test, expect } from '@playwright/test';
import {PageObjectManager} from "../../utils/PageObjectManager";

test("kyc trust test", async({page})=>{
    test.setTimeout(100000);
    const manager = new PageObjectManager(page);
    const login = manager.getLoginPage();
    const dash = manager.getCustomershell_dash();
    const manage = manager.getManageAccounts();
    const kycbento = manager.getkycbento();
    const auth = manager.getKYCLLP();
    const llpAddress = manager.getllpaddress();
    const bank = manager.getbankdetails();
    const address = manager.getCompanyAddress();


    await login.Customer_login();
    await dash.clickOn_manage_accounts();
    await manage.clickOn_ManageAccounts();
    await kycbento.clickOn_huf();
    await auth.uploadImg();
    await auth.fillAuthorizePersonDetails();
    await page.waitForTimeout(2000);

    //await auth.clickonSave();
    await page.locator("(//span[text()='Karta Address'])[2]").click();

    await llpAddress.addressDetails();
    await llpAddress.docTypeUpload();

    //await auth.clickonSave();
    await page.locator("(//span[text()='HUF information'])[2]").click();

    await bank.enterOfficeName("huf");
    await bank.panDetails();
    await bank.uploadBoardResolution();
    await bank.bankDetails();
    //await address.finishKyc();
   

    await page.pause();
});