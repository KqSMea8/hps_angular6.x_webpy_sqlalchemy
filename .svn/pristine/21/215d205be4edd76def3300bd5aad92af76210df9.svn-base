# coding: utf-8

from libs import web
from utils.tools import get_server_ip, gen_nonce
import time
import hashlib

def gen_logid():
    '''获取日志ID， 如果界面或客户端没生成该ID则使用默认ID
        ID的组成：
        url + query + userid + chainid + source_key + timestamp + nonce 
        source_key是一个可标记来源的关键字, 对于服务器就是IP了， 对客户端应该的mac
    '''
    #同一个请求中的跟踪ID一致
    
    if not web.ctx.get('logid'):
        url = web.ctx.path if web.ctx.get('path') else 'nonurl'
        query = web.ctx.query if web.ctx.get('query') else 'nonquery'
        
        timestamp = str(int(round(time.time() * 1000))) 
        nonce = gen_nonce()
        source_key = ','.join(get_logip())
        web.ctx.logtrace_logid = hashlib.sha1(url + query + source_key + timestamp + nonce).hexdigest()
        
    return web.ctx.logtrace_logid

#@fun_cache(time=60)
def get_logip():
    return get_server_ip()

 