import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { utils } from '../utils/utils';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { Observable, of } from 'rxjs';

@Injectable()
/**
 * http拦截器
 */
export class HttpInterptor implements HttpInterceptor {

    m_bHasLoginTimeoutModal: boolean;
    constructor (
        private m_objRouter: Router,
        private m_objNzModalService: NzModalService,
    ){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
        const arr = this.m_objRouter.routerState.snapshot.url.split('/');
        if (arr[arr.length - 1] === 'login') {
            return next.handle(req);
        } else {
            if (utils.fnCheckCookie('userInfo')) {
                return next.handle(req);
            } else {
                if (!this.m_bHasLoginTimeoutModal) {
                    this.m_bHasLoginTimeoutModal = true;
                    this.m_objNzModalService.info({
                        nzContent: '登陆超时，请重新登陆!',
                        nzOnOk: () => {
                            this.m_bHasLoginTimeoutModal = false;
                            this.m_objRouter.navigate(['/login']);
                        }
                    })
                }
                return of(false);
            }
        }
    }
}
