# coding: utf-8

import web

from core.modules.module_handle import api_handle
from libs.orm.ormutils import dbtranscoped
from models.hps.u_data_role import DataRole
from models.hps.u_user_data_role import UserDataRole
from utils.func_api import FuncResult
from utils.tools import to_datetime, days_count, obj_to_dict, result_data, json_to_obj


class handler(object):
    @api_handle(db=True)
    def POST(self):
        return self.data_handle()

    @dbtranscoped()
    def data_handle(self):
        '''
        获取请求参数
        '''
        objInput = web.input()
        try:
            strUpdateUserIDMust = objInput.get('nUpdateUserIDMust')
            strUpdateUserNameMust = objInput.get('sUpdateUserNameMust')
            if not strUpdateUserIDMust:
                return FuncResult(fail='参数\'sUpdateUserIDMust\'不能为空')
            elif not strUpdateUserNameMust:
                return FuncResult(fail='参数\'sUpdateUserNameMust\'不能为空')
        except Exception, ce:
            # 异常处理
            return FuncResult(fail='参数有误!')

        return self.get_date_code_list(DataRole, UserDataRole)

    def get_date_code_list(self, DataRole, UserDataRole):
        lsDateSet = DataRole().query2(DataRole, UserDataRole).join(UserDataRole,
                                                                   DataRole.DataRoleID == UserDataRole.DataRoleID).all()
        lsData = []
        RowCount = len(lsDateSet)
        objResData = {}
        for objData in lsDateSet:
            DataRole = objData[0]
            UserDataRole = objData[1]
            dictUserDataRole = web.storage(**obj_to_dict(UserDataRole.copy(bind=False)))
            dictUserDataRole['UserDataRoleFlag'] = dictUserDataRole['Flag']
            dictUserDataRole.pop('Flag')
            dictData = dict(web.storage(**obj_to_dict(DataRole.copy(bind=False))).items() + dictUserDataRole.items())
            lsData.append(dictData)
        objResData['RowCount'] = RowCount
        objResData['DataSet'] = lsData
        return FuncResult(success=True, msg='操作成功！', data=objResData)
