import { Component } from '@angular/core';
import * as getISOWeek from 'date-fns/get_iso_week';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    title = 'HPS';
    date = null; // new Date();
    dateRange = []; // [ new Date(), addDays(new Date(), 3) ];
    isEnglish = false;
    m_bIsShow: boolean;

    constructor(
        private i18n: NzI18nService,
        private m_objRouter: Router
    ) {
        this.m_objRouter.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                // console.log('true');
                this.m_bIsShow = true;
            } else {
                // console.log('false');
                this.m_bIsShow = false;
            }
        });
    }

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }

    getWeek(result: Date): void {
        console.log('week: ', getISOWeek(result));
    }

    changeLanguage(): void {
        this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
        this.isEnglish = !this.isEnglish;
    }
}
