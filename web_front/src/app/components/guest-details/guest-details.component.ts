import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {
    GuestCheckinCondition, GetCheckinLogListCondition, ForeignerDetailsCondition
} from '../../class/GuestCheckinDetailsCondition';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { ContextService } from 'src/app/services/context.service';
import { AllGuestCheckinDetailsResult } from '../../class/AllGuestCheckinDetailsResult';
import { ForeignerCheckinDetailsResult } from '../../class/ForeignerCheckinDetailsResult';
import { ToolsService } from 'src/app/services/tools.service';
import { GuestCheckinLogResult } from '../../class/GuestCheckinLogResult';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-guest-details',
    templateUrl: './guest-details.component.html',
    styleUrls: ['./guest-details.component.less']
})
export class GuestDetailsComponent implements OnInit {

    /**旅客入住查询参数 */
    m_objGuestCheckinSearchCondition: GuestCheckinCondition = new GuestCheckinCondition();
    /**境外旅客详情查询参数 */
    m_objForeignDetailsCondition: ForeignerDetailsCondition = new ForeignerDetailsCondition();
    /**旅客类型，1：境内，2：境外 */
    m_nGuestType: number;
    /**入住ID */
    m_nCheckinId: number;
    /**所有旅客入住查询结果 */
    m_objAllGuestCheckinDetailsResult: AllGuestCheckinDetailsResult = new AllGuestCheckinDetailsResult();
    /**境外旅客入住查询结果 */
    m_objForeignerGuestCheckinDetailsResult: ForeignerCheckinDetailsResult = new ForeignerCheckinDetailsResult();
    /**单条旅客入住记录查询结果 */
    m_objGuestCheckinLog: GuestCheckinLogResult;
    /**旅客入住记录查询结果 */
    m_objGuestCheckinLogList: Array<GuestCheckinLogResult> = [];
    /**旅客入住记录查询参数 */
    m_objGuestCheckinLogListCondition: GetCheckinLogListCondition = new GetCheckinLogListCondition();
    /**面包屑导航信息 */
    m_lsBreadCrumbList: Array<{ name: string, routelink: string }> = [];
    m_sImagePath: string;
    constructor(
        public m_objApiService: ApiService,
        public m_objActivatedRoute: ActivatedRoute,
        public m_objContextService: ContextService,
        public m_objToolsService: ToolsService,
        private m_objRouter: Router,
        private m_objHttp: HttpClient
    ) {
        this.m_objRouter.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                /**当前用户ID */
                this.m_objGuestCheckinSearchCondition.nSearchUserIDMust =
                    this.m_objGuestCheckinLogListCondition.nSearchUserIDMust =
                    this.m_objForeignDetailsCondition.nSearchUserIDMust = this.m_objContextService.m_objUserInfo.UserID;
                /**当前用户Name */
                this.m_objGuestCheckinSearchCondition.sSearchUserNameMust =
                    this.m_objGuestCheckinLogListCondition.sSearchUserNameMust =
                    this.m_objForeignDetailsCondition.sSearchUserNameMust = this.m_objContextService.m_objUserInfo.UserName;
                /**面包屑导航信息赋值 */
                this.m_lsBreadCrumbList = [
                    { name: '首页', routelink: '/home' },
                    { name: '', routelink: '' },
                    { name: '旅客入住详情', routelink: '' }
                ];
                /**获取路由参数 */
                this.m_objActivatedRoute.queryParams.subscribe((params: Params) => {
                    this.m_nGuestType = Number(params['type']);
                    this.m_nCheckinId = params['id'];
                    this.m_objGuestCheckinSearchCondition.nCheckInID = this.m_nCheckinId;
                    this.m_objGuestCheckinLogListCondition.nHotelGuestID = this.m_nCheckinId;
                    if (this.m_nGuestType === 1) {
                        this.m_lsBreadCrumbList[1].name = '所有旅客入住查询';
                        this.m_lsBreadCrumbList[1].routelink = '/home/guestCheckin/allGuest';
                        this.m_objGuestCheckinSearchCondition.nIsForeigner = 0;
                    } else if (this.m_nGuestType === 2) {
                        this.m_lsBreadCrumbList[1].name = '境外旅客入住查询';
                        this.m_lsBreadCrumbList[1].routelink = '/home/guestCheckin/foreignGuest';
                        this.m_objGuestCheckinSearchCondition.nIsForeigner = 1;
                    }
                    this.fnGetAllCheckinDetail();
                    this.fnGetCheckinLogList();
                });
            }
        });
    }

    ngOnInit() { }

    /**旅客入住详情 */
    fnGetAllCheckinDetail(): void {
        this.m_objApiService.fnGetCheckinDetail(this.m_objGuestCheckinSearchCondition).subscribe(data => {
            if (data.Code === 200) {
                this.m_objAllGuestCheckinDetailsResult = data.Data;
                this.getImgUrl(data.Data.GuestInfo[0].GuestCheckIn.HotelPhotoURL);
            } else {
                this.m_objToolsService.fnErrorReturnTips(data.Msg);
            }
        });
    }

    /**境外旅客入住详情补充信息 */
    fnGetForeignerCheckinDetails(id: number): void {
        this.m_objForeignDetailsCondition.nGuestDocID = id;
        this.m_objApiService.fnGetForeignerGuestDetail(this.m_objForeignDetailsCondition).subscribe(data => {
            if (data.Code === 200) {
                this.m_objForeignerGuestCheckinDetailsResult = data.Data;
            }
        });
    }

    /**单条旅客入住记录历史查询 */
    fnGetCheckinLog(): void {
        this.m_objApiService.fnGetCheckinLog(this.m_objGuestCheckinSearchCondition).subscribe(data => {
            if (data.Code === 200) {
                this.m_objGuestCheckinLog = data.Data;
            } else {
                this.m_objToolsService.fnErrorReturnTips(data.Msg);
            }
        });
    }

    /**旅客入住记录历史查询 */
    fnGetCheckinLogList(): void {
        this.m_objApiService.fnGetCheckinLogList(this.m_objGuestCheckinLogListCondition).subscribe(data => {
            if (data.Code === 200) {
                this.m_objGuestCheckinLogList = data.Data;
            }
        });
    }

    /**返回上一页 */
    fnGoBack(): void {
        history.go(-1);
    }

    getImgUrl(basePath: string): any {
        return environment.baseUrl + '/Hotel/ShowImg?basePath=' + basePath;
    }
}
