import { Component, OnInit, Input } from '@angular/core';
import { Subtab, Subbtn } from '../../class/sidebar';
import { Router, NavigationEnd } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd';
import { SystemManagementService } from 'src/app/services/system-management.service';
import { trigger, transition, state, style, animate } from '@angular/animations';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.less'],
    animations: [
        trigger('rotage', [
            state('up', style({
                'transform': 'rotate(180deg)',
            })),
            state('down', style({
                'transform': 'rotate(0deg)',
            })),
            transition('down => up', animate(300)),
            transition('up => down', animate(300))
        ]),
    ]
})
export class SidebarComponent implements OnInit {

    @Input()title: string;
    @Input()subtab: Array<Subtab>;
    @Input()subbtn: Array<Subbtn>;
    @Input()template: any;

    public m_sRoutePath: string;
    public m_nShowTypeID: number;
    public m_nTypeID: number;
    public m_sRotageState: string;
    constructor(
        public m_objRouter: Router,
        public m_objNzIconService: NzIconService,
        private m_objSystemManagementService: SystemManagementService,
    ) {
        this.m_objNzIconService.fetchFromIconfont({
            scriptUrl: 'assets/iconfont.js',
        });
        this.m_objRouter.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const objRouterState = m_objRouter.routerState.snapshot.url;
            }
        });
    }

    ngOnInit() {
        this.m_sRotageState = 'down';
    }

    /**切换配置列表 */
    fnSwitchConfigType(nTypeID: number): void {
        this.m_objRouter.navigate(['/home/systemManagement/parameterConfig'], {
            queryParams: {
                id: nTypeID
            }
        });
        this.m_nShowTypeID = nTypeID;
        // this.m_objSystemManagementService.fnChangeBread(nTypeID);
    }

    fnSwitchRouter(objItem: any, nIndex: number): void {
        /**当不存在二级目录 */
        if (!objItem.children) {
            this.m_objRouter.navigate([objItem.routerName]);
            this.m_nShowTypeID = -1 ;
        } else {
            this.subtab[nIndex].tree = !this.subtab[nIndex].tree;
            this.m_sRotageState = this.subtab[nIndex].tree ? 'up' : 'down';
        }
    }
}
