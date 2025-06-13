import { page,expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import userData from "../../Test_data/userDetails.json";
import { faker } from "@faker-js/faker";
import { ClientOnBoardingPage } from "../pages/ClientPages/ClientOnBoardingPage";
import { TIMEOUT } from "dns";

export class methods {

//FOR OTP OR PIN
 static async enterCode(page,code) {
    const otpCode = code;
    const inputs = page.locator("input._inputBox");
    for (let i = 0; i < otpCode.length; i++) {
      const input = inputs.nth(i);
      await input.waitFor({ state: 'visible' });
      const isActive = await input.evaluate(el =>
        el.classList.contains('_isActive')
      );
      if (!isActive) {
        await input.click();
      }
      await input.fill(code[i]);
    }
  }

  // static async storeData(filePath, updates = {}){
  //   try {
  //     const fullPath = path.resolve(filePath);
  //     const userDetails = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  
  //     // Apply updates to clientDetails
  //     userDetails.clientDetails = {
  //       ...userDetails.clientDetails,
  //       ...updates,
  //     };
  
  //     fs.writeFileSync(fullPath, JSON.stringify(userDetails, null, 2), 'utf-8');
  //     console.log(`User details updated in ${fullPath}`);
  //   } catch (err) {
  //     console.error(`Failed to update user details: ${err.message}`);
  //   }

  // }
  
  static async waitFor_and_Click(locator){
    await locator.waitFor({state : "visible"});
    await locator.click();
  }

  static async fillData(locator, text){
    await locator.waitFor({state : "visible"});
    await locator.fill(text);
  }

  static async scrollToElement(locator) {
    await locator.waitFor({ state: 'attached' });
    await locator.scrollIntoViewIfNeeded();
  }

  //select option form dropdown
  static async selectDropdownOption(page, dropdownInputLocator, optionText) {
    await dropdownInputLocator.click();
    const optionLocator = page.locator(`._dropdownItemLabel`, { hasText: optionText });
    await optionLocator.click();
  }
  
  
//text validating funciton
static async validateText(page, text){
  await expect(page.getByText(text)).toBeVisible();
}


//validating Toast messages
static async toastMessage(page,text){
  const expectedMSG = await page.locator("div[class='_msgString']").textContent();
  expect(expectedMSG).toEqual(text);
}

// Generate e random email
static async generateEmail(){
  const customDomains = ['company.com', 'example.org', 'testmail.net', 'mydomain.io'];
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const domain = faker.helpers.arrayElement(customDomains);
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
  return {email,firstName,lastName};
  
}

static async generateLocation(){
  const indianStates = [
    "Maharashtra", "Tamil Nadu", "Karnataka", "Uttar Pradesh", "Gujarat",
    "Rajasthan", "Kerala", "West Bengal", "Bihar", "Punjab"
  ];
  
  const indianCities = [
    "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai",
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];
  const state = faker.helpers.arrayElement(indianStates);
  const city = faker.helpers.arrayElement(indianCities);
  return {state, city};
}

// Generate a random title
static async generateProjectName(){
  const Randomtitle = ['fincity', 'amazon', 'shreeram Hebbal', 'Golden Tower', 'Capgemini', 'oracle'];
  const titleName = faker.helpers.arrayElement(Randomtitle);
  const digit = faker.string.numeric(2);
  const title = titleName+" "+digit;
  return title;
}

static async fakerData(){
  return {
    company : faker.word.noun(),
    digits : faker.string.numeric(2),
    amount : faker.string.numeric(8),
    area : faker.string.numeric(5),
    phone : faker.string.numeric(10),
    RandomAlpha : faker.string.alpha(10),
    alphaNumeric : faker.string.alphanumeric(15),
    sentance : faker.lorem.sentence(),
    lastName : faker.person.lastName(),
    firstName : faker.person.firstName()
  }
}

// url
static async getClientUrl(company,pathParameter) {
  return `https://${company}.${userData.clientDetails.env}.modlix.com/${pathParameter}`;
}

// upload file function
static async uploadFile(page, fileSelector, fileInput, filePath, __filename , select) {
  if(fileSelector!= null){
    await fileSelector.click();
  }
  const fileArray = Array.isArray(filePath) ? filePath : [filePath];
  const Dir = fileArray.map(file =>
    path.join(__dirname, `../../Files/${file}`)
  );

  await fileInput.waitFor({stable : "visible"});
  await fileInput.setInputFiles(Dir);
  await page.waitForTimeout(3000);
  const on = new ClientOnBoardingPage(page);
  if(__filename != null ){
    await on.fileName(__filename).waitFor({state : "visible"});
    await on.fileName(__filename).click();
  }
  if(select != null){
    await select.click();
  }
}

static async addingFields(page,locator, count = Math.floor(Math.random() * 4) + 2) {
    // Step 1: Click "Add specifications" count - 1 times
    for (let i = 1; i < count; i++) {
      await locator.click();
      await page.waitForTimeout(1000); // optional: wait for DOM update
    }  
}

static async specifications(page, parameter, dataField, fileSelectorSvg, fileInput, imgPath, imgName, select){
  //await methods.addingFields(page,"Add specifications");
  const para = parameter; 
  const data = dataField;
  const count = await para.count();  
  for(let i=0; i<count; i++){
      const parameterField = para.nth(i);
      const dataField = data.nth(i);
      const parameterValue = ((await parameterField.inputValue()).trim());
      const dataValue = ((await dataField.inputValue()).trim());
      if(!parameterValue && !dataValue){
          await parameterField.fill((await methods.fakerData()).RandomAlpha);
          await dataField.fill((await methods.fakerData()).digits);
      }
       // Try uploading image only if image button exists at this index
       const img = fileSelectorSvg;
if (await img.count() > i) {
  const imageButton = img.nth(i);
  
  // Check if image is uploaded already (img inside container)
  const container = imageButton.locator('xpath=ancestor::div[contains(@class, "compFileSelector")]');
  const hasImage = await container.locator('img[alt="Selected file"]').count();
  if (hasImage === 0) {
      await methods.uploadFile(page, imageButton, fileInput, imgPath, imgName, select);
      // Wait for image to appear
      await expect(container.locator('img[alt="Selected file"]')).toBeVisible();
      continue;
    }
  }        
}
}


}