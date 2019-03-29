# coding: utf-8
import socket

from core.modules.module_handle import api_handle
from utils.func_api import FuncResult

class handler(object):
    @api_handle(db=True)
    def POST(self):
        try:
            # 生成一个UDP包， 将自己的IP放到UDP协议头中，然后从UDP包中获取本机IP
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(('8.8.8.8', 80))
            sIPAddr = s.getsockname()[0]
        except Exception,ce:
            return FuncResult(fail=ce)

        return FuncResult(success=True, data=sIPAddr)
