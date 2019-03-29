# coding: utf-8
import redis
from libs.cache.fun_cache import fun_cache
from libs import web


@fun_cache(time=60)
def get_redis(): 
    return redis.StrictRedis(host=web.config.sys.session_redis.server, 
                         port=web.config.sys.session_redis.port, 
                         db=web.config.sys.session_redis.db)
    
    

def get_redis_pool(ip='127.0.0.1', port=6379, db=0):
    
    if not web.config.get('redis_pool_' + ip, None): 
        web.config['redis_pool_' + ip] = redis.ConnectionPool(host=ip, port=port, db=db)
        
    return web.config['redis_pool_' + ip]   
    
def init_cache_db():    
    if not web.config.has_key('session_store'):
        web.config['session_store'] = 'redis'
    
