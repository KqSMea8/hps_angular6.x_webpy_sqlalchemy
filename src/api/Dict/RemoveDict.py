# coding: utf-8

import web

from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.l_dictionary import Dictionary
from utils import is_null
from utils.func_api import FuncResult


class handler(object):
    '''增加字典数据
    '''
    @api_handle(db=True)
    def POST(self):
        return self.data_handle()

    @dbtranscoped()
    def data_handle(self):
        objInput = web.input()
        try:
            if not objInput.get('nRemoveUserIDMust'):
                return FuncResult(fail='nRemoveUserIDMust为必传参数！')
            if not objInput.get('sRemoveUserNameMust'):
                return FuncResult(fail='sRemoveUserNameMust为必传参数！')

            nCodeID = objInput.get('nCodeID')
            if not nCodeID:
                return FuncResult(fail='nCodeID为必传参数！')

        except Exception, ce:
            return FuncResult(fail=ce)

        return self.remove_dict(nCodeID)

    def remove_dict(self, nCodeID):
        try:
            objDict = Dictionary().query.\
                filter(Dictionary.CodeID == nCodeID).\
                first()

            objDict.Flag = 0
            # 保存更改到数据库
            objDict.save()
        except Exception, ce:
            return FuncResult(fail=ce)

        return FuncResult(success=True, msg='操作成功！', data='')