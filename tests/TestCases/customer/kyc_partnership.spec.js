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
    await kycbento.clickOn_partnership();
    await auth.uploadImg();
    await auth.fillAuthorizePersonDetails();

    await page.waitForTimeout(2000);
    //await auth.clickonSave();
    await page.locator("(//span[text()='Authorize person Address'])[2]").click();
    await llpAddress.addressDetails();
    await llpAddress.checkbox_click();
    await llpAddress.docTypeUpload();

    //await auth.clickonSave();
    await page.locator("(//span[text()='Partnership information'])[2]").click();

    await bank.enterOfficeName("partnership");
    await bank.panDetails();
    await bank.DateOfIncorporation();
    await bank.uploadBoardResolution();
    await bank.bankDetails();

    //await auth.clickonSave();
    await page.locator("(//span[text()='Partnership Address'])[2]").click();

    await llpAddress.addressDetails();
    await address.fillLandmark();
    await address.certificateofIncorporation();
    await address.uploadLLPcertificate();
    await llpAddress.checkbox_click();
    //await address.finishKyc();

    await page.pause();
});