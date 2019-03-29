# coding: utf-8

import web
from sqlalchemy import or_

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
            if not objInput.get('nAddUserIDMust'):
                return FuncResult(fail='nAddUserIDMust为必传参数！')
            if not objInput.get('sAddUserNameMust'):
                return FuncResult(fail='sAddUserNameMust为必传参数！')

            nCodeType = objInput.get('nCodeType')
            if not nCodeType:
                return FuncResult(fail='nCodeType为必传参数！')
            sCodeName = objInput.get('sCodeName')
            if not sCodeName:
                return FuncResult(fail='sCodeName为必传参数！')

            sTypeName = objInput.get('sTypeName')
            nSort = objInput.get('nSort')
            sExtendInfo = objInput.get('sExtendInfo')
            nFlag = objInput.get('nFlag')
            sCodeEnumName = objInput.get('sCodeEnumName')


        except Exception, ce:
            return FuncResult(fail=ce)

        return self.add_dict(nCodeType, sTypeName, sCodeName,
                             nSort, sExtendInfo, nFlag, sCodeEnumName)

    def add_dict(self, nCodeType, sTypeName, sCodeName, nSort=None,
                 sExtendInfo=None, nFlag=1, sCodeEnumName=None):
        try:
            # 获取该字典类型总条数
            lsCode = Dictionary().query.\
                filter(Dictionary.CodeType == nCodeType).\
                all()
            # 获取该字典类型名的字段是否存在
            lsTypeName = Dictionary().query.filter(Dictionary.TypeName == sTypeName).all()

            nCount = len(lsCode)
            objDict = Dictionary()

            objDict.CodeType = nCodeType
            if nFlag:
                objDict.Flag = nFlag
            else:
                objDict.Flag = 1

            if not is_null(sCodeName):
                objDict.CodeName = sCodeName
            if not is_null(nSort):
                objDict.Sort = nSort
            if not is_null(sExtendInfo):
                objDict.ExtendInfo = sExtendInfo
            if not is_null(sCodeEnumName):
                objDict.CodeEnumName = sCodeEnumName
            if nCount:
                objDict.CodeNo = nCount + 1
                objDict.TypeName = lsCode[0].TypeName
            else:
                objDict.CodeNo = 1
                if not sTypeName:
                    return FuncResult(fail='请输入类型名称sTypeName')
                if len(lsTypeName):
                    return FuncResult(fail='类型名称'+ sTypeName +'已存在！')
                objDict.TypeName = sTypeName

            # 保存更改到数据库
            objDict.save()
        except Exception, ce:
            return FuncResult(fail=ce)

        return FuncResult(success=True, msg='操作成功！', data={'CodeID': objDict.CodeID})