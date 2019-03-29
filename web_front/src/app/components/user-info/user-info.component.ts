import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router'
import { Check } from '../../class/check';
import { User } from '../../class/user';
import { ContextService } from 'src/app/services/context.service';
import { UpdataRoleCondition } from '../../class/updataRoleCondition';
import { Component, OnInit } from '@angular/core';
import { Subtab } from 'src/app/class/sidebar';
import { SystemManagementService } from 'src/app/services/system-management.service';
import { ApiService } from 'src/app/services/api.service';
import { RemoveUserCondition } from 'src/app/class/removeUserCondition';
import { NzMessageService, NzModalService, isTemplateRef } from 'ng-zorro-antd';
import { UpdateUserCondition } from 'src/app/class/updateUserCondition';
import { SearchCondition } from 'src/app/class/searchCondition';
import { SearchUserCondition } from 'src/app/class/searchUserCondition';
// import {Md5} from "ts-md5/dist/md5";

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent implements OnInit {

    m_isVisible: boolean;
    m_nVisible: number;
    m_nUserID: number;
    m_nMustUserID: number;
    m_sUserName: string;
    m_sNewPassword: string;
    m_sNewPasswordnd: string;
    m_sOldPassword: string;
    m_sFuncRoleList: string;
    m_sDataRoleList: string;
    m_sErrorMsg: string;
    m_isShow: boolean;
    m_isEditVisible: boolean;
    m_isRoleVisible: boolean;
    m_isUpdatePwdVisible: boolean;
    m_objSubtab: Array<Subtab> = [];
    m_objUser: User = new User();
    m_lsFuncRoleList: Array<Check> = [];
    m_lsDataRoleList: Array<Check> = [];
    m_isCurrentUser: boolean;
        /**面包屑导航信息 */
    m_lsBreadCrumbList: Array<{name: string, routelink: string}> = [
        {name: '首页', routelink: '/home'},
        // {name: '用户管理', routelink: '/home/systemManagement/UserManage'},
        {name: '用户信息', routelink: ''}
    ];
    m_objRemoveUserCondition: RemoveUserCondition = new RemoveUserCondition();
    m_objUpdateUserCondition: UpdateUserCondition = new UpdateUserCondition();
    m_objUpdataRoleCondition: UpdataRoleCondition = new UpdataRoleCondition();
    m_objSearchUserCondition: SearchCondition<SearchUserCondition> =
        new SearchCondition<SearchUserCondition>(SearchUserCondition);
    constructor(
        public m_objSysService: SystemManagementService,
        public m_objApiService: ApiService,
        private m_objMessage: NzMessageService,
        private m_objModalService: NzModalService,
        public m_objActivatedRoute: ActivatedRoute,
        private m_objRouter: Router,
        private m_objContextService: ContextService
    ) {}

    ngOnInit() {
        this.m_nMustUserID = this.m_objContextService.m_objUserInfo.UserID;
        this.m_sUserName = this.m_objContextService.m_objUserInfo.UserName;
        this.m_objRemoveUserCondition.nRemoveUserIDMust = this.m_nMustUserID;
        this.m_objRemoveUserCondition.sRemoveUserNameMust = this.m_sUserName;
        this.m_objUpdataRoleCondition.nUpdateUserIDMust = this.m_nMustUserID;
        this.m_objUpdataRoleCondition.sUpdateUserNameMust = this.m_sUserName;
        this.m_objUpdateUserCondition.nUpdateUserIDMust = this.m_nMustUserID;
        this.m_objUpdateUserCondition.sUpdateUserNameMust = this.m_sUserName;
        this.m_objSearchUserCondition.objPageInfo.nPageNo = 1;
        this.m_objSearchUserCondition.objPageInfo.nPageSize = 1;
        this.m_objActivatedRoute.queryParams.subscribe((params: Params) => {
            this.m_nUserID = params['id'];
            if (!this.m_nUserID) {
                this.m_nUserID = this.m_objContextService.m_objUserInfo.UserID;
            }
            this.fnGetUser();
        });
    }

    /**查询用户信息 */
    fnGetUser(): void {
        this.m_objSearchUserCondition.objCondition.nSearchUserIDMust = this.m_nMustUserID;
        this.m_objSearchUserCondition.objCondition.sSearchUserNameMust = this.m_sUserName;
        this.m_objSearchUserCondition.objCondition.nUserID = this.m_nUserID;
        if (this.m_nUserID !== this.m_objContextService.m_objUserInfo.UserID) {
            this.m_isCurrentUser = false;
        } else {
            this.m_isCurrentUser = true;
        }
        this.m_objApiService
            .fnSearchUserList(this.m_objSearchUserCondition)
            .subscribe(data => {
                if (data.Code === 200) {
                    this.m_objUser = data.Data.DataSet[0];
                } else {
                    this.m_sErrorMsg = data.Msg;
                    this.m_isShow = true;
                }
            });
    }

    /**更改用户资料 */
    fnUpdateUser(): void {
        this.m_objUpdateUserCondition.nUserID = this.m_nUserID;
        this.m_objApiService
            .fnUpdateUser(this.m_objUpdateUserCondition)
            .subscribe(data => {
                if (data.Code === 200) {
                    this.m_isEditVisible = false;
                    this.m_objMessage.create('success', '修改资料成功！');
                    // 修改成功后，更新获取到的用户信息
                    if (this.m_objUpdateUserCondition.sTel) {
                        this.m_objUser.Tel = this.m_objUpdateUserCondition.sTel;
                    }
                    if (this.m_objUpdateUserCondition.sRemark) {
                        this.m_objUser.Remark = this.m_objUpdateUserCondition.sRemark;
                    }
                } else {
                    this.m_sErrorMsg = '修改资料失败！';
                    this.m_isShow = true;
                }
            });
    }

    /**获取功能权限列表 */
    fnGetFuncRoleList(): void {
        this.m_objApiService.fnGetFuncRoleList(this.m_objUpdataRoleCondition).subscribe(data => {
            if (data.Code === 200 && data.Data.length) {
                this.m_lsFuncRoleList = [];
                data.Data.forEach(item => {
                    const objRole: Check = new Check();
                    objRole.label = item.RoleName;
                    objRole.value = item.RoleID;
                    this.m_lsFuncRoleList.push(objRole);
                });
            }
        });
    }

    /**权限编辑 */
    fnUpdateRole(): void {
        this.m_objUpdataRoleCondition.nUserID = this.m_nUserID;
        if (this.m_lsFuncRoleList) {
            this.m_objUpdataRoleCondition.sRoleList = this.m_sFuncRoleList;
        }
        if (this.m_sDataRoleList) {
            this.m_objUpdataRoleCondition.sUserDataRoleList = this.m_sDataRoleList;
        }
        this.m_objApiService.fnUpdateRole(this.m_objUpdataRoleCondition).subscribe(data => {
            if (data.Code === 200) {
                this.m_objMessage.create('success', '权限编辑成功！');
                this.m_isRoleVisible = false;
            } else {
                if (data.Msg !== '') {
                    this.m_sErrorMsg = data.Msg;
                    this.m_isShow = true;
                } else {
                    this.m_sErrorMsg = '权限编辑失败！';
                    this.m_isShow = true;
                }
            }
        });
    }

    /**获取数据权限 */
    fnGetDataRoleList(): void {
        this.m_objApiService.fnGetDataRoleList(this.m_objUpdataRoleCondition).subscribe(data => {
            if (data.Code === 200 && data.Data.DataSet) {
                this.m_lsDataRoleList = [];
                data.Data.DataSet.forEach(item => {
                    const objDataRole: Check = new Check();
                    objDataRole.label = item.Fields;
                    if (item.BeginValue || item.EndValue) {
                        objDataRole.label = objDataRole.label + ':';
                        if (item.EndValue) {
                            objDataRole.label = objDataRole.label + item.BeginValue + '至' + item.EndValue;
                        }
                    }
                    objDataRole.value = item.UserDataRoleID;
                    this.m_lsDataRoleList.push(objDataRole);
                });
            }
        });
    }

    /**修改用户密码 */
    fnUpdatePassword(): void {
        this.m_objUpdateUserCondition.nUserID = this.m_nUserID;
        if (this.m_sNewPassword && this.m_sNewPassword.length >= 6) {
            if (this.m_sNewPassword === this.m_sNewPasswordnd) {
                // MD5加密
                // this.m_objUpdateUserCondition.sOldPassword = Md5.hashStr(this.m_sOldPassword).toString();
                // this.m_objUpdateUserCondition.m_sNewPassword = Md5.hashStr(this.m_sNewPassword).toString();
                this.m_objUpdateUserCondition.sOldPassword = this.m_sOldPassword;
                this.m_objUpdateUserCondition.sNewPassword = this.m_sNewPassword;
                this.m_objApiService
                    .fnUpdatePassword(this.m_objUpdateUserCondition)
                    .subscribe(data => {
                        if (data.Code === 200) {
                            this.m_sErrorMsg = '密码修改成功！';
                            this.m_isUpdatePwdVisible = false;
                        } else {
                            this.m_sErrorMsg = '密码修改失败！';
                            this.m_isShow = true;
                        }
                    });
            } else {
                this.m_sErrorMsg = '请确认新密码！';
                this.m_isShow = true;
            }
        } else {
            this.m_sErrorMsg = '密码长度至少6位!';
            this.m_isShow = true;
        }
    }

    /**更改用户状态，1:恢复、2:禁用 、3：关闭*/
    fnUpdateUserState(nState: number): void {
        this.m_objUpdateUserCondition.nUserID = this.m_nUserID;
        this.m_objUpdateUserCondition.sRemark = '修改用户状态';
        this.m_objUpdateUserCondition.nState = nState;
        this.m_objApiService
            .fnUpdateUserState(this.m_objUpdateUserCondition)
            .subscribe(data => {
                if (data.Code === 200) {
                    // this.m_nBtnState = 1;
                    this.fnGetUser();
                    this.m_objMessage.create('info', '操作成功！');
                    // this.m_objUser.State == nState;
                    this.fnGetUser();
                } else {
                    this.m_sErrorMsg = '操作失败！';
                    this.m_isShow = true;
                }
            });
    }

    /**关闭账户 */
    fnRemoveUser(): void {
        this.m_objRemoveUserCondition.nUserID = this.m_nUserID;
        this.m_objRemoveUserCondition.sRemark = '关闭用户';
        this.m_objApiService
            .fnRemoveUser(this.m_objRemoveUserCondition)
            .subscribe(data => {
                if (data.Code === 200) {
                    // this.m_nBtnState = 2;
                    this.m_objMessage.create('info', '账户关闭成功！');
                    this.fnGetUser();
                } else {
                    this.m_sErrorMsg = '操作失败！';
                    this.m_isShow = true;
                }
            });
    }

    /**禁用账户弹窗 */
    fnShowForbidConfirm(): void {
        this.m_objModalService.confirm({
            nzTitle: '提示',
            nzContent: '确定禁用该账户？',
            nzOnOk: () => this.fnUpdateUserState(2)
        });
    }

    /**恢复账户弹窗 */
    fnShowRecoveryConfirm(): void {
        this.m_objModalService.confirm({
            nzTitle: '提示',
            nzContent: '确定恢复账户使用？',
            nzOnOk: () => this.fnUpdateUserState(1)
        });
    }

    /**关闭账户弹窗 */
    fnShowRemoveConfirm(): void {
        this.m_objModalService.confirm({
            nzTitle: '提示',
            nzContent: '确定关闭该账户？',
            nzOnOk: () => this.fnRemoveUser()
        });
    }

    /**显示弹窗, 1：编辑弹窗、2：权限修改弹窗、3：修改密码弹窗 */
    fnShowModal(nVisiable: number): void {
        this.m_isVisible = true;
        this.m_nVisible = nVisiable;
        switch (this.m_nVisible) {
            case 1:
                this.m_isEditVisible = true;
                break;
            case 2:
                this.m_isRoleVisible = true;
                this.fnGetFuncRoleList();
                this.fnGetDataRoleList();
                break;
            case 3:
                this.m_isUpdatePwdVisible = true;
                break;
            default:
                this.m_isEditVisible = false;
                this.m_isRoleVisible = false;
                this.m_isUpdatePwdVisible = false;
                break;
        }
    }

    /**关闭弹窗 */
    fnHandleCancel(): void {
        this.m_isVisible = true;
        this.m_nVisible = 0;
        this.m_isEditVisible = false;
        this.m_isRoleVisible = false;
        this.m_isUpdatePwdVisible = false;
    }

    /**生成选中的权限id列表,nRoleID 1:FuncRole,2:DataRole */
    fnHandleRole(lsRoleList: Array<Check>, nRoleID: number): void {
        const lsRole: Array<number> = [];
        if (lsRoleList.length) {
            lsRoleList.forEach(item => {
                if (item.checked === true) {
                    lsRole.push(item.value);
                }
            });
            if (nRoleID === 1) {
                this.m_sFuncRoleList = '[' + String(lsRole) + ']';
            } else {
                this.m_sDataRoleList = '[' + String(lsRole) + ']';
            }
        }
    }

    /**返回按钮事件 */
    fnGoBack(): void {
        this.m_objRouter.navigate(['/main/SystemManagement/UserManage']);
        // this.m_objSearchUserCondition.objCondition =  new SearchUserCondition();
    }
}
