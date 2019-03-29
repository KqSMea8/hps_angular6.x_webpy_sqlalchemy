# coding: utf-8

from core.modules.module_handle import api_handle
from utils.func_api import FuncResult

class handler(object):
    @api_handle(db=True)
    def POST(self):
        try:
            sPrefix = 'static/'
        except Exception,ce:
            return FuncResult(fail=ce)

        return FuncResult(success=True, data=sPrefix)