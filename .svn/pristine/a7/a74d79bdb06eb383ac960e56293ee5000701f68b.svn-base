# coding: utf-8

import web

from core.modules.module_handle import api_handle
from utils.func_api import FuncResult


class handler(object):
    '''退出
    '''
    @api_handle(db=False)
    def POST(self):
        return self.logout()

    def logout(self):
        if web.ctx.session:
            web.ctx.session.kill()

        return FuncResult(success=True, data='成功退出')