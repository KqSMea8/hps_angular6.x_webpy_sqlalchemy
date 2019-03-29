# coding: utf-8

import web

from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.u_user import User
from utils.func_api import FuncResult
from utils.tools import is_null
from utils import obj_to_json


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
            nUpdateUserIDMust = objInput.get('nUpdateUserIDMust')
            sUpdateUserNameMust = objInput.get('sUpdateUserNameMust')
            nUserID = objInput.get('nUserID')
            sNewPassword = objInput.get('sNewPassword')
            if is_null(nUpdateUserIDMust) :
                return FuncResult(fail='参数\'nUpdateUserIDMust\'不能为空')
            elif is_null(sUpdateUserNameMust) :
                return FuncResult(fail='参数\'sUpdateUserNameMust\'不能为空')
            elif is_null(nUserID) :
                return FuncResult(fail='参数\'nUserID\'不能为空')
            elif is_null(sNewPassword) :
                return FuncResult(fail='参数\'sNewPassword\'不能为空')

        except Exception, ce:
            # 异常处理
            return FuncResult(fail='参数有误！')

        return self.reset_password(nUserID, sNewPassword)

    def reset_password(self, nUserID, sNewPassword):
        objUser = User().query.filter(User.UserID == nUserID)\
                                .first()
        if objUser:
            # 修改密码
            objUser.Password = sNewPassword
            # 保存更改到数据库
            objUser.save()
            return FuncResult(success=True, msg='密码修改成功！')
        else:
            return FuncResult(fail='该用户编号不存在！')