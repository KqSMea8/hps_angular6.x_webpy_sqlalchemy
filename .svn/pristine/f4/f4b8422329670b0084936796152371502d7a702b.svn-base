# coding: utf-8

from libs import web

from core.modules.module_handle import api_handle
from utils import json_to_obj, to_datetime, obj_to_dict, dict_to_name

from libs.orm.ormutils import get_data
from models.hps.g_foreigner import Foreigner
from models.hps.g_guest_checkin import GuestCheckIn
from models.hps.h_checkin import CheckIn
from models.hps.h_hotel import Hotel
from models.hps.h_relation_checkin import RelationCheckIn
from utils.func_api import FuncResult


class handler(object):
    '''外籍旅客入住查询'''

    @api_handle(db=True)
    def POST(self):
        return self.data_handle()

    def data_handle(self):
        objInput = web.input()

        objCondition = json_to_obj(objInput.get('objCondition'))
        objPage = json_to_obj(objInput.get('objPageInfo'))

        if not objCondition:
            return FuncResult(msg='未输入查询条件！')
        else:
            if not objCondition.has_key('nSearchUserIDMust') or not objCondition['nSearchUserIDMust']:
                return FuncResult(fail='nSearchUserIDMust为必传参数！')
            if not objCondition.has_key('sSearchUserNameMust') or not objCondition['sSearchUserNameMust']:
                return FuncResult(fail='sSearchUserNameMust为必传参数！')

        return self.search_foreign_checkin(objCondition, objPage)

    def search_foreign_checkin(self, objCondition, objPage):
        lsParams = []
        dictParamsValue = {}

        if objCondition.has_key('nGuestState') and objCondition['nGuestState']:
            nGuestState = objCondition['nGuestState']
            lsParams.append('h_relation_checkin.GuestState = :nGuestState')
            dictParamsValue['nGuestState'] = nGuestState

        # 入住出示证件信息
        if objCondition.has_key('sGuestDocNameLike') and objCondition['sGuestDocNameLike']:
            sGuestDocName = '%' + objCondition['sGuestDocNameLike'] + '%'
            lsParams.append('g_guest_checkin.HotelDocName Like :sGuestDocName')
            dictParamsValue['sGuestDocName'] = sGuestDocName

        if objCondition.has_key('sDocNoLikeL') and objCondition['sDocNoLikeL']:
            sDocNo = objCondition['sDocNoLikeL'] + '%'
            lsParams.append('g_guest_checkin.HotelDocNo Like :sDocNo ')
            dictParamsValue['sDocNo'] = sDocNo

        if objCondition.has_key('nDocType') and objCondition['nDocType']:
            nDocType = objCondition['sDocNoLikeL'] + '%'
            lsParams.append('g_guest_checkin.HotelDocType Like :nDocType ')
            dictParamsValue['nDocType'] = nDocType

        if objCondition.has_key('nSex') and objCondition['nSex']:
            nSex = objCondition['nSex']
            lsParams.append('g_guest_checkin.HotelSex = :nSex')
            dictParamsValue['nSex'] = nSex

        if objCondition.has_key('sBornDateStart') and objCondition['sBornDateStart']:
            dtBornDateStart = to_datetime(objCondition['sBornDateStart'])
            lsParams.append('g_guest_checkin.HotelBornDate >= :sBornDateStart')
            dictParamsValue['sBornDateStart'] = dtBornDateStart

        if objCondition.has_key('sBornDateEnd') and objCondition['sBornDateEnd']:
            dtBornDateEnd = to_datetime(objCondition['sBornDateEnd'])
            lsParams.append('g_guest_checkin.HotelBornDate <= :sBornDateEnd')
            dictParamsValue['sBornDateEnd'] = dtBornDateEnd

        if objCondition.has_key('nMatchResult') and objCondition['nMatchResult']:
            nMatchResult = objCondition['nMatchResult']
            lsParams.append('g_guest_checkin.MatchResult = :nMatchResult')
            dictParamsValue['nMatchResult'] = nMatchResult

        # 入住酒店信息
        if objCondition.has_key('sHotelNameLike') and objCondition['sHotelNameLike']:
            sHotelName = '%' + objCondition['sHotelNameLike'] + '%'
            lsParams.append('h_hotel.HotelName Like :sHotelName')
            dictParamsValue['sHotelName'] = sHotelName

        if objCondition.has_key('nProvinceID') and objCondition['nProvinceID']:
            nProvinceID = objCondition['nProvinceID']
            lsParams.append('h_hotel.ProvinceID = :nProvinceID')
            dictParamsValue['nProvinceID'] = nProvinceID

        if objCondition.has_key('nCityID') and objCondition['nCityID']:
            nCityID = objCondition['nCityID']
            lsParams.append('h_hotel.CityID = :nCityID')
            dictParamsValue['nCityID'] = nCityID

        if objCondition.has_key('nDistrictID') and objCondition['nDistrictID']:
            nDistrictID = objCondition['nDistrictID']
            lsParams.append('h_hotel.DistrictID = :nDistrictID')
            dictParamsValue['nDistrictID'] = nDistrictID

        if objCondition.has_key('sRoomNo') and objCondition['sRoomNo']:
            sRoomNo = objCondition['sRoomNo']
            lsParams.append('h_hotel.RoomNo = :sRoomNo')
            dictParamsValue['sRoomNo'] = sRoomNo

        if objCondition.has_key('sCheckInDateTimeStart') and objCondition['sCheckInDateTimeStart']:
            dtCheckInDateTimeStart = to_datetime(objCondition['sCheckInDateTimeStart'])
            lsParams.append('h_checkin.CheckInTime >= :dtCheckInDateTimeStart')
            dictParamsValue['dtCheckInDateTimeStart'] = dtCheckInDateTimeStart

        if objCondition.has_key('sCheckInDateTimeEnd') and objCondition['sCheckInDateTimeEnd']:
            dtCheckInDateTimeEnd = to_datetime(objCondition['sCheckInDateTimeEnd'])
            lsParams.append('h_checkin.CheckInTime <= :dtCheckInDateTimeEnd')
            dictParamsValue['dtCheckInDateTimeEnd'] = dtCheckInDateTimeEnd

        # 外籍旅客信息
        if objCondition.has_key('sNationality') and objCondition['sNationality']:
            sNationality = objCondition['Nationality']
            lsParams.append('g_foreigner.Nationality = :sNationality')
            dictParamsValue['sNationality'] = sNationality

        if objCondition.has_key('sDepartureTimeStart') and objCondition['sDepartureTimeStart']:
            dtDepartureTimeStart = to_datetime(objCondition['sDepartureTimeStart'])
            lsParams.append('g_foreigner.DepartureTime > :dtDepartureTimeStart')
            dictParamsValue['dtDepartureTimeStart'] = dtDepartureTimeStart

        if objCondition.has_key('sDepartureTimeEnd') and objCondition['sDepartureTimeEnd']:
            dtDepartureTimeEnd = to_datetime(objCondition['sDepartureTimeEnd'])
            lsParams.append('g_foreigner.DepartureTime <= :dtDepartureTimeEnd')
            dictParamsValue['dtDepartureTimeEnd'] = dtDepartureTimeEnd

        if objCondition.has_key('sEntryTimeStart') and objCondition['sEntryTimeStart']:
            dtEntryTimeStart = to_datetime(objCondition['sEntryTimeStart'])
            lsParams.append('g_foreigner.EntryTime >= :dtEntryTimeStart')
            dictParamsValue['dtEntryTimeStart'] = dtEntryTimeStart

        if objCondition.has_key('sEntryTimeEnd') and objCondition['sEntryTimeEnd']:
            dtEntryTimeEnd = to_datetime(objCondition['sDepartureTimeEnd'])
            lsParams.append('g_foreigner.EntryTime <= :dtEntryTimeEnd')
            dictParamsValue['dtEntryTimeEnd'] = dtEntryTimeEnd

        if objCondition.has_key('sEntryPlace') and objCondition['sEntryPlace']:
            sEntryPlace = objCondition['sEntryPlace']
            lsParams.append('g_foreigner.EntryPlace = :sEntryPlace')
            dictParamsValue['sEntryPlace'] = sEntryPlace

        if objCondition.has_key('sDeparturePlace') and objCondition['sDeparturePlace']:
            sDeparturePlace = objCondition['sDeparturePlace']
            lsParams.append('g_foreigner.DeparturePlace = :sDeparturePlace')
            dictParamsValue['sDeparturePlace'] = sDeparturePlace

        if objCondition.has_key('sVisaType') and objCondition['sVisaType']:
            sVisaType = objCondition['sVisaType']
            lsParams.append('g_foreigner.VisaType = :sVisaType')
            dictParamsValue['sVisaType'] = sVisaType

        if objCondition.has_key('sVisaDeadline') and objCondition['sVisaDeadline']:
            dtVisaDeadline = to_datetime(objCondition['sVisaDeadline'])
            lsParams.append('g_foreigner.VisaDeadline = :dtVisaDeadline')
            dictParamsValue['dtVisaDeadline'] = dtVisaDeadline

        objSql = web.ctx.cur_dbsession.query(CheckIn, RelationCheckIn, GuestCheckIn, Foreigner, Hotel). \
            filter(CheckIn.HotelID == Hotel.HotelID,
                        RelationCheckIn.CheckInID == CheckIn.CheckInID,
                        RelationCheckIn.HotelGuestID == GuestCheckIn.HotelGuestID,
                        RelationCheckIn.GuestDocID == Foreigner.GuestDocID)

        objResult = get_data(objSql, lsParams, dictParamsValue, objPage)

        nPageCount = 0
        nRowCount = 0
        if objResult:
            if objResult.success:
                lsQueryData = objResult.data['DataList']
                nPageCount = objResult.data['PageCount']
                nRowCount = objResult.data['RowCount']

            lsData = []
            for objData in lsQueryData:
                dictCheckIn = obj_to_dict(objData[0])
                dictRelationCheckIn = obj_to_dict(objData[1])
                dictGuestCheckIn = obj_to_dict(objData[2])
                dictForeigner = obj_to_dict(objData[3])
                dictHotel = obj_to_dict(objData[4])

                del dictCheckIn['IsNew'], dictCheckIn['TableID'], \
                    dictForeigner['GuestDocID'], dictForeigner['CreateTime'], \
                    dictForeigner['TableID'], dictGuestCheckIn['TableID']
                dictGuestCheckIn['CheckInTime'] = dictRelationCheckIn['CheckInTime']
                dictGuestCheckIn['CheckOutTime'] = dictRelationCheckIn['CheckOutTime']
                dictGuestCheckIn['GuestState'] = dictRelationCheckIn['GuestState']
                dictCheckIn['HotelName'] = dictHotel['HotelName']
                dictCheckIn['HotelAddr'] = dictHotel['HotelAddr']

                # 返回字典类型字段对应名称
                # 客人状态名
                dictGuestCheckIn['GuestStateName'] = dict_to_name(dictRelationCheckIn['GuestState'], 'checkin_state')
                # 性别
                dictGuestCheckIn['HotelSexName'] = dict_to_name(dictGuestCheckIn['HotelSex'], 'sex')
                # 民族
                dictGuestCheckIn['HotelNationName'] = dict_to_name(dictGuestCheckIn['HotelNation'], 'gres_nation')
                # 证件类型
                dictGuestCheckIn['HotelDocTypeName'] = dict_to_name(dictGuestCheckIn['HotelDocType'], 'doc_type')

                # 签证类型
                dictForeigner['VisaTypeName'] = dict_to_name(dictForeigner['VisaType'], 'visa_type')
                # 国籍
                dictForeigner['NationalityName'] = dict_to_name(dictForeigner['Nationality'], 'gres_country')

                dictData = {'GuestCheckIn': dictGuestCheckIn, 'Foreigner': dictForeigner,
                            'CheckinInfo': dictCheckIn}
                lsData.append(dictData)

            return FuncResult(success=True, data={'PageNo': objPage['nPageNo'], 'PageSize': objPage['nPageSize'],
                                                  'PageCount': nPageCount, 'RowCount': nRowCount, 'DataSet': lsData})
        return FuncResult(data='', msg='无查询结果！')

