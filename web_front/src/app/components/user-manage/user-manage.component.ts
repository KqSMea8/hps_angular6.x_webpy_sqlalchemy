import { ContextService } from 'src/app/services/context.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subtab } from 'src/app/class/sidebar';
import { ApiService } from '../../services/api.service';
import { SearchCondition } from 'src/app/class/searchCondition';
import { SearchUserCondition } from 'src/app/class/searchUserCondition';
import { User } from '../../class/user';
import { Pagination } from '../../class/pagination';
import { SystemManagementService } from '../../services/system-management.service';
import { NzMessageService } from 'ng-zorro-antd';
import { AddUserCondition } from '../../class/addUserCondition';
// import {Md5} from 'ts-md5/dist/md5';

@Component({
    selector: 'app-user-manage',
    templateUrl: './user-manage.component.html',
    styleUrls: ['./user-manage.component.less']
})
export class UserManageComponent implements OnInit {

    m_sPassword: string;
    m_sErrorMsg: string;
    m_sPasswordnd: string;
    m_nRowcount: number;
    m_objSubtab: Array<Subtab> = [];
    /**面包屑导航信息 */
    m_lsBreadCrumbList: Array<{name: string, routelink: string}> = [
        {name: '首页', routelink: '/home'},
        {name: '用户管理', routelink: ''}
    ];
    m_objAddUserCondition: AddUserCondition = new AddUserCondition();
    m_objUserList: Pagination<User> = new Pagination<User>();
    m_objSearchUserCondition: SearchCondition<SearchUserCondition> =
        new SearchCondition<SearchUserCondition>(SearchUserCondition);
    m_isVisible: boolean;
    m_isShow: boolean;
    /**排序选项 */
    m_lsSort: Array<any> = [
        {CodeNo: 1, CodeName: '创建日期'},
        {CodeNo: 2, CodeName: '状态'}
    ];
    /**加载动画 */
    m_bShowLoading: boolean;

    constructor(
        public m_objApiService: ApiService,
        public m_objSysService: SystemManagementService,
        private m_objMessage: NzMessageService,
        private m_objRouter: Router,
        private m_objContextService: ContextService
    ) {}

    ngOnInit() {
        this.m_objSearchUserCondition.objPageInfo.nPageNo = 1;
        this.m_objSearchUserCondition.objPageInfo.nPageSize = 10;
        // this.m_objSearchUserCondition.objPageInfo.nSort = 0;
        this.fnGetUserList();
    }

    /**查询用户列表 */
    fnGetUserList(): void {
        this.m_bShowLoading = true;
        this.m_objSearchUserCondition.objCondition.nSearchUserIDMust = this.m_objContextService.m_objUserInfo.UserID;
        this.m_objSearchUserCondition.objCondition.sSearchUserNameMust = this.m_objContextService.m_objUserInfo.UserName;
        this.m_objApiService
            .fnSearchUserList(this.m_objSearchUserCondition)
            .subscribe(data => {
                if (data.Code === 200) {
                    this.m_objUserList = data.Data;
                    this.m_nRowcount = data.Data.RowCount;
                    this.m_bShowLoading = false;
                } else {
                    this.m_sErrorMsg = data.Msg;
                    this.m_isShow = true;
                    this.m_bShowLoading = false;
                }
            });
    }

    fnToUserInfo(nUserID: number): void {
        this.m_objRouter.navigate(['/main/SystemManagement/UserInfo'],
            {
                queryParams: {
                    id: nUserID
                }
            });
        this.m_objSearchUserCondition.objCondition =  new SearchUserCondition();
        this.fnGetUserList();
    }

    /**增加用户 */
    fnAddUser(): void {
        this.m_objAddUserCondition.nAddUserIDMust = this.m_objContextService.m_objUserInfo.UserID;
        this.m_objAddUserCondition.sAddUserNameMust = this.m_objContextService.m_objUserInfo.UserName;
        this.m_objAddUserCondition.sWorkCode = this.m_objContextService.m_objUserInfo.UserCode;
        // 判断账号是否输入
        if (this.m_objAddUserCondition.sUserCode) {
            // 判断密码是否输入
            if (this.m_sPassword) {
                if (this.m_sPassword.length < 6) {
                    this.m_sErrorMsg = '密码长度至少6位!';
                    this.m_isShow = true;
                } else {
                    const sReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if (this.m_sPassword !== this.m_sPasswordnd) {
                        this.m_sErrorMsg = '请再次确认密码！';
                        this.m_isShow = true;
                    }
                    if (this.m_objAddUserCondition.sTel && !sReg.test(this.m_objAddUserCondition.sTel)) {
                        this.m_sErrorMsg = '请输入合法手机号!';
                        this.m_isShow = true;
                    }
                    this.m_objAddUserCondition.sPassword = this.m_sPassword;
                    // MD5加密
                    // this.m_objAddUserCondition.sPassword = Md5.hashStr(this.m_sPassword).toString();
                    this.m_objApiService
                    .fnAddUser(this.m_objAddUserCondition)
                    .subscribe(data => {
                        if (data.Code === 200) {
                            this.m_objMessage.create('success', '新增成功!');
                            this.m_isVisible = false;
                        } else {
                            if (data.Msg !== '') {
                                this.m_sErrorMsg = data.Msg;
                                this.m_isShow = true;
                            } else {
                                this.m_sErrorMsg = '操作失败!';
                                setTimeout(() => {
                                    this.m_isShow = true;
                                }, 3000);
                            }
                        }
                    });
                }
            } else {
                this.m_sErrorMsg = '请输入密码!';
                this.m_isShow = true;
            }
        } else {
            this.m_sErrorMsg = '请输入账号!';
            this.m_isShow = true;
        }
    }

    fnShowModal(): void {
        this.m_isVisible = true;
    }

    fnHandleCancel(): void {
        this.m_isVisible = false;
    }

      /**每页条数的改变 */
    fnPageSizeChange(): void {
        if (this.m_objSearchUserCondition.objPageInfo.nPageNo === 1) {
            this.fnGetUserList();
        } else {
            this.m_objSearchUserCondition.objPageInfo.nPageNo = 1;
        }
    }

    // 重置搜索条件
    fnReset(): void {
        this.m_objSearchUserCondition.objCondition = new SearchUserCondition();
    }
}
