export class PropertiesPage{

    constructor(page){
        this.page = page;
        this.cards = page.locator("[id='5GEgODZ7k7TWcLqeaBjTbN']");
        this.projectName = page.locator("//div[@id='7btv2nxUjRr4bVSdpu2emv']/div[2]");
        this.assetType = page.locator("//div[@id='2Z6djt20rSxhRvz1iZH2SF']/div[2]");
        this.assetArea = page.locator("//div[@id='63ufuo54t6QibHJSBp5nsG']/div[2]");
        this.assetValue = page.locator("//div[@id='6PhaPZ7Sds3jtpdr5Ex7OI']/div[2]");
    }
    async PN(project_name){
        const count = await this.projectName.count();
        for (let i = 0; i < count; i++) {
            const element = await this.projectName.nth(i);
            const title = await element.getAttribute("title");
            if (await title.includes(project_name)) {
                await this.page.waitForLoadState("networkidle");
                await element.click();
                console.log("project name is : "+title);
                break;
            }
    }
}

    

    
}