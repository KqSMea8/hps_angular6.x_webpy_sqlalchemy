# coding: utf-8

import os
from libs import web
from core.log import gen_logid
from datetime import datetime

from utils import obj_to_json


def exception_log(log_id=None, exception=None):
    '''错误日志
        @Params:
            @log_id:日志ID,一次请求一个ID， 用于回溯跟踪
            @error_info:异常信息
    '''
    if not log_id:
        log_id = gen_logid() 
    
    print exception 
    obj_log = web.storage()
    obj_log.exception = exception
    obj_log.remark = ''
    obj_log.log_time = datetime.now()    
    write_exception_log(obj_log) 

def write_exception_log(obj_log):
    '''写入日志到本地文件exception_log.txt
    '''
    try:
        file = open(os.path.join(os.getcwd(),'exception_log.txt'),'a')
        file.writelines(obj_to_json(obj_log) + '\n')
    finally:
        if file:
            file.close()
