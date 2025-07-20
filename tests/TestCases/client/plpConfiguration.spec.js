import { test } from "@playwright/test";
import { PageObjectManager } from "../../utils/PageObjectManager";
import { methods } from "../../utils/methods";


test("plp configuration", async ({page})=>{
      test.setTimeout(300000);
      const manager = new PageObjectManager(page);
      const login = manager.getLoginPage();
      const add = manager.getaddProject();
      const bento = manager.getProjectBentos();
      const plp = manager.getPlpConfig();
      const over = manager.getPlpOverview();
      const tenant =  manager.getplpTenant();
      const lease = manager.getplpleaseOverview();
      const doc = manager.getplpDocument();
      const gallery = manager.getplpGallery();

      await login.Client_login();
      await methods.waitFor_and_Click(add.btn_config);
      await bento.bentoGrid_plp();
      await plp.addStrategicLogo();
      await plp.addingProjectLocation();
      await plp.addingKeyPoints();
      await plp.progressBar();

      await plp.addingSpecifications();
      await plp.addingCardDetails();
      await plp.addingReeraAndTC();
      //await plp.savingData();
      
      
      await page.waitForTimeout(2000);
      await page.locator("//span[text()=' Overview']").click();
      await over.overview();
      await over.assetOverview();
      await over.assetFeature();
      await over.location();
      await page.waitForTimeout(2000);
      //await plp.savingData();

      await page.locator("//span[text()='Tenant']").click();
      await page.waitForTimeout(2000);
      await tenant.keypoints();
      await tenant.addingSpecifications();
      await page.waitForTimeout(3000);
      //await plp.savingData();

      await page.locator("//span[text()=' Lease Terms']").click();
      await page.waitForTimeout(2000);
      await lease.fillTable1_Data();
      await lease.fillTable2_Data();
      await lease.fillTable3_Data();
      await page.waitForTimeout(3000);
      //await plp.savingData();
      
      await page.locator("//span[text()='Document']").click();
      await page.waitForTimeout(1500);
      await doc.addMasterPlan();
      await doc.addFloorPlan();
      await doc.addBrochures();
      //await plp.savingData();
      
      await page.waitForTimeout(2000);
      await page.locator("//span[text()='Gallery']").click();
      await gallery.addingGalleryImages();
      await plp.savingData();
      await plp.savingData();
      await page.waitForTimeout(5000);

});