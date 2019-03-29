# coding: utf-8

import functools

from core.log.operate_log import write_operate_log
from libs import web  
from libs.orm.dbcontext import DBContext
from utils.func_api import FuncResult
from utils.trace_except import get_cur_except 
from core.log.exception_log import exception_log 
from core.cc import get_db

def api_handle(*arg, **kwarg):
    '''接口请求处理
        Params:
            @dict_params:参数字典
    '''
    def trace_wrapper(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            try:
                #如果接口需要处理数据库则需要检查数据类连接对象是否存在
                if kwarg and kwarg.get('db'):
                    db_con = get_db()
                    if not db_con:
                        return FuncResult(fail='未能获取基本信息！')

                    # 初始化数据库连接
                    init_db(db_con)
                result = func(*args, **kwargs)

                # 如果请求成功
                if result.success:
                    write_operate_log()
                        
            except Exception, ce: 
                error = get_cur_except()
                exception_log(exception=error)
                
                result = FuncResult(fail='请求处理出错！' + str(ce.message))
                if error:
                    result = FuncResult(fail='请求处理出错！' + str(ce.message) + str(error[1]))  
                
            #不管什么情况下都尝试释放数据库连接
            release_db()
            
            return result
        return wrapper
    return trace_wrapper

 

def init_db(conn):
    '''初始化数据库连接
        Params:
            @conn:数据库连接串
    '''
     
    try:  
        #如果已经存在一个数据连接则先释放
        
        release_db() 
        
        #新建一个数据库连接
        
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
        
 

    

