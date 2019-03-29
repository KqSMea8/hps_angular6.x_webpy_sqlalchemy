import {Component, NgModule, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {SearchHotelListCondition} from '../../class/searchHotelListCondition';
import {SearchCondition} from '../../class/searchCondition';
import {FormsModule} from '@angular/forms';
import {Subtab, Subbtn} from 'src/app/class/sidebar';
import {SearchHotelList} from '../../class/searchHotelList';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {ToolsService} from '../../services/tools.service';
import { ContextService } from 'src/app/services/context.service';


@Component({
    selector: 'app-hotel-search,nz-demo-select-search,nz-demo-input-basic,nz-demo-date-picker-start-end,nz-demo-button-basic,' +
        'nz-demo-breadcrumb-separator,nz-demo-table-basic',
    templateUrl: './hotel-offline.component.html',
    styleUrls: ['./hotel-offline.component.less'],

})
@NgModule({
    imports: [
        FormsModule
    ],
})

export class HotelOfflineComponent implements OnInit {
    m_objHotelListCondition: SearchCondition<SearchHotelListCondition>;
    m_listHotelList: SearchHotelList;
    nRowCount: number;
    boonIsEdit: boolean;
    m_listHotelLists: Array<any>;
    private m_objMessage: NzMessageService;
     /**面包屑导航信息 */
    m_lsBreadCrumbList: Array<{ name: string, routelink: string }> = [
        {name: '首页', routelink: '/home'},
        {name: '旅店查询', routelink: '/home/hotelManagement/hotelSearch'},
        {name: '未通过酒店', routelink: ''},
    ];

    constructor(
        public m_objApiService: ApiService,
        public m_objRouter: Router,
        public m_objToolsService: ToolsService,
        public m_objContextService: ContextService
    ) {
        this.m_objHotelListCondition = new SearchCondition<SearchHotelListCondition>(SearchHotelListCondition);
    }

    ngOnInit() {
        this.m_objHotelListCondition.objPageInfo.nPageNo = 1;
        this.m_objHotelListCondition.objPageInfo.nPageSize = 10;
        this.m_objHotelListCondition.objPageInfo.nSort = 0;
        this.nRowCount = 0;
        this.fnSearch();

    }

    fnSearch(): void {
        this.m_objHotelListCondition.objCondition.nSearchUserIDMust = 1;
        this.m_objHotelListCondition.objCondition.sSearchUserNameMust = 'aa';
        this.m_objHotelListCondition.objCondition.nAuditState = 3;
        this.m_objApiService.fnSearchHotelList(this.m_objHotelListCondition).subscribe(data => {
            if (data.Code === 200) {
                console.log(data.Data);
                this.m_listHotelLists = data.Data.DataSet;
                if (this.m_listHotelLists.length === 0) {
                    // this.m_objToolsService.fnErrorReturnTips(data.Msg);
                    this.nRowCount = 0;
                }
                this.nRowCount = data.Data.RowCount;
            } else {
                this.m_listHotelLists = [];
                this.m_objToolsService.fnErrorReturnTips(data.Msg);
                this.m_objMessage.create('error', data.Msg);
                this.nRowCount = 0;
            }
        });
    }

    /**每页条数的改变 */
    fnPageSizeChange(): void {
        this.m_objHotelListCondition.objPageInfo.nPageNo = 1;
        this.fnSearch();
    }

    /**跳转至编辑 */
    fnToHotelEdit(nHotelID): void {
        this.boonIsEdit = true;
        this.m_objRouter.navigate(['/main/Hotel/HotelSearch/HotelEdit'],
            {
                queryParams: {
                    boonIsEdit: this.boonIsEdit,
                    nHotelID: nHotelID
                }
            });
    }

}