# coding: utf-8

from libs import web

from core.modules.module_handle import api_handle

from models.hps.g_guest_checkin import GuestCheckIn
from models.hps.g_guest_doc import GuestDoc
from models.hps.h_checkin import CheckIn
from models.hps.h_hotel import Hotel
from models.hps.h_relation_checkin import RelationCheckIn

from utils import obj_to_dict, dict_to_name
from utils.func_api import FuncResult


class handler(object):
    '''入住旅客详情查询'''

    @api_handle(db=True)
    def POST(self):
        return self.data_handle()

    def data_handle(self):
        objInput = web.input()

        try:
            if not objInput.get('nSearchUserIDMust'):
                return FuncResult(fail='nSearchUserIDMust为必传参数！')
            if not objInput.get('sSearchUserNameMust'):
                return FuncResult(fail='sSearchUserNameMust为必传参数！')

            nCheckInID = objInput.get('nCheckInID')
            if not nCheckInID.strip():
                return FuncResult(fail='参数nCheckInID值不能为空！')

        except Exception, ce:
            return FuncResult(fail=ce)

        return self.get_checkin_detail(nCheckInID)

    def get_checkin_detail(self, nCheckInID):
        objCheckIn = CheckIn().query.filter(CheckIn.CheckInID == nCheckInID).first()
        dictCheckIn = obj_to_dict(objCheckIn)
        del dictCheckIn['TableID'], dictCheckIn['IsNew']

        objHotel = Hotel().query.filter(Hotel.HotelID == dictCheckIn['HotelID']).first()
        # dictHotel = obj_to_dict(objHotel)
        dictCheckIn['HotelName'] = objHotel.HotelName

        lsGuestCheckIn = web.ctx.cur_dbsession.query(GuestCheckIn, RelationCheckIn, GuestDoc).\
            filter(RelationCheckIn.CheckInID == nCheckInID,
                   RelationCheckIn.HotelGuestID == GuestCheckIn.HotelGuestID,
                   RelationCheckIn.GuestDocID == GuestDoc.GuestDocID).all()

        if not objCheckIn and len(lsGuestCheckIn) <= 0:
            return FuncResult(success=True, msg='')

        lsData = []
        for tupData in lsGuestCheckIn:
            dictGuestCheckin = obj_to_dict(tupData[0])
            dictRelationCheckIn = obj_to_dict(tupData[1])
            dictGuestDoc = obj_to_dict(tupData[2])

            del dictGuestCheckin['TableID'], dictGuestDoc['TableID']
            dictGuestCheckin['CheckInTime'] = dictRelationCheckIn['CheckInTime']
            dictGuestCheckin['CheckOutTime'] = dictRelationCheckIn['CheckOutTime']
            dictGuestCheckin['GuestState'] = dictRelationCheckIn['GuestState']

            # 返回字典类型字段对应名称
            # 客人状态名
            dictGuestCheckin['GuestStateName'] = dict_to_name(dictRelationCheckIn['GuestState'], 'checkin_state')
            # 性别
            dictGuestCheckin['HotelSexName'] = dict_to_name(dictGuestCheckin['HotelSex'], 'sex')
            # 民族
            dictGuestCheckin['HotelNationName'] = dict_to_name(dictGuestCheckin['HotelNation'], 'gres_nation')
            # 证件类型
            dictGuestCheckin['HotelDocTypeName'] = dict_to_name(dictGuestCheckin['HotelDocType'], 'doc_type')

            # 证件类型
            dictGuestDoc['DocTypeName'] = dict_to_name(dictGuestDoc['DocType'], 'doc_type')
            # 性别
            dictGuestDoc['SexName'] = dict_to_name(dictGuestDoc['Sex'], 'sex')
            # 民族
            dictGuestDoc['NationName'] = dict_to_name(dictGuestDoc['Nation'], 'gres_nation')
            # 客人状态
            dictGuestDoc['StateName'] = dict_to_name(dictGuestDoc['State'], 'checkin_state')

            dictData = {'GuestCheckIn': dictGuestCheckin, 'GuestDoc': dictGuestDoc}
            lsData.append(dictData)

        return FuncResult(success=True, msg='', data={'CheckinInfo': dictCheckIn, 'GuestInfo': lsData})