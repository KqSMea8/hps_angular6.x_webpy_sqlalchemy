import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-error-bar',
    templateUrl: './error-bar.component.html',
    styleUrls: ['./error-bar.component.less']
})
export class ErrorBarComponent implements OnInit {
    @Input() m_nDelayTime: number = this.m_nDelayTime || 5;
    @Input() msg: string;
    m_bIsShow: boolean;
    m_sMsg: string;
    @Input()
    get isShow() {
        return this.m_bIsShow;
    }
    set isShow(value) {
        this.fnDelayHide(value);
    }

    @Output()
    isShowChange: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    /**延迟关闭错误提示 */
    fnDelayHide(value: any): void {
        this.m_bIsShow = value;
        if (this.m_bIsShow) {
            const sMsg = this.msg;
            let nDelayTime = this.m_nDelayTime;
            this.m_sMsg = '(' + nDelayTime + 's),' + sMsg;
            const interVal = setInterval(() => {
                if (nDelayTime > 1) {
                    this.m_sMsg = '(' + --nDelayTime + 's),' + sMsg;
                } else {
                    this.m_bIsShow = false;
                    this.isShowChange.emit(this.m_bIsShow);
                    clearInterval(interVal);
                }
            }, 1000);
        }
    }
}
