import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { utils } from '../../utils/utils';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private m_objRouter: Router,
        private m_objNzModalService: NzModalService,
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            const isLogin = utils.fnCheckCookie('userInfo');
            if (isLogin) {
                return true;
            } else {
                this.m_objNzModalService.info({
                    nzContent: '登陆超时，请重新登陆!',
                    nzOnOk: () => this.m_objRouter.navigate(['/login'])
                });
                return false;
            }
    }
}
