# coding: utf-8

from libs import web

from core.modules.module_handle import api_handle
from models.hps.u_user import User

from utils import obj_to_json, obj_to_dict, get_dict, dict_to_name
from utils.crypt import aes_decrypt, md5_encrypt
from utils.func_api import FuncResult


class handler(object):
    '''登录
    '''
    @api_handle(db=True)
    def POST(self):
        get_dict()
        return self.data_handle()

    def data_handle(self):
        objInput = web.input()
        try:
            sUserCode = objInput.get('sUserCode')
            sPassword = objInput.get('sPassword')
            sCode = objInput.get('sCode')
        except Exception, ce:
            return FuncResult(fail= ce)

        return self.login(sUserCode, sPassword)

    def login(self, sUserCode, sPassword):
        '''查询数据'''
        objUser = User().query.filter(User.UserCode == sUserCode).first()
        # print User().Password.property.doc
        if not objUser:
            return FuncResult(msg='用户名错误！')

        # dictUser = obj_to_dict(objUser)
        # del dictUser['UserDataRoleList'], \
        #     dictUser['Password'], dictUser['CreateTime']
        # dictUser['StateName'] = dict_to_name(dictUser['State'], 'user_state')
        #
        # # 保存用户信息到session
        # web.ctx.session.user = dictUser

        sUserPassword = objUser.Password
        # sUserPassword = aes_decrypt(objUser.Password)
        if sUserPassword == sPassword:
            dictUser = obj_to_dict(objUser)
            del dictUser['UserDataRoleList'], \
                dictUser['Password'], dictUser['CreateTime']
            dictUser['StateName'] = dict_to_name(dictUser['State'], 'user_state')

            # 保存用户信息到session
            web.ctx.session.user = dictUser
            web.ctx.session.login = True
            return FuncResult(success=True, msg='登录成功！', data=dictUser)
        else:
            return FuncResult(msg='密码错误！')


