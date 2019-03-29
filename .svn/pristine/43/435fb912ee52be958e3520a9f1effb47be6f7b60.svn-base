# coding: utf-8

import web
from sqlalchemy import and_

from core.modules.module_handle import api_handle
from models.hps.h_checkin import CheckIn
from utils import obj_to_dict

from models.hps.h_relation_checkin import RelationCheckIn
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

            nHotelGuestID = objInput.get('nHotelGuestID')
            if not nHotelGuestID.strip():
                return FuncResult(fail='参数nHotelGuestID值不能为空！')

        except Exception, ce:
            return FuncResult(fail=ce)

        return self.get_checkin_log_list(nHotelGuestID)

    def get_checkin_log_list(self, nHotelGuestID):
        lsCheckin = RelationCheckIn().query.filter(RelationCheckIn.HotelGuestID == nHotelGuestID).all()

        lsLog = []
        for objCheckIn in lsCheckin:
            objLog = CheckIn().query.filter(CheckIn.CheckInID == objCheckIn.CheckInID,
                                        CheckIn.IsNew == 1).first()
            if(objLog):
                dictData = obj_to_dict(objLog)
                del dictData['CheckInID'], dictData['HotelID'], dictData['FolioCode'], \
                    dictData['FolioState'], dictData['IsNew'], dictData['TableID'], \
                    dictData['ArrivalTime'], dictData['DepartTime']

                lsLog.append(obj_to_dict(objLog))

        if not len(lsLog):
            return FuncResult(msg='无查询结果！')


        return FuncResult(success=True, data=lsLog)