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
            nRemoveUserIDMust = objInput.get('nRemoveUserIDMust')
            sRemoveUserNameMust = objInput.get('sRemoveUserNameMust')
            nUserID = objInput.get('nUserID')
            sRemark = objInput.get('sRemark')
            if is_null(nRemoveUserIDMust) :
                return FuncResult(fail='参数\'nRemoveUserIDMust\'不能为空')
            elif is_null(sRemoveUserNameMust) :
                return FuncResult(fail='参数\'sRemoveUserNameMust\'不能为空')
            elif is_null(nUserID) :
                return FuncResult(fail='参数\'nUserID\'不能为空')
            elif is_null(sRemark) :
                return FuncResult(fail='参数\'sRemark\'不能为空')

        except Exception, ce:
            # 异常处理
            return FuncResult(fail='参数有误！')

        return self.remove_user(nUserID, sRemark)

    def remove_user(self, nUserID, sRemark):
        objUser = User().query.filter(User.UserID == nUserID)\
                                .first()
        if objUser:
            objUser.Remark = sRemark
            objUser.State = 3
            # 保存更改到数据库
            objUser.save()
            return FuncResult(success=True, msg='关闭账户成功！')
        else:
            return FuncResult(fail='该用户编号不存在！')
