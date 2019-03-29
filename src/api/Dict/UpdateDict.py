# coding: utf-8

import web

from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.l_dictionary import Dictionary
from utils import is_null
from utils.func_api import FuncResult


class handler(object):
    '''修改字典
    '''
    @api_handle(db=True)
    def POST(self):
        return self.data_handle()

    @dbtranscoped()
    def data_handle(self):
        objInput = web.input()
        try:
            if not objInput.get('nUpdateUserIDMust'):
                return FuncResult(fail='nUpdateUserIDMust为必传参数！')
            if not objInput.get('sUpdateUserNameMust'):
                return FuncResult(fail='sUpdateUserNameMust为必传参数！')

            nCodeID = objInput.get('nCodeID')
            # 0:删除 1：有效 2：无效
            nFlag = objInput.get('nFlag')
            if not nCodeID:
                return FuncResult(fail='nCodeID为必传参数')
            nDictType = objInput.get('nDictType')
            sCodeName = objInput.get('sCodeName')

        except Exception, ce:
            return FuncResult(fail=ce)

        return self.update_dict(nCodeID, nDictType, sCodeName, nFlag)

    def update_dict(self, nCodeID, nDictType, sCodeName, nFlag):
        objDict = Dictionary().query.\
            filter(Dictionary.CodeID == nCodeID).\
            first()

        if objDict:
            if objDict.Flag == 0:
                return FuncResult(msg='无查询结果！')

            if not is_null(nDictType):
                objDict.CodeType = nDictType

            if not is_null(sCodeName):
                objDict.CodeName = sCodeName

            if not is_null(nFlag):
                objDict.Flag = nFlag

            # 保存更改到数据库
            objDict.save()

        return FuncResult(success=True, msg='操作成功！', data='')