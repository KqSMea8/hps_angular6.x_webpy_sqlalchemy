# coding: utf-8

import web

from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.h_hotel import Hotel
from utils.func_api import FuncResult
from utils.tools import is_null


class handler(object):
    @api_handle(db=True)
    def POST(self):
        return self.data_handle()

    @dbtranscoped()
    def data_handle(self):
        objInput = web.input()
        try:
            nHotelIDMust = objInput.get('nHotelIDMust')
            if is_null(nHotelIDMust):
                return FuncResult(fail='参数：nHotelIDMust不能为空')

            nOffLineUserIDMust = objInput.get('nOffLineUserIDMust')
            if is_null(nOffLineUserIDMust):
                return FuncResult(fail='参数：nOffLineUserIDMust不能为空')

            sOffLineUserNameMust = objInput.get('sOffLineUserNameMust')
            if is_null(sOffLineUserNameMust):
                return FuncResult(fail='参数：sOffLineUserNameMust不能为空')

            sOffLineDateTimeMust = objInput.get('sOffLineDateTimeMust')
            if is_null(sOffLineDateTimeMust):
                return FuncResult(fail='参数：sOffLineDateTimeMust不能为空')

            sRemark = objInput.get('sRemark')

        except Exception, ce:
            return FuncResult(fail='参数有误!')

        return self.offline_hotel(nHotelIDMust, nOffLineUserIDMust, sOffLineUserNameMust, sOffLineDateTimeMust, sRemark)

    def offline_hotel(self, nHotelIDMust, nOffLineUserIDMust, sOffLineUserNameMust, sOffLineDateTimeMust, sRemark):
        # 查找酒店
        objHotel = Hotel().query.filter(Hotel.HotelID == nHotelIDMust).first()
        # 0：正常营业，1：已下线
        objHotel.State = 1
        objHotel.Remark = sRemark
        # 保存到数据库
        objHotel.save()
        return FuncResult(success=True, msg='旅店注销成功!')

