import { Component, OnInit, ElementRef } from '@angular/core';
import { Subtab } from '../../class/sidebar';
import { ContextService } from 'src/app/services/context.service';
import { SearchCondition } from '../../class/searchCondition';
import { Pagination } from 'src/app/class/pagination';
import { ApiService } from 'src/app/services/api.service';
import { ForeignerCheckinCondition } from '../../class/foreignerCheckinCodition';
import { GuestCheckinResult } from '../../class/guestCheckinResult';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/services/tools.service';
import { MatchType } from '../../class/matchType';

@Component({
    selector: 'app-foreign-guest',
    templateUrl: './foreign-guest.component.html',
    styleUrls: ['./foreign-guest.component.less']
})
export class ForeignGuestComponent implements OnInit {
    m_objForeignGuestCondition: SearchCondition<ForeignerCheckinCondition> =
        new SearchCondition<ForeignerCheckinCondition>(ForeignerCheckinCondition);
    m_objForeignGuestCheckinList: Pagination<GuestCheckinResult> = new Pagination<GuestCheckinResult>();
    m_nRowCount: number;
    /**面包屑导航信息 */
    m_lsBreadCrumbList: Array<{ name: string, routelink: string }> = [
        { name: '首页', routelink: '/home' },
        { name: '境外旅客入住查询', routelink: '' }
    ];
    /**加载框 */
    m_bShowLoading: boolean;
    /**错误信息 */
    m_sErrorMsg: string;
    /**是否显示错误信息组件 */
    m_bShowError: boolean;
    /**排序类型 */
    m_lsSortType: Array<any> = [
        {
            CodeNo: 1,
            CodeName: '入住时间'
        },
        {
            CodeNo: 2,
            CodeName: '状态'
        }
    ];
    /**认证类型 */
    /**认证类型 */
    m_lsMatchType: Array<MatchType> = [
        {
            label: '匹配',
            value: 1,
            checked: false
        },
        {
            label: '匹配异常',
            value: 2,
            checked: false
        },
        {
            label: '无证件',
            value: 3,
            checked: false
        }
    ];
    title = '哦哦哦';
    constructor(
        public m_objContextService: ContextService,
        public m_objApiService: ApiService,
        public m_objRouter: Router,
        public m_objToolsService: ToolsService,
        public m_objElementRef: ElementRef
    ) {
        JSON.parse(JSON.stringify(this.m_lsMatchType));
    }

    ngOnInit() {
        this.m_objForeignGuestCondition.objPageInfo.nPageNo = 1;
        this.m_objForeignGuestCondition.objPageInfo.nPageSize = 10;
        this.m_objForeignGuestCheckinList.RowCount = 0;
    }

    // 查询境外入住旅客
    fnSearchGuestCheckinLinst(): void {
        this.m_bShowLoading = true;
        /**当前登陆用户ID */
        this.m_objForeignGuestCondition.objCondition.nSearchUserIDMust = this.m_objContextService.m_objUserInfo.UserID;
        /**当前登陆用户名 */
        this.m_objForeignGuestCondition.objCondition.sSearchUserNameMust = this.m_objContextService.m_objUserInfo.UserName;
        /**格式化日期 */
        this.m_objForeignGuestCondition.objCondition.sBornDateStart =
            this.m_objToolsService.fnFormatDate(this.m_objForeignGuestCondition.objCondition.sBornDateStart, 0);
        this.m_objForeignGuestCondition.objCondition.sBornDateEnd =
            this.m_objToolsService.fnFormatDate(this.m_objForeignGuestCondition.objCondition.sBornDateEnd, 1);
        this.m_objForeignGuestCondition.objCondition.sEntryTimeStart =
            this.m_objToolsService.fnFormatDate(this.m_objForeignGuestCondition.objCondition.sEntryTimeStart, 0);
        this.m_objForeignGuestCondition.objCondition.sEntryTimeEnd =
            this.m_objToolsService.fnFormatDate(this.m_objForeignGuestCondition.objCondition.sEntryTimeEnd, 1);
        this.m_objForeignGuestCondition.objCondition.sDepartureTimeStart =
            this.m_objToolsService.fnFormatDate(this.m_objForeignGuestCondition.objCondition.sDepartureTimeStart, 0);
        this.m_objForeignGuestCondition.objCondition.sDepartureTimeEnd =
            this.m_objToolsService.fnFormatDate(this.m_objForeignGuestCondition.objCondition.sDepartureTimeEnd, 1);
        this.m_objForeignGuestCondition.objCondition.sCheckInDateTimeStart =
            this.m_objToolsService.fnFormatDate(this.m_objForeignGuestCondition.objCondition.sCheckInDateTimeStart, 0);
        this.m_objForeignGuestCondition.objCondition.sCheckInDateTimeEnd =
            this.m_objToolsService.fnFormatDate(this.m_objForeignGuestCondition.objCondition.sCheckInDateTimeEnd, 1);
        this.m_objForeignGuestCondition.objCondition.sVisaDeadline =
            this.m_objToolsService.fnFormatDate(this.m_objForeignGuestCondition.objCondition.sVisaDeadline, 1);
        this.m_objApiService.fnSearchForeignerCheckin(this.m_objForeignGuestCondition).subscribe(data => {
            this.m_bShowLoading = false;
            if (data.Code !== 200) {
                this.m_sErrorMsg = data.Msg;
                this.m_bShowError = true;
                this.m_objForeignGuestCheckinList.RowCount = 0;
                this.m_objForeignGuestCheckinList.DataSet = [];
            } else {
                if (data.Data.RowCount === 0) {
                    this.m_sErrorMsg = '没有查找到匹配的数据，请修改查询条件！';
                    this.m_bShowError = true;
                }
                this.m_objForeignGuestCheckinList = data.Data;
                this.fnMoveToTable();
            }
        });
    }

    /**每页显示条数改变 */
    fnPageSizeChange(value): void {
        this.m_objForeignGuestCondition.objPageInfo.nPageNo = 1;
        this.m_objForeignGuestCondition.objPageInfo.nPageSize = value;
        if (!!this.m_objForeignGuestCheckinList.DataSet && this.m_objForeignGuestCheckinList.DataSet.length !== 0) {
            this.fnSearchGuestCheckinLinst();
        }
    }

    /**页码改变 */
    fnPageIndexChange(): void {
        console.log('fnPageIndexChange');
        console.log(this.m_objForeignGuestCheckinList.DataSet);
        if (!!this.m_objForeignGuestCheckinList.DataSet && this.m_objForeignGuestCheckinList.DataSet.length !== 0) {
            this.fnSearchGuestCheckinLinst();
        } else {
        }
    }

    // 导航至旅客入住详情
    fnToGuestCheckinDetails(id: number): void {
        this.m_objRouter.navigate(['/home/guestCheckin/guestDetails'], {
            queryParams: {
                type: 2,
                id: id
            }
        });
    }

    /**重置搜索条件 */
    fnReset(): void {
        this.m_objForeignGuestCondition.objCondition = new ForeignerCheckinCondition();
        this.m_lsMatchType.forEach(item => {
            item.checked = false;
        });
    }

    /**选择认证类型 */
    fnMatchChange(value: Array<any>): void {
        this.m_objForeignGuestCondition.objCondition.lsMatchResult = value;
    }

    /**滚动到数据表格 */
    fnMoveToTable(): void {
        const element = this.m_objElementRef.nativeElement.querySelector('#resultTable');
        const height = element.offsetTop;
        const tableRow = document.querySelector('.table-row');
        if (tableRow) {
            this.m_bShowLoading = false;
            document.querySelector('.layer-main').scrollTop = height - 90;
        } else {
            setTimeout(() => {
                this.fnMoveToTable();
            }, 300);
        }
    }
}
