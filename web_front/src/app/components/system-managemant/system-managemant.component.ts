import { Component, OnInit } from '@angular/core';
import { Subtab } from '../../class/sidebar';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-system-managemant',
    templateUrl: './system-managemant.component.html',
    styleUrls: ['./system-managemant.component.less']
})
export class SystemManagemantComponent implements OnInit {

    title = '系统管理';
    m_lsTabsList: Subtab[] = [
        {
            subtabName: '用户管理',
            subtabIcon: 'icon-user-manage',
            routerName: '/home/systemManagement/userManage',
            tree: false,
            checked: false
        },
        {
            subtabName: '操作日志',
            subtabIcon: 'icon-log',
            routerName: '/home/systemManagement/log',
            tree: false,
            checked: false
        },
        {
            subtabName: '参数配置',
            subtabIcon: 'icon-param-config',
            routerName: '/home/systemManagement/parameterConfig',
            tree: false,
            checked: false,
            children: [
                {
                    TypeName: '境内证件类型',
                    TypeID: 0
                },
                {
                    TypeName: '外籍旅客证件类型',
                    TypeID: 1
                },
                {
                    TypeName: '旅店类型',
                    TypeID: 2
                },
                {
                    TypeName: '省份',
                    TypeID: 3
                },
                {
                    TypeName: '州市县',
                    TypeID: 4
                },
                {
                    TypeName: '行政区',
                    TypeID: 5
                }
            ]
        }
    ];
    constructor(
        private m_objRouter: Router
    ) {
        this.m_objRouter.events.forEach(event => {
            if (event instanceof NavigationEnd) {
                this.m_lsTabsList.forEach(tabItem => {
                    if (this.m_objRouter.routerState.snapshot.url === '/home/systemManagement/parameterConfig') {
                        tabItem.checked = false;
                    } else if (this.m_objRouter.routerState.snapshot.url === tabItem.routerName) {
                        tabItem.checked = true;
                    } else {
                        tabItem.checked = false;
                    }
                });
            }
        });
    }

    ngOnInit() {
    }

}
