# coding: utf-8

from libs import web
from core.log import gen_logid
from sqlalchemy.sql.expression import text
from core.cc import get_db
from libs.orm.ormutils import dbtranscoped
from utils.func_api import FuncResult
from libs.orm.dbcontext import DBContext
from utils.tools import obj_to_dict, obj_to_json
from datetime import datetime


def init_db(conn):
    '''初始化数据库连接
        Params:
            @conn:数据库连接串
    '''

    try:
        # 如果已经存在一个数据连接则先释放

        release_db()

        # 新建一个数据库连接

        dbcontext = DBContext(conn)
        web.ctx.dbcontext = dbcontext
        web.ctx.cur_dbconn = dbcontext.dbconn
        web.ctx.cur_dbsession = dbcontext.dbsession
        web.ctx.cur_trans_count = 1

        return FuncResult(success=True)

    except Exception, ce:
        return FuncResult(fail='数据库初始化失败!')


def release_db():
    '''释放当前上下文的数据库连接
    '''
    if web.ctx.get('dbcontext') and web.ctx.dbcontext:
        web.ctx.dbcontext.release_db()

def generate_log(obj_old_value, obj_new_value):
    dict_value = obj_to_dict(obj_old_value)
    log_info = ''
    for key in dict_value.keys():
        old_value = getattr(obj_old_value, key)
        new_value = getattr(obj_new_value, key)

        if old_value != new_value:
            if log_info == '':
                log_info = key + ':' + old_value + '-->' + new_value
            else:
                log_info = log_info + ',' + key + ':' + old_value + '-->' + new_value
    write_operate_log(log_info)


def write_operate_log(log_data=None):
    '''日志记录
                    需要记录的信息:
                        日志唯一标记、操作员编号、操作员名称、日志类型、操作内容、ip、操作时间、备注
    '''
    try:
        write_log(log_data)

    except Exception, ce:
        print ce.message


def write_log(log_data=None):
    try:
        db_cc = get_db()
        if not db_cc:
            return
        init_db(db_cc)

        write_log_db(log_data)
    except:
        pass


@dbtranscoped()
def write_log_db(log_data=None):
    '''写入日志到数据库
    '''

    table_name = 'l_operating_log'

    try:

        sql = '''INSERT INTO `%s` (`WorkCode`,`UserName`,`OperaType`,`KeyWord`,`IP`,`CreateTime`,`Remark`) 
            VALUES (:WorkCode,:UserName,:OperaType,:KeyWord,:IP,:CreateTime,:Remark)'''

        if web.ctx.session.user:
            sWorkCode = web.ctx.session.user['UserCode']
            sUserName = web.ctx.session.user['UserName']
        else:
            sWorkCode = ''
            sUserName = ''
        if web.input().get('sRemark'):
            sRemark = web.input().get('sRemark')
        else:
            sRemark = ''
        web.ctx.cur_dbconn.execute(text(sql % table_name),
                                   WorkCode = sWorkCode,
                                   UserName = sUserName,
                                   OperaType = '',
                                   KeyWord = log_data or obj_to_json(obj_to_dict(web.input())),
                                   IP = web.ctx.ip,
                                   CreateTime = datetime.now(),
                                   Remark = sRemark)

    except:
        from utils.trace_except import get_cur_except
        print get_cur_except()[0]
        pass


    return FuncResult(success=True)
    
    