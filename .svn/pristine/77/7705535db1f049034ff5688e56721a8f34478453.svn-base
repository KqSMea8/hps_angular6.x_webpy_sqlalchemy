import { Component, OnInit } from '@angular/core';
import { Subtab, Subbtn } from '../../class/sidebar';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-hotel-managemant',
    templateUrl: './hotel-managemant.component.html',
    styleUrls: ['./hotel-managemant.component.less']
})
export class HotelManagemantComponent implements OnInit {

    title = '系统管理';
    m_lsTabsList: Subtab[] = [
        { subtabName: '旅店查询', subtabIcon: 'icon-search', routerName: '/home/hotelManagement/hotelSearch', tree: false, checked: false },
        { subtabName: '待审核', subtabIcon: 'icon-audit-pending', routerName: '/home/hotelManagement/verify', tree: false, checked: false },
        { subtabName: '未通过', subtabIcon: 'icon-audit-fail', routerName: '/home/hotelManagement/offline', tree: false, checked: false },
    ];
    m_lsTabsBtn: Subbtn[] = [
        { subbtnName: '添加酒店', subbtnIcon: 'icon-add', routerName: '/home/hotelManagement/hotelAdd' }
    ];
    constructor(
        private m_objRouter: Router
    ) {
        this.m_objRouter.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.m_lsTabsBtn.forEach(item => {
                    if (this.m_objRouter.routerState.snapshot.url === item.routerName) {
                        this.m_lsTabsList.forEach(tabItem => {
                            tabItem.checked = false;
                        })
                    } else {
                        this.m_lsTabsList.forEach(item => {
                            if (this.m_objRouter.routerState.snapshot.url === item.routerName) {
                                item.checked = true;
                            } else {
                                item.checked = false;
                            }
                        });
                    }
                });
            }
        });
    }

    ngOnInit() {
    }

}
