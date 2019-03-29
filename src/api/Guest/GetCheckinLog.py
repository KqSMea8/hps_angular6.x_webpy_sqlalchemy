# coding: utf-8

import web

from core.modules.module_handle import api_handle
from models.hps.h_checkin import CheckIn
from utils import obj_to_dict
from utils.func_api import FuncResult


class handler(object):
    '''入住旅客详情查询'''

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
            if not nCheckInID.strip():
                return FuncResult(fail='参数nCheckInID值不能为空！')

        except Exception, ce:
            return FuncResult(fail=ce)

        return self.get_checkin_log(nCheckInID)

    def get_checkin_log(self, nCheckInID):
        objLog = CheckIn().query.filter(CheckIn.CheckInID == nCheckInID,
                                        CheckIn.IsNew == 1).first()

        if not objLog:
            return FuncResult(msg='无查询结果！')

        dictData = obj_to_dict(objLog)
        del dictData['CheckInID'], dictData['HotelID'], dictData['FolioCode'],\
            dictData['FolioState'], dictData['IsNew'], dictData['TableID'],\
            dictData['ArrivalTime'], dictData['DepartTime']

        return FuncResult(success=True, data=dictData)