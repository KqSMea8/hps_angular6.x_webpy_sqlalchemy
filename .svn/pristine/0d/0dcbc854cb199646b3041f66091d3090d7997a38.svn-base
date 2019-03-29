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
    '''增加省份
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

            nDistrictID = objInput.get('nDistrictID')
            if not nDistrictID:
                return FuncResult(fail='nDistrictID为必传参数！')

            sDistrict = objInput.get('sDistrict')
            if not sDistrict:
                return FuncResult(fail='sDistrict为必传参数！')

        except Exception, ce:
            return FuncResult(fail=ce)

        return self.update_district(nDistrictID, sDistrict)

    def update_district(self, nDistrictID, sDistrict):
        try:
            objDistrict = District().query.\
                filter(District.DistrictID == nDistrictID).\
                first()
            objDistrict.District = sDistrict
            objDistrict.save()
            return FuncResult(success=True, msg='操作成功！')
        except Exception, ce:
            return FuncResult(fail=ce)