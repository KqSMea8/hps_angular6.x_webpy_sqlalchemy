# coding: utf-8

import web

from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from utils.func_api import FuncResult
from utils import obj_to_dict
from models.hps.s_district import District

class handler(object):
    @api_handle(db=True)
    def POST(self):
        return self.get_City()

    @dbtranscoped()
    def get_City(self):
        lsDataSet = District().query.filter(District.IsFlag != 0).all()
        lsData = []
        for objData in lsDataSet:
            lsData.append(web.storage(**obj_to_dict(objData.copy(bind=False))))
        return FuncResult(success=True, msg='操作成功！',data=lsData)
