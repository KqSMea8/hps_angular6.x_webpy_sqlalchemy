# coding: utf-8

import web
import datetime

from sqlalchemy import and_
from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.h_hotel import Hotel
from models.hps.u_user import User
from utils import obj_to_dict
from utils.func_api import FuncResult
from utils.tools import is_null, to_datetime


class handler(object):
    @api_handle(db=True)
    def POST(self):
        return self.data_handle()

    @dbtranscoped()
    def data_handle(self):
        # 获取请求参数
        objInput = web.input()

        try:
            nAddUserIDMust = objInput.get('nAddUserIDMust')
            if is_null(nAddUserIDMust):
                return FuncResult(fail='参数：nAdduserIDmust不能为空')

            sAddUserNameMust = objInput.get('sAddUserNameMust')
            if is_null(sAddUserNameMust):
                return FuncResult(fail='参数：sAddUserNameMust不能为空')

            sHotelCode = objInput.get('sHotelCode')
            if is_null(sHotelCode):
                return FuncResult(fail='参数：sHotelCode不能为空')

            sHotelName = objInput.get('sHotelName')
            if is_null(sHotelName):
                return FuncResult(fail='参数：sHotelName不能为空')

            sHotelAddr = objInput.get('sHotelAddr')
            if is_null(sHotelAddr):
                return FuncResult(fail='参数：sHotelAddr不能为空')
            sHotelTel = objInput.get('sHotelTel')
            if is_null(sHotelTel):
                return FuncResult(fail='参数：sHotelTel不能为空')
            sLegalTel = objInput.get('sLegalTel')
            if is_null(sLegalTel):
                return FuncResult(fail='参数：sLegalTel不能为空')
            sLegalPerson = objInput.get('sLegalPerson')
            if is_null(sLegalPerson):
                return FuncResult(fail='参数：sLegalPerson不能为空')
            sLegalDocNo = objInput.get('sLegalDocNo')
            if is_null(sLegalDocNo):
                return FuncResult(fail='参数：sLegalDocNo不能为空')
            sCoordinate = objInput.get('sCoordinate')
            nProvinceID = objInput.get('nProvinceID')
            if is_null(nProvinceID):
                return FuncResult(fail='参数：nProvinceID不能为空')

            nCityID = objInput.get('nCityID')
            if is_null(nCityID):
                return FuncResult(fail='参数：nCityID不能为空')

            nDistrictID = objInput.get('nDistrictID')
            if is_null(nDistrictID):
                return FuncResult(fail='参数：nDistrictID不能为空')

            nHotelType = objInput.get('nHotelType')
            if is_null(nHotelType):
                return FuncResult(fail='参数：nHotelType不能为空')
            nCreatUserID = objInput.get('nCreatUserID')
            if is_null(nCreatUserID):
                return FuncResult(fail='参数：nCreatUserID不能为空')
            sCreatUserCode = objInput.get('sCreatUserCode')
            if is_null(sCreatUserCode):
                return FuncResult(fail='参数：sCreatUserCode不能为空')
            sResponPersonTel = objInput.get('sResponPersonTel')
            if is_null(sResponPersonTel):
                return FuncResult(fail='参数：sResponPersonTel不能为空')
            sResponPerson = objInput.get('sResponPerson')
            if is_null(sResponPerson):
                return FuncResult(fail='参数：sResponPerson不能为空')
            nRoomCount = objInput.get('nRoomCount')
            if is_null(nRoomCount):
                return FuncResult(fail='参数：nRoomCount不能为空')
            nBedCount = objInput.get('nBedCount')
            if is_null(nBedCount):
                return FuncResult(fail='参数：nBedCount能为空')
            sBusLicenseCode = objInput.get('sBusLicenseCode')
            if is_null(sBusLicenseCode):
                return FuncResult(fail='参数：sBusLicenseCode不能为空')
            sBusLicenseName = objInput.get('sBusLicenseName')
            if is_null(sBusLicenseName):
                return FuncResult(fail='参数：sBusLicenseName不能为空')
            sRegStartTime = objInput.get('sRegStartTime')
            if is_null(sRegStartTime):
                return FuncResult(fail='参数：sRegStartTime不能为空')
            sRemark = objInput.get('sRemark')

        except Exception, ce:
            # 异常处理
            return FuncResult(fail='参数有误!')

        return self.add_hotel(sHotelCode, sHotelName, sHotelAddr, sHotelTel, sLegalTel, sLegalPerson, sLegalDocNo,
                              sCoordinate, nProvinceID, nCityID, nDistrictID, nHotelType, nCreatUserID, sCreatUserCode,
                              sResponPersonTel, sResponPerson, nRoomCount, nBedCount, sBusLicenseCode, sBusLicenseName,
                              sRegStartTime, sRemark)

    def add_hotel(self, sHotelCode, sHotelName, sHotelAddr, sHotelTel, sLegalTel, sLegalPerson, sLegalDocNo,
                  sCoordinate, nProvinceID, nCityID, nDistrictID, nHotelType, nCreatUserID, sCreatUserCode,
                  sResponPersonTel, sResponPerson, nRoomCount, nBedCount, sBusLicenseCode, sBusLicenseName,
                  sRegStartTime, sRemark):

        try:
            # 实例化一个Hotel类
            objHotel = Hotel()

            # 赋值
            if not is_null(sHotelCode):
                objHotel.HotelCode = sHotelCode
            if not is_null(sHotelName):
                objHotel.HotelName = sHotelName
            if not is_null(sHotelAddr):
                objHotel.HotelAddr = sHotelAddr
            if not is_null(sHotelTel):
                objHotel.HotelTel = sHotelTel
            if not is_null(sLegalTel):
                objHotel.LegalTel = sLegalTel
            if not is_null(sLegalPerson):
                objHotel.LegalPerson = sLegalPerson
            if not is_null(sLegalDocNo):
                objHotel.LegalDocNo = sLegalDocNo
            if not is_null(sCoordinate):
                objHotel.Coordinate = sCoordinate
            if not is_null(nProvinceID):
                objHotel.ProvinceID = nProvinceID
            if not is_null(nCityID):
                objHotel.CityID = nCityID
            if not is_null(nDistrictID):
                objHotel.DistrictID = nDistrictID
            if not is_null(nHotelType):
                objHotel.HotelType = nHotelType
            if not is_null(nCreatUserID):
                objHotel.CreateUserID = nCreatUserID
            if not is_null(sCreatUserCode):
                objHotel.CreateUserName = sCreatUserCode
            if not is_null(sResponPersonTel):
                objHotel.ResponPersonTel = sResponPersonTel
            if not is_null(sResponPerson):
                objHotel.ResponPerson = sResponPerson
            if not is_null(nRoomCount):
                objHotel.RoomCount = nRoomCount
            if not is_null(nBedCount):
                objHotel.BedCount = nBedCount
            if not is_null(sBusLicenseCode):
                objHotel.BusLicenseCode = sBusLicenseCode
            if not is_null(sBusLicenseName):
                objHotel.BusLicenseName = sBusLicenseName
            if not is_null(sRegStartTime):
                objHotel.RegStartTime = to_datetime(sRegStartTime)
            if not is_null(sRemark):
                objHotel.Remark = sRemark
            # 0：待审核，1：已审核，2：审核不通过
            objHotel.AuditState = 6
            objHotel.ApplyTime = datetime.datetime.now()
            objHotel.CreateTime = datetime.datetime.now()
            # 保存到数据库
            objHotel.save()
        except Exception,ce:
            pass
        finally:
            sLog = objHotel.GetLogDescription()

        return FuncResult(success=True, msg='酒店新增成功!')

