# coding: utf-8

import web
import datetime
from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.u_user import User
from models.hps.h_hotel import Hotel
from models.hps.h_checkin import CheckIn
from models.hps.h_relation_checkin import RelationCheckIn
from utils import obj_to_json
from utils.tools import to_datetime, result_data, obj_to_dict
from utils.func_api import FuncResult
import json
from sqlalchemy import and_, or_, text


class handler(object):
    @api_handle(db=True)
    def POST(self):
        return self.data_handle()

    @dbtranscoped()
    def data_handle(self):
        obj_input = web.input()
        try:
            objCondition = obj_input.get('objCondition')
            objPageInfo = obj_input.get('objPageInfo')
            dictCondition = json.loads(objCondition)
            dictPageInfo = json.loads(objPageInfo)
            if not dictCondition['nSearchUserIDMust'] or not dictCondition['sSearchUserNameMust']:
                return FuncResult(success=False, msg="Miss nSearchUserIDMust or sSearchUserNameMust!")
            if not dictCondition['nHotelID']:
                return FuncResult(success=False, msg="Miss nHotelID!")
            if not dictCondition['sCheckInStartDate']:
                return FuncResult(success=False, msg="Miss sCheckInStartDate!")
            if not dictCondition['sCheckInEndDate']:
                return FuncResult(success=False, msg="Miss sCheckInEndDate!")
        except Exception, ce:
            return FuncResult(fail='参数有误!')
        return self.search_hotel_checkin_log(dictCondition, dictPageInfo)

    def search_hotel_checkin_log(self, dictCondition, dictPageInfo):
        try:
            objParamsValue = {}
            sCheckInSql = '''
                Select
                    h_hotel.RoomCount , h_hotel.BedCount ,Count(h_checkin.CheckInID) As CheckInCount
                From
                    h_hotel INNER JOIN h_checkin ON h_hotel.HotelID = h_checkin.HotelID
                WHERE 1=1
                '''

            sGuestSql = '''
                Select
                    Count(h_relation_checkin.HotelGuestID) As GuesetCount
                From
                    h_hotel INNER JOIN h_checkin ON h_hotel.HotelID = h_checkin.HotelID
                    INNER JOIN h_relation_checkin ON h_checkin.CheckInID = h_relation_checkin.CheckInID
                WHERE 1=1
                '''

            if dictCondition.has_key('nHotelID') and dictCondition['nHotelID']:
                nHotelID = dictCondition['nHotelID']
                sCheckInSql = sCheckInSql + 'AND h_hotel.HotelID = :nHotelID '
                sGuestSql = sGuestSql + 'AND h_hotel.HotelID = :nHotelID '
                objParamsValue['nHotelID'] = nHotelID
            DateSet = []
            global objData
            objData = {}
            if dictCondition.has_key('sCheckInStartDate') and dictCondition[
                'sCheckInStartDate'] and dictCondition.has_key('sCheckInEndDate') and dictCondition['sCheckInEndDate']:
                k = 0
                dtCheckInStartDate0 = to_datetime(dictCondition['sCheckInStartDate'])
                dtCheckOutTime0 = to_datetime(dictCondition['sCheckInEndDate'])
                while dtCheckInStartDate0 <= dtCheckOutTime0:
                    dtCheckInStartDate = dtCheckInStartDate0 + datetime.timedelta(hours=23) + datetime.timedelta(
                        minutes=59) + datetime.timedelta(seconds=59)
                    dtCheckOutTime = dtCheckInStartDate0
                    sCheckInSqlNew = sCheckInSql + 'AND h_checkin.CheckInTime <= :dtCheckInStartDate '
                    sGuestSqlNew = sGuestSql + 'AND h_checkin.CheckInTime <= :dtCheckInStartDate '
                    sCheckInSqlNew = sCheckInSqlNew + 'AND h_checkin.CheckOutTime >= :dtCheckOutTime '
                    sGuestSqlNew = sGuestSqlNew + 'AND h_checkin.CheckOutTime >= :dtCheckOutTime '
                    objParamsValue['dtCheckInStartDate'] = dtCheckInStartDate
                    objParamsValue['dtCheckOutTime'] = dtCheckOutTime
                    sCheckInSqlNew = sCheckInSqlNew + "GROUP BY h_hotel.HotelID"
                    sGuestSqlNew = sGuestSqlNew + "GROUP BY h_hotel.HotelID"
                    lsQueryData = web.ctx.cur_dbconn.execute(text(sCheckInSqlNew), **objParamsValue).fetchall()
                    lsQueryData2 = web.ctx.cur_dbconn.execute(text(sGuestSqlNew), **objParamsValue).fetchall()
                    if lsQueryData:
                        for i in range(len(lsQueryData)):
                            RP1 = lsQueryData[i]
                            objData['Date'] = dtCheckInStartDate0.strftime("%Y-%m-%d")
                            objData['RoomCount'] = RP1._row[0]
                            objData['BedCount'] = RP1._row[1]
                            if RP1._row[2]:
                                objData['SumCheckInRoom'] = RP1._row[2]
                            DateSet.append(objData)
                            objData = {}
                    else:
                        objData['Date'] = dtCheckInStartDate0.strftime("%Y-%m-%d")
                        objData['RoomCount'] = 0
                        objData['BedCount'] = 0
                        DateSet.append(objData)
                        objData = {}
                    if lsQueryData2:
                        for i in range(len(lsQueryData2)):
                            if lsQueryData2[i]:
                                RP2 = lsQueryData2[i]
                                DateSet[k]['SumCheckInGuest'] = RP2._row[0]
                                objData = {}
                    else:
                        DateSet[k]['SumCheckInGuest'] = 0
                    dtCheckInStartDate0 = dtCheckInStartDate0 + datetime.timedelta(days=1)
                    sCheckInSqlNew = ''
                    sGuestSqlNew = ''
                    k += 1
            Data = {}
            Data['PangeNo'] = dictPageInfo['nPageNo']
            Data['PageSize'] = dictPageInfo['nPageSize']
            # Data['DataSet'] = []
            if DateSet:
                Data['RowCount'] = len(DateSet)
                nindexStart = (Data['PangeNo'] - 1) * Data['PageSize']
                nindexEnd = nindexStart + Data['PageSize']
                if len(DateSet) > nindexStart:
                    lsDataSet = DateSet[nindexStart: nindexEnd]
                    Data['DataSet'] = lsDataSet
                else:
                     Data['DataSet'] = []
            else:
                Data['RowCount'] = 0
            Data['LastData'] = self.search_hotel_checkin_log_lasttime(dictCondition, dictPageInfo)
        except Exception, ce:
            print Exception, ce
            return FuncResult(success=False, msg='查询出错!!')
        return FuncResult(success=True, msg='操作成功！', data=Data)

    def search_hotel_checkin_log_lasttime(self, dictCondition, dictPageInfo):
        try:
            objParamsValue = {}
            sCheckInSql = '''
                Select
                    h_hotel.RoomCount , h_hotel.BedCount ,Count(h_checkin.CheckIntime) As CheckInCount,
                    DATE_FORMAT(h_checkin.HotelLastModifyTime, '%Y-%m-%d')  as days
                From
                    h_hotel INNER JOIN h_checkin ON h_hotel.HotelID = h_checkin.HotelID
                WHERE 1=1
                '''

            sGuestSql = '''
                Select
                    Count(h_checkin.CheckIntime) As GuesetCount,DATE_FORMAT(h_checkin.HotelLastModifyTime, '%Y-%m-%d')  as days
                From
                    h_hotel INNER JOIN h_checkin ON h_hotel.HotelID = h_checkin.HotelID
                    INNER JOIN h_relation_checkin ON h_checkin.CheckInID = h_relation_checkin.CheckInID
                WHERE 1=1
                '''

            sLastModifyTimeSql = '''
                Select
                   h_checkin.HotelLastModifyTime,DATE_FORMAT(h_checkin.HotelLastModifyTime, '%Y-%m-%d')  as days
                From
                    h_hotel INNER JOIN h_checkin ON h_hotel.HotelID = h_checkin.HotelID
                WHERE 1=1
                '''

            if dictCondition['nHotelID']:
                nHotelID = dictCondition['nHotelID']
                sCheckInSql = sCheckInSql + 'AND h_hotel.HotelID = :nHotelID '
                sGuestSql = sGuestSql + 'AND h_hotel.HotelID = :nHotelID '
                sLastModifyTimeSql = sLastModifyTimeSql + 'AND h_hotel.HotelID = :nHotelID '
                objParamsValue['nHotelID'] = nHotelID
            sCheckInSql = sCheckInSql + "GROUP BY days"
            sGuestSql = sGuestSql + "GROUP BY days"
            # sOrderBy = self.order_by(1)
            sLastModifyTimeSql = sLastModifyTimeSql + self.order_by(1)
            lsQueryData = web.ctx.cur_dbconn.execute(text(sCheckInSql), **objParamsValue).fetchall()
            lsQueryData2 = web.ctx.cur_dbconn.execute(text(sGuestSql), **objParamsValue).fetchall()
            lsQueryData3 = web.ctx.cur_dbconn.execute(text(sLastModifyTimeSql), **objParamsValue).fetchall()
            objData = {}
            if lsQueryData:
                for i in range(len(lsQueryData)):
                    RP1 = lsQueryData[i]
                    objData['RoomCount'] = RP1._row[0]
                    objData['BedCount'] = RP1._row[1]
                    if RP1._row[2]:
                        objData['SumCheckInRoom'] = RP1._row[2]
            if lsQueryData2:
                for i in range(len(lsQueryData2)):
                    if lsQueryData2[i]:
                        RP2 = lsQueryData2[i]
                        objData['SumCheckInGuest'] = RP2._row[0]
            if lsQueryData3:
                for i in range(len(lsQueryData3)):
                    RP3 = lsQueryData3[i]
                    objData['Date'] = RP3._row[0]
                    objData['Date'] = objData['Date'].strftime("%Y-%m-%d")
        except Exception, ce:
            print Exception, ce
            return FuncResult(success=False, msg='查询出错!!')
        return objData

    def order_by(self,nSort):
        strOrderSql = ''
        if nSort == 1:
            strOrderSql = 'GROUP BY days Order By h_checkin.HotelLastModifyTime'
        elif nSort == 2:
            strOrderSql = 'GROUP BY days Order By h_checkin.IsNew'
        return strOrderSql