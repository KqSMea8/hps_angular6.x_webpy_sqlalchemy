# coding: utf-8

import web

from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.u_user import User
from utils.func_api import FuncResult
from utils.tools import is_null


class handler(object):
    @api_handle(db=True)
    def POST(self):
        return self.data_handle()

    @dbtranscoped()
    def data_handle(self):
        '''
        获取请求参数
        '''
        objInput = web.input()
        try:
            nUserID = objInput.get('nUserID')
            strUpdateUserIDMust = objInput.get('nUpdateUserIDMust')
            strUpdateUserNameMust = objInput.get('sUpdateUserNameMust')
            strRoleList = objInput.get('sRoleList')
            strUserDataRoleList = objInput.get('sUserDataRoleList')
            if not strUpdateUserIDMust:
                return FuncResult(fail='参数\'sUpdateUserIDMust\'不能为空')
            elif not strUpdateUserNameMust:
                return FuncResult(fail='参数\'sUpdateUserNameMust\'不能为空')
        except Exception, ce:
            # 异常处理
            return FuncResult(fail='参数有误!')
        return self.update_role(nUserID, strRoleList, strUserDataRoleList)

    def update_role(self, nUserID, strRoleList, strUserDataRoleList):
        # 新增数据
        objUser = User().query.filter(User.UserID == nUserID) \
            .first()
        if objUser:
            if not is_null(nUserID):
                objUser.UserID = nUserID
            if not is_null(strRoleList):
                objUser.RoleList = strRoleList
            if not is_null(strUserDataRoleList):
                objUser.UserDataRoleList = strUserDataRoleList
            # 保存更改到数据库
            objUser.save()
        return FuncResult(success=True, msg='操作成功！', data='')
