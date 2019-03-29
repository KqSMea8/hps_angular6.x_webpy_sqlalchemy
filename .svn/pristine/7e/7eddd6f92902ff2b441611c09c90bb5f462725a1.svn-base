# coding: utf-8

import web
from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.h_hotel import Hotel
from utils import obj_to_json
from utils.func_api import FuncResult
from utils.tools import is_null, to_datetime

class handler(object):
    @api_handle(db=True)
    def POST(self):
        return self.data_handle()

    @dbtranscoped()
    def data_handle(self):
        obj_input = web.input()
        try:
            nHotelIDMust = obj_input.get('nHotelIDMust')
            if not nHotelIDMust:
                return FuncResult(fail='参数：nHotelIDMust不能为空')

            nUpdateUserIDMust = obj_input.get('nUpdateUserIDMust')
            if not nUpdateUserIDMust:
                return FuncResult(fail='参数：nUpdateUserIDMust不能为空')

            sUpdateUserNameMust = obj_input.get('sUpdateUserNameMust')
            if not sUpdateUserNameMust:
                return FuncResult(fail='参数：sUpdateUserNameMust不能为空')

            sHotelCode = obj_input.get('sHotelCode')
            sHotelName = obj_input.get('sHotelName')
            sHotelAddr = obj_input.get('sHotelAddr')
            sHotelTel = obj_input.get('sHotelTel')
            sLegalTel = obj_input.get('sLegalTel')
            sLegalPerson = obj_input.get('sLegalPerson')
            sLegalDocNo = obj_input.get('sLegalDocNo')
            str_coordinate = obj_input.get('sCoordinate')
            nProvinceID = obj_input.get('nProvinceID')
            nCityID = obj_input.get('nCityID')
            nDistrictID = obj_input.get('nDistrictID')
            nHotelType = obj_input.get('nHotelType')
            sResponPersonTel = obj_input.get('sResponPersonTel')
            sResponPerson = obj_input.get('sResponPerson')
            nRoomCount = obj_input.get('nRoomCount')
            nBedCount = obj_input.get('nBedCount')
            sBusLicenseCode = obj_input.get('sBusLicenseCode')
            sBusLicenseName = obj_input.get('sBusLicenseName')
            sRemark = obj_input.get('sRemark')
            sRegStartTime = obj_input.get('sRegStartTime')

        except Exception, ce:
            return FuncResult(fail='参数有误!')

        return self.update_hotel(nHotelIDMust, nUpdateUserIDMust, sUpdateUserNameMust, sHotelCode,
                                 sHotelName, sHotelAddr, sHotelTel, sLegalTel, sLegalPerson,
                                 sLegalDocNo, str_coordinate, nProvinceID, nCityID, nDistrictID,
                                 nHotelType, sResponPersonTel, sResponPerson, nRoomCount,
                                 nBedCount, sBusLicenseCode, sBusLicenseName, sRemark, sRegStartTime)

    def update_hotel(self, nHotelIDMust,  nUpdateUserIDMust, sUpdateUserNameMust, sHotelCode,
                     sHotelName, sHotelAddr,sHotelTel, sLegalTel, sLegalPerson, sLegalDocNo,
                     str_coordinate, nProvinceID, nCityID, nDistrictID,nHotelType, sResponPersonTel,
                     sResponPerson, nRoomCount, nBedCount, sBusLicenseCode, sBusLicenseName,
                     sRemark, sRegStartTime):
        # 查找酒店
        obj_hotel = Hotel().query.filter(Hotel.HotelID == nHotelIDMust).first()

        if not is_null(nHotelType):
            obj_hotel.HotelCode = sHotelCode
        if not is_null(sHotelName):
            obj_hotel.HotelName = sHotelName
        if not is_null(sHotelAddr):
            obj_hotel.HotelAddr = sHotelAddr
        if not is_null(sHotelTel):
            obj_hotel.HotelTel = sHotelTel
        if not is_null(sLegalTel):
            obj_hotel.LegalTel = sLegalTel
        if not is_null(sLegalPerson):
            obj_hotel.LegalPerson = sLegalPerson
        if not is_null(sLegalDocNo):
            obj_hotel.LegalDocNo = sLegalDocNo
        if not is_null(str_coordinate):
            obj_hotel.Coordinate = str_coordinate
        if not is_null(nProvinceID):
            obj_hotel.ProvinceID = nProvinceID
        if not is_null(nCityID):
            obj_hotel.CityID = nCityID
        if not is_null(nDistrictID):
            obj_hotel.DistrictID = nDistrictID
        if not is_null(nHotelType):
            obj_hotel.HotelType = nHotelType
        if not is_null(sResponPersonTel):
            obj_hotel.ResponPersonTel = sResponPersonTel
        if not is_null(sResponPerson):
            obj_hotel.ResponPerson = sResponPerson
        if not is_null(nRoomCount):
            obj_hotel.RoomCount = nRoomCount
        if not is_null(nBedCount):
            obj_hotel.BedCount = nBedCount
        if not is_null(sBusLicenseCode):
            obj_hotel.BusLicenseCode = sBusLicenseCode
        if not is_null(sBusLicenseName):
            obj_hotel.BusLicenseName = sBusLicenseName
        if not is_null(sRemark):
            obj_hotel.Remark = sRemark
        if not is_null(sRegStartTime):
            obj_hotel.RegStartTime = to_datetime(sRegStartTime)
        # 保存到数据库
        obj_hotel.save()
        return FuncResult(success=True, msg='酒店资料修改成功!')