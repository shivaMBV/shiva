import { test } from "@playwright/test";
import { methods } from "../../utils/methods";
import { PageObjectManager } from "../../utils/PageObjectManager";
import { addProject } from "../../pages/ClientPages/addProjectPage";

// class Locators {
//     constructor(page) {
//         this.page = page;
//         this.bhk = page.locator("[id='BRvmlegTlGyvO6UhlRJWx']");
//         this.t = page.locator("[id='7LpO7RXfAF13Al0c9pCKZ']");
//         this.label = page.locator("[class='_dropdownItem   _nextToOption'] label");
//         //this.add = page.locator("div[id='3FqK83PsHMuIiVYCUF1eCd'] span:nth-child(1)");
//     }
// }

test("residential", async ({ page }) => {

    await page.goto("https://striker.dev.modlix.com/login");
    await page.waitForTimeout(3000);
    await page.locator("input#t_48TgEcj5yxsFLcXtNwO3MZ").fill("cxapp123+striker@gmail.com");
    await page.getByRole("button",{name : 'Continue'}).click();
    await page.waitForTimeout(2000);
    await methods.enterCode(page, "111111");
    await page.getByRole("button",{name : "Submit"}).click();
    //await page.waitForTimeout(3000);
    const add = new addProject(page);
    await methods.waitFor_and_Click(add.btn_config);
    await page.locator("[id='6K3KTzIbIUOBkAUZWqRvf5']").click();
    
    const bhkOptions = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK'];
    const tOptions = ['1T', '2T', '3T', '4T', '5T'];

    let comboIndex = 0;

  for (const bhk of bhkOptions) {
    for (const t of tOptions) {

      // Skip add button for first row
      if (comboIndex > 0) {
        await page.click("div[id='3FqK83PsHMuIiVYCUF1eCd'] span:nth-child(1)"); // update selector
      }

      // Select BHK
      const bhkDropdown = page.locator("[id='BRvmlegTlGyvO6UhlRJWx']").nth(comboIndex);
      await bhkDropdown.click();
      await page.locator(`label:has-text("${bhk}")`).last().click(); // may use nth or specific parent if multiple labels exist

      // Select T
      const tDropdown = page.locator("[id='7LpO7RXfAF13Al0c9pCKZ']").nth(comboIndex);
      await tDropdown.click();
      await page.locator(`label:has-text("${t}")`).last().click();

      comboIndex++;
    }
  }
  await page.pause();
});