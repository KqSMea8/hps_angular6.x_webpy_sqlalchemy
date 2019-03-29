import { Component, OnInit } from '@angular/core';
import { RouterState, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ContextService } from 'src/app/services/context.service';
import { NzIconService, NzModalService } from 'ng-zorro-antd';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

    public m_aTabList = [
        {tabName: '旅客入住查询', tabIcon: 'icon-guest-checkin', routeName: 'guestCheckin'},
        {tabName: '旅店开房查询', tabIcon: 'icon-hotel-checkin', routeName: 'hotelCheckin'},
        {tabName: '旅店管理', tabIcon: 'icon-hotel-manage', routeName: 'hotelManagement'},
        {tabName: '系统管理', tabIcon: 'icon-system-setting', routeName: 'systemManagement'}

    ];

    public m_sRoutePath: string;

    constructor(
        public m_objContextService: ContextService,
        public m_objRouter: Router,
        public m_objNzIconService: NzIconService,
        private m_objModalService: NzModalService
    ) {
        this.m_objNzIconService.fetchFromIconfont({
            scriptUrl: 'assets/iconfont.js',
        });
        this.m_objRouter.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const objRouterState: RouterState = m_objRouter.routerState;
                const aPathList: Array<string> = objRouterState.snapshot.url.split('/');
                this.m_sRoutePath = aPathList[2];
            }
        });
    }

    ngOnInit() {
    }

    /**跳转到个人信息/系统管理界面 */
    fnGoSystemManage(): void {
        this.m_objRouter.navigate(['/home/systemManagement']);
    }
    /**退出登录 */
    fnLogout(): void {
        this.m_objModalService.confirm({
            nzTitle: '提示',
            nzContent: '您是否要退出登录？',
            nzOnOk: () => {
                this.m_objContextService.fnLogout();
            }
        });
    }
}
