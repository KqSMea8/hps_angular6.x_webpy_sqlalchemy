# coding: utf-8

import web
from sqlalchemy import or_

from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.l_dictionary import Dictionary
from models.hps.s_district import District
from models.hps.s_province import Province
from utils import is_null
from utils.func_api import FuncResult

class handler(object):
    '''增加区
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

            sDistrict = objInput.get('sDistrict')
            if not sDistrict:
                return FuncResult(fail='sDistrict为必传参数！')
            nCityID = objInput.get('nCityID')
            if not nCityID:
                return FuncResult(fail='nCityID为必传参数！')
            nProvinceID = objInput.get('nProvinceID')

        except Exception, ce:
            return FuncResult(fail=ce)

        return self.add_province(sDistrict, nCityID, nProvinceID)

    def add_province(self, sDistrict, nCityID, nProvinceID = None):
        try:
            objDistrict = District()
            objDistrict.District = sDistrict
            objDistrict.CityID = nCityID
            objDistrict.IsFlag = 1
            if nProvinceID:
                objDistrict.ProvinceID = nProvinceID

            objDistrict.save()
            nDistrictID = objDistrict.DistrictID
            return FuncResult(success=True, data={'DistrictID': nDistrictID})
        except Exception, ce:
            return FuncResult(fail=ce)