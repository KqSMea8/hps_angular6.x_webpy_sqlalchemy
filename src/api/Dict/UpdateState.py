# coding: utf-8

import web

from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.s_city import City
from models.hps.s_district import District
from models.hps.s_province import Province
from utils.func_api import FuncResult

class handler(object):
    '''禁用或启用省市区
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
            # nUpdateType:  1:Province   2:City  3:District
            nUpdateType = objInput.get('nUpdateType')
            if not nUpdateType:
                return FuncResult(fail='nUpdateType为必传参数！')

            nProvinceID = objInput.get('nProvinceID')
            if not nProvinceID and nUpdateType == 1:
                return FuncResult(fail='nProvinceID为必传参数！')
            nCityID = objInput.get('nCityID')
            if not nCityID and nUpdateType == 2:
                return FuncResult(fail='nCityID为必传参数！')
            nDistrictID = objInput.get('nDistrictID')
            if not nDistrictID and nUpdateType == 3:
                return FuncResult(fail='nDistrictID为必传参数！')
            # Flag:  0:删除   1:启用   2:禁用  默认1
            nFlag = objInput.get('nFlag')
            if not nFlag:
                return FuncResult(fail='nFlag为必传参数！')

        except Exception, ce:
            return FuncResult(fail=ce)

        return self.update_date(nUpdateType, nProvinceID, nCityID, nDistrictID, nFlag)

    def update_date(self, nUpdateType, nProvinceID=None,
                     nCityID=None, nDistrictID=None, nFlag=None):
        try:
            if not nFlag:
                nFlag = 1
            # 修改省状态
            if nUpdateType == '1':
                objProvince = Province().query. \
                    filter(Province.ProvinceID == nProvinceID). \
                    first()
                objProvince.IsFlag = nFlag
                objProvince.save()
            # 修改市状态
            if nUpdateType == '2':
                objCity = City().query. \
                    filter(City.CityID == nCityID). \
                    first()
                objCity.IsFlag = nFlag
                objCity.save()
            # 修改区状态
            if nUpdateType == '3':
                objDistrict = District().query.\
                    filter(District.DistrictID == nDistrictID).\
                    first()
                objDistrict.IsFlag = nFlag
                objDistrict.save()

            return FuncResult(success=True, msg='操作成功！')
        except Exception, ce:
            return FuncResult(fail=ce)