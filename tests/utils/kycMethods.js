import { faker } from "@faker-js/faker";

export class kycMethods{

    static async veryify_Email_phone_inKYC(page, value){
        await page.getByRole("button", { name : "Verify" }).click();
          const error = await page.locator("[class='_msgString']");
          if(error.isVisible() && (await error.textContent()) === "Phone number already exists"){
            await page.getByPlaceholder("Enter number").fill("");
            await page.getByPlaceholder("Enter number").fill(faker.string.numeric(10));
            await page.getByRole("button", { name : "Verify" }).click();
          }
          else if(error.isVisible() && (await error.textContent()) === "Email already exists"){
            await page.getByRole("button", { name : "Verify" }).click();
            await page.getByPlaceholder("Enter email address").fill("");
            await page.getByPlaceholder("Enter email address").fill(faker.internet.email());
            await page.getByRole("button", { name : "Verify" }).click();
          }
          const text = await page.locator("div._primaryText ._textContainer").textContent();
          if(await text && text.includes(value)){
            await methods.enterCode(page,"458795");
            await page.getByRole("button", { name : "Verify OTP" }).click();
          }
          else{
            console.log("Given MobileNumber or Email is not verifing");
          } 
      } 
}