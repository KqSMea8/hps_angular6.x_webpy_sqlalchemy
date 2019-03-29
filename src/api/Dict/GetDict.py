# coding: utf-8
import web

from core.modules.module_handle import api_handle
from models.hps.l_dictionary import Dictionary
from utils import obj_to_dict
from utils.func_api import FuncResult

class handler(object):
    '''字典表'''

    @api_handle(db=True)
    def POST(self):
        objInput = web.input()

        nCodeType = objInput.get('nCodeType')
        return self.get_dict(nCodeType)

    def get_dict(self, nCodeType):
        lsData = []
        dictData = {}
        if nCodeType == '0':
            lsDicType = Dictionary().query.group_by(Dictionary.TypeName).all()

            for objDictType in lsDicType:
                lsDict = []
                # lsDictionary = web.ctx.cur_dbsession. \
                #     query(Dictionary.CodeID, Dictionary.CodeName,
                #           Dictionary.CodeNo, Dictionary.Flag). \
                #     filter(Dictionary.TypeName == objDictType.TypeName,
                #            Dictionary.Flag != 0).\
                #     all()

                lsDictionary = Dictionary().query. \
                    filter(Dictionary.TypeName == objDictType.TypeName,
                           Dictionary.Flag != 0). \
                    all()

                for objDict in lsDictionary:
                    lsDict.append(obj_to_dict(objDict))
                dictData[objDictType.TypeName] = lsDict
            return FuncResult(success=True, data=dictData)

        else:
            lsDict = Dictionary().query.\
                filter(Dictionary.CodeType == nCodeType).\
                all()

            for objDict in lsDict:
                dictCode = {'CodeID':objDict.CodeID , 'CodeNo':objDict.CodeNo,
                            'CodeName':objDict.CodeName, 'Flag':objDict.Flag}
                lsData.append(obj_to_dict(objDict))

            return FuncResult(success=True, data=lsData)

