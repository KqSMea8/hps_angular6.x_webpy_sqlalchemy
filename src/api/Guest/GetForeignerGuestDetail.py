# coding: utf-8

from libs import web

from core.modules.module_handle import api_handle
from models.hps.g_foreigner import Foreigner
from utils import obj_to_dict, dict_to_name
from utils.func_api import FuncResult


class handler(object):
    '''外籍入住旅客详情查询'''

    @api_handle(db=True)
    def POST(self):
        return self.data_handle()

    def data_handle(self):
        objInput = web.input()

        try :
            if not objInput.get('nSearchUserIDMust'):
                return FuncResult(fail='nSearchUserIDMust为必传参数！')
            if not objInput.get('sSearchUserNameMust'):
                return FuncResult(fail='sSearchUserNameMust为必传参数！')

            nCheckInID = objInput.get('nCheckInID')
            print 'nCheckInID=', nCheckInID
            if not nCheckInID.strip():
                return FuncResult(fail='nCheckInID值不能为空！')

        except Exception, ce:
            return FuncResult(fail=ce)

        return self.get_foreigner_guest_detail(nCheckInID)

    def get_foreigner_guest_detail(self, nCheckInID):
        objForeigner = Foreigner().query.\
            filter(Foreigner.GuestDocID == nCheckInID).\
            first()

        if not objForeigner:
            return FuncResult(msg='无查询结果！')

        dictData = obj_to_dict(objForeigner)
        del dictData['GuestDocID']
        del dictData['CreateTime']

        # 签证类型
        dictData['VisaTypeName'] = dict_to_name(dictData['VisaType'], 'visa_type')
        # 国籍
        dictData['NationalityName'] = dict_to_name(dictData['Nationality'], 'gres_country')

        return FuncResult(success=True, msg='', data=dictData)