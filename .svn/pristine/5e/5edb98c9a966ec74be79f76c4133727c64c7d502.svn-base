import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Period} from '../class/period';
import {NzMessageService} from 'ng-zorro-antd';
import { ContextService } from './context.service';

@Injectable({
    providedIn: 'root'
})
export class ToolsService {
    constructor(
        private m_objDatePipe: DatePipe,
        private m_objMessageService: NzMessageService,
        private m_objContextService: ContextService
    ) {
    }

    // 选中当天时间、七天内时间、一个月内时间区间
    fnChangePeriod(sPeriod: string): Period {
        const objToday = new Date();
        const sToday = this.m_objDatePipe.transform(objToday, 'yyyy-MM-dd 00:00:00');
        const sTodayEnd = this.m_objDatePipe.transform(objToday, 'yyyy-MM-dd 23:59:59')
        let sDateStart: string, sDateEnd: string;
        // 0为今天时间，1为一周内时间，2为一个月内时间
        switch (sPeriod) {
            case '0':
                sDateStart = sToday;
                sDateEnd = sTodayEnd;
                break;
            case '1':
                const objWeek = new Date(objToday.getTime() - (7 * 24 * 3600 * 1000));
                sDateStart = this.m_objDatePipe.transform(objWeek, 'yyyy-MM-dd 00:00:00');
                sDateEnd = sTodayEnd;
                break;
            case '2':
                // 是否一月份
                const bIsJanuary = (objToday.getMonth() + 1) - 1 === 0;
                // 上个月的年份
                const nPrevYear = bIsJanuary ? objToday.getFullYear() - 1 : objToday.getFullYear();
                // 上个月的月份
                const nPrevMonth = bIsJanuary ? 12 : objToday.getMonth();
                const objMonth = new Date(`${nPrevYear}-${nPrevMonth}-${objToday.getDate()}`);
                sDateStart = this.m_objDatePipe.transform(objMonth, 'yyyy-MM-dd 00:00:00');
                sDateEnd = sTodayEnd;
                break;
        }
        return {
            sDateStart: sDateStart,
            sDateEnd: sDateEnd
        };
    }

    /**格式化antd日期组件返回的参数 */
    /**0:起始时间  1：结束时间 */
    fnFormatDate(aDate: any, nType?: number): string {
        if (typeof(aDate) === 'object') {
            // console.log(typeof this.m_objDatePipe.transform(aDate, 'yyyy-MM-dd'));
            if(nType === 0) {
                return this.m_objDatePipe.transform(aDate, 'yyyy-MM-dd 00:00:00');
            }else if(nType === 1){
                return this.m_objDatePipe.transform(aDate, 'yyyy-MM-dd 23:59:59');
            }else {
                return this.m_objDatePipe.transform(aDate, 'yyyy-MM-dd HH:MM:SS');
            }
        }
        return aDate;
    }

    /**数组为空时返回统一的提示信息 */
    fnDataIsNullReturnTips(nRowCount: number) {
        if (nRowCount === 0) {
            // this.m_objMessageService.info('没有查询到任何数据哦');
            // this.m_objContextService.fnError('没有查询到任何数据哦');
        }
    }

    /**操作成功的提示 */
    fnDoSuccessReturnTips(sMsg: string) {
        this.m_objMessageService.info(sMsg);
    }

    /*报错的提示信息 */
    fnErrorReturnTips(sMsg: string) {
        this.m_objMessageService.error(sMsg);
    }

}
