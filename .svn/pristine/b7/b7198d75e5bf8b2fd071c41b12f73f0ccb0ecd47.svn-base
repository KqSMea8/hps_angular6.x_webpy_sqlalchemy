import { Injectable } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';
import { User } from '../class/user';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Province } from '../class/province';
import { City } from '../class/city';
import { District } from '../class/district';
import { AllDictResult, DictResult } from '../class/dictionary';
import { UpdateDict } from '../class/updateDict';
import { NzMessageService } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { utils } from '../utils/utils';
import { MatchType } from '../class/matchType';
import { Subtab } from '../class/sidebar';

@Injectable({
    providedIn: 'root'
})
export class ContextService {
    m_objUserInfo: User = new User();
    m_sUserInfoName = 'm_objUserInfo';
    m_nTabActivedIndex = 0;
    m_nSubTabActivedIndex = 0;
    m_nUserID = 0;
    /**日期组件-日期的格式 */
    m_sDateFormat = 'yyyy-MM-dd';
    /**当前时间日期 */
    m_dToday = new Date();
    /**省市区列表 */
    public m_lsProvince: Province[] = [];
    m_lsCity: City[] = [];
    m_lsDistrict: District[] = [];
    m_nMustUserID: number;
    m_sMustUserName: string;
    m_objAllDict: AllDictResult = new AllDictResult();
    m_objUpdateDict: UpdateDict = new UpdateDict();
    /**加载框 */
    m_bLoading: boolean;
    m_nCheckCount: number;
    m_bHasLoginTimeoutModal: boolean;
    /**认证信息类型 */
    m_lsMatchType: Array<MatchType> = [];
    /**面包屑导航 */
    m_lsBreadCrumbList: Array<{name: string, routelink: string}> = [];
    constructor(
        private m_objApiService: ApiService,
        private m_objRouter: Router,
        private m_objMessageService: NzMessageService,
        private m_objNzModalService: NzModalService,
    ) {
        this.m_objUserInfo.UserName = '';
        this.fnGetUserInfo();
        this.fnGetProvince();
        this.fnGetDict();
        this.m_nCheckCount = 0;
        const formData = new FormData();
        // formData.append('image', '123');
        // this.m_objHttpClient.post('http://10.3.15.36:8090/api/Hotel/UploadImg', formData).subscribe(data => {
        //     console.log(data);
        // })
        // console.log(formData);

    }

    /**修改字典 */
    fnUpdateDict(): void {
        this.m_objApiService.fnUpdateDict(this.m_objUpdateDict).subscribe(data => {
            if (data.Code === 200) {
                this.m_objMessageService.success('修改成功！');
            } else {
                this.m_objMessageService.error(data.Msg);
            }
        });
    }

    /**获取字典 */
    fnGetDict(fnCallback?: any): void {
        this.m_objApiService.fnGetDict().subscribe(u => {
            this.m_objAllDict = u.Data;
            u.Data.verify_state.forEach(item => {
                const obj = new MatchType();
                obj.label = item.CodeName;
                obj.value = item.CodeNo;
                this.m_lsMatchType.push(obj);
            });
            if (fnCallback) {
                fnCallback();
            }
        });
    }

    /**禁止点击的时间 */
    fnDisabledDate = (dCurrent: Date): boolean => {
        return differenceInCalendarDays(dCurrent, this.m_dToday) > 0;
    }

    /**存储登录状态信息至Session */
    fnSaveLoginState(objUserInfo: User): void {
        this.m_objUserInfo = objUserInfo;
        sessionStorage[this.m_sUserInfoName] = JSON.stringify(objUserInfo);
    }

    /**恢复上下文登录状态 */
    fnRestoreState(): void {
        if (sessionStorage[this.m_sUserInfoName]) {
            this.m_objUserInfo = JSON.parse(sessionStorage[this.m_sUserInfoName]);
        } else {
            // this.fnLogout();
        }
    }

    /**退出登录 */
    fnLogout(): void {
        // debugger;
        this.m_objApiService.fnLogout().subscribe(data => {
            if (data.Code === 200) {
                sessionStorage.removeItem(this.m_sUserInfoName);
                this.m_lsMatchType.forEach(item => {
                    item.checked = false;
                });
                // this.m_objSideTabList.systemManagement.forEach(item => {
                //     item.tree = false;
                // })
                // this.m_objUserInfo = null;
                this.m_objRouter.navigate(['/']);
            }
        });
    }
    /**获取省份 */
    fnGetProvince(fn?: any): void {
        this.m_objApiService.fnGetProvince().subscribe(data => {
            if (data.Code === 200) {
                this.m_lsProvince = data.Data;
                this.fnGetCity(fn);
            }
        });
    }

    /**获取城市 */
    fnGetCity(fn?: any): void {
        this.m_objApiService.fnGetCity().subscribe(data => {
            if (data.Code === 200) {
                this.m_lsCity = data.Data;
                this.fnGetDistrict(fn);
                // for (let i = 0; i < this.m_lsProvince.length; i++) {
                //     for (let y = 0; y < data.Data.length; y++) {
                //         if (this.m_lsProvince[i].ProvinceID === data.Data[y].ProvinceID) {
                //             this.m_lsProvince[i].CitySet.push(data.Data[y]);
                //         }
                //     }
                // }
            }
        });
    }

    /**获取区域 */
    fnGetDistrict(fn?: any): void {
        this.m_objApiService.fnGetDistrict().subscribe(data => {
            if (data.Code === 200) {
                this.m_lsDistrict = data.Data;
                if (fn) {
                    fn();
                }
            }
        });
    }
    /**获取登录用户的信息 */
    fnGetUserInfo(): void {
        if (utils.fnCheckCookie('userInfo')) {
            // console.log(typeof utils.fnGetCookie('userInfo'));
            const userInfo = JSON.parse(utils.fnGetCookie('userInfo'));
            // console.log(userInfo);
            this.m_objUserInfo.UserID = userInfo.UserID;
            this.m_objUserInfo.UserName = userInfo.UserName;
            this.m_objUserInfo.UserCode = userInfo.UserCode;
        } else {
            if (this.m_nCheckCount < 3) {
                setTimeout(() => {
                    this.fnGetUserInfo();
                }, 200);
            } else {
                this.m_objRouter.navigate(['/login']);
            }
        }
    }
}
