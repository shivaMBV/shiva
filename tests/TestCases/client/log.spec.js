import {test,expect} from "@playwright/test";
import { methods } from "../utils/methods";

async function  fillSpecificationsSection(section, page, fileInput, selectDropdown) {
    const parameters = section.locator('[placeholder^="Parameter"]');
    const dataFields = section.locator('[placeholder^="Data"]');
    const imageButtons = section.locator('[aria-label="Upload image"], .upload-icon'); // Adjust selector if needed
  
    const count = await parameters.count();
  
    for (let i = 0; i < count; i++) {
      const param = parameters.nth(i);
      const data = dataFields.nth(i);
  
      const paramValue = (await param.inputValue()).trim();
      const dataValue = (await data.inputValue()).trim();
  
      if (!paramValue && !dataValue) {
        const fake = await methods.fakerData();
        await param.fill(fake.RandomAlpha);
        await data.fill(fake.digits);
      }
  
      // Try uploading image only if image button exists at this index
      if (await imageButtons.count() > i) {
        const image = imageButtons.nth(i);
  
        const container = image.locator('xpath=ancestor::div[contains(@class, "compFileSelector")]');
        const hasImage = await container.locator('img[alt="Selected file"]').count();
  
        if (hasImage === 0) {
          await methods.uploadFile(
            page,
            image,
            fileInput,
            "images/I_percentage.svg",
            "I_percentage.svg",
            selectDropdown
          );
          await expect(container.locator('img[alt="Selected file"]')).toBeVisible();
        }
      }
    }
  }

test("login test",async({page})=>{

    await page.goto("https://striker.dev.modlix.com/login");

    await page.getByPlaceholder("Enter your email address").fill("cxapp123+striker@gmail.com");
    await page.getByRole("button",{title : "Continue"}).click();

    await page.waitForLoadState("networkidle");
    // OTP code as a string (example: "123456")
  const otpCode = '111111';

  for (let i = 0; i < otpCode.length; i++) {
    // Select the next input box that is active or not filled
    const otpInput = await page.locator('input._inputBox').nth(i);

    // Click to focus on the input if not already active
    const isActive = await otpInput.evaluate((el) => el.classList.contains('_isActive'));
    if (!isActive) {
      await otpInput.click();
    }
    await otpInput.fill(otpCode[i]);
}await page.waitForTimeout(5000);

await page.getByRole("button",{name : "Submit"}).click();
    
await page.locator("(//button[@title='Configure'])[2]").click();
await page.locator("[id='5fKdTNgSV2acv02z4oNiuv']").click();
  
await page.waitForTimeout(5000);

})