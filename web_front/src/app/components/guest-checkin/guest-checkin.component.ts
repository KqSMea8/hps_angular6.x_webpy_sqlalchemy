import { Component, OnInit } from '@angular/core';
import { Subtab } from '../../class/sidebar';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-guest-checkin',
    templateUrl: './guest-checkin.component.html',
    styleUrls: ['./guest-checkin.component.less']
})
export class GuestCheckinComponent implements OnInit {
    /**侧边栏数据 */
    m_lsTabsList: Subtab[] = [
        { subtabName: '所有住客查询', subtabIcon: 'icon-search', routerName: '/home/guestCheckin/allGuest', tree: false, checked: false },
        { subtabName: '境外住客查询', subtabIcon: 'icon-search', routerName: '/home/guestCheckin/foreignGuest', tree: false, checked: false }
    ]
    /**侧边栏title */
    title = '旅店登记客人';
    constructor(
        private m_objRouter: Router,
        private m_objActivatedRoute: ActivatedRoute,
    ) {
        this.m_objRouter.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.m_lsTabsList.forEach(item => {
                    const url = this.m_objRouter.routerState.snapshot.url.split('?')[0];
                    if (url !== '/home/guestCheckin/guestDetails') {
                        if (this.m_objRouter.routerState.snapshot.url === item.routerName) {
                            item.checked = true;
                        } else {
                            item.checked = false;
                        }
                    } else {
                        this.m_objActivatedRoute.queryParams.subscribe((params: Params) => {
                            if (Number(params['type']) === 1) {
                                this.m_lsTabsList[0].checked = true;
                            } else if (Number(params['type']) === 2) {
                                this.m_lsTabsList[0].checked = false;
                            }
                        })
                    }
                });
            }
        });
    }

    ngOnInit() {
    }
}
