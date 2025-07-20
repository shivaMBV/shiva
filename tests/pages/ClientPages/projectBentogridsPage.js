import { methods } from "../../utils/methods";


export class ProjectBentogrids {

    constructor(page){
        this.page = page;
        this.bento_plp = page.locator("[id='5fKdTNgSV2acv02z4oNiuv']");
        this.bento_documents = page.locator("[id='2GjrX52YoxI8oH81RS5Vuh']");
        this.bento_contactManager = page.locator("[id='33TcKgVlhLAkrZfTkQxxrZ']");
        this.bento_ScheduleCall = page.locator("[id='2nP2PESThKzqkR22VXfznF']");
        this.bento_comm_inventoryManagement = page.locator("[id='4LQAKS74Xp0r72ew9knhOx']");
        this.bento_inventorySetUp = page.locator("[id='6K3KTzIbIUOBkAUZWqRvf5']");
        this.bento_costSheetConfig =  page.locator("[id='4NGIbkjBqdErZ6LYo04Ms4']");
        this.bento_Res_inventoryManagement = page.locator("[id='oj3CnwSLaIM2Sz9hpIqNT']");
    }

    async bentoGrid_plp(){
        await methods.waitFor_and_Click(this.bento_plp);
    }

    async bentoGrid_documents(){
        await methods.waitFor_and_Click(this.bento_documents);
    }

    async bentoGrid_contactManager(){
        await methods.waitFor_and_Click(this.bento_contactManager);
    }

    async bentoGrid_ScheduleCall(){
        await methods.waitFor_and_Click(this.bento_ScheduleCall);
    }

    async bentoGrid_comm_inventoryManagement(){
        await methods.waitFor_and_Click(this.bento_comm_inventoryManagement);
    }

    async bentoGrid_inventorySetUp(){
        await methods.waitFor_and_Click(this.bento_inventorySetUp);
    }

    async bentoGrid_costSheetConfig(){
        await methods.waitFor_and_Click(this.bento_costSheetConfig);
    }

    async bentoGrid_Res_inventoryManagement(){
        await methods.waitFor_and_Click(this.bento_Res_inventoryManagement);
    }
}