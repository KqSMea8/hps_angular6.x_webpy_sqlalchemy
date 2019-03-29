import { Injectable } from '@angular/core';
import { ContextService } from './context.service';

@Injectable({
    providedIn: 'root'
})
export class SystemManagementService {
    m_nIsShowTypeID = 0;
    constructor() {

     }

    fnChangeBread(nTabs: number): void {
        // this.m_lsBreadCrumbList = [
        //     { name: '首页', routelink: '/home' },
        //     { name: '参数配置', routelink: '' },
        //     { name: '', routelink: '' }
        // ];
        // switch (nTabs) {
        //     case 1:
        //         this.m_lsBreadCrumbList[2].name = '境内证件类型';
        //         break;
        //     case 2:
        //         this.m_lsBreadCrumbList[2].name = '外籍旅客证件类型';
        //         break;
        //     case 3:
        //         this.m_lsBreadCrumbList[2].name = '旅店类型';
        //         break;
        //     case 4:
        //         this.m_lsBreadCrumbList[2].name = '省份';
        //         break;
        //     case 5:
        //         this.m_lsBreadCrumbList[2].name = '州市县';
        //         break;
        //     case 6:
        //         this.m_lsBreadCrumbList[2].name = '行政区';
        //         break;
        // }
    }
}
