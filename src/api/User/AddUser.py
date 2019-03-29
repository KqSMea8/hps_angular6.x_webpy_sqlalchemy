# coding: utf-8
import datetime
import web

from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.u_user import User
from utils.crypt import aes_decrypt, aes_encrypt
from utils.tools import is_null
from utils.func_api import FuncResult


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
            nAddUserIDMust = objInput.get('nAddUserIDMust')
            sAddUserNameMust = objInput.get('sAddUserNameMust')
            sUserCode = objInput.get('sUserCode')
            sPassword = objInput.get('sPassword')
            if not nAddUserIDMust :
                return FuncResult(fail='参数\'nAddUserIDMust\'不能为空')
            elif not sAddUserNameMust :
                return FuncResult(fail='参数\'sAddUserNameMust\'不能为空')
            elif not sUserCode:
                return FuncResult(fail='参数\'sUserCode\'不能为空')
            elif not sPassword:
                return FuncResult(fail='参数\'sPassword\'不能为空')
            objUserCode = User().query.filter(User.UserCode == sUserCode) \
                .first()
            if objUserCode:
                return FuncResult(msg='该用户名已存在，请重新输入!')
            sTel = objInput.get('sTel')
            sWorkCode = objInput.get('sWorkCode')
            sUserName = objInput.get('sUserName')
            sPost = objInput.get('sPost')
            sRemark = objInput.get('sRemark')

        except Exception, ce:
            # 异常处理
            return FuncResult(fail=ce)

        return self.add_user(nAddUserIDMust, sAddUserNameMust, sUserCode,
                             sPassword, sTel, sWorkCode, sUserName, sPost, sRemark)

    def add_user(self, nAddUserIDMust, sAddUserNameMust, sUserCode, sPassword,
                 sTel, sWorkCode, sUserName, sPost, sRemark):
        # 新增数据
        objUser = User()
        objUser.UserCode = sUserCode
        objUser.Password = sPassword
        # objUser.Password = aes_encrypt(sPassword)
        # 3为关闭，1为正常，2为已禁用
        objUser.State = 1
        if not is_null(sTel):
            objUser.Tel = sTel
        if not is_null(sWorkCode):
            objUser.WorkCode = sWorkCode
        if not is_null(sUserName):
            objUser.UserName = sUserName
        if not is_null(sPost):
            objUser.Post = sPost
        if not is_null(sRemark):
            objUser.Remark = sRemark
        objUser.CreateTime = datetime.datetime.now()
        # 保存更改到数据库
        objUser.save()

        return FuncResult(success=True, msg='操作成功！')
