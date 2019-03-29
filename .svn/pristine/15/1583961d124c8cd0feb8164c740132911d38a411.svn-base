# coding: utf-8
'''
Created on 2013-11-11

@author: Administrator
'''

import redis
from libs import web 
from utils.tools import obj_to_json, json_to_obj, obj_to_dict
from libs.redis.common import init_cache_db, get_redis_pool
 
class RedisStore(web.session.Store):
    
    def __init__(self, ip='127.0.0.1', port=6379, db=0, initial_flush=False, key='session:'):
        init_cache_db()
        self.redis_key = key
        pool = get_redis_pool(ip=ip, port=port, db = db)
        if pool:
            self.redis_server = redis.StrictRedis(connection_pool=pool)
        else:
            self.redis_server = redis.StrictRedis(host=ip, port=port, db=db)
             
        if initial_flush:
            self.redis_server.flushdb()
    
    def __contains__(self, key):
        '''是否存在对应的键值
        '''
        return bool(self.redis_server.get(self.redis_key + key))
         
 
    def __getitem__(self, key):
        '''获取session
        '''  
        data = self.redis_server.get(self.redis_key + key)
        if data:
            # 更新超时时间
            self.redis_server.expire(self.redis_key + key,
                                     web.webapi.config.session_parameters.timeout)
            return json_to_obj(data)
        else:
            raise KeyError

    def __setitem__(self, key, value):
        '''更新session并设置超时时间
        '''
        self.redis_server.set(self.redis_key + key,
                              obj_to_json(value))

        self.redis_server.expire(self.redis_key + key,
                                 web.webapi.config.session_parameters.timeout)

    def __delitem__(self, key):
        self.redis_server.delete(self.redis_key + key)

    def cleanup(self, timeout):
        '''这里使用了redis的超时设置， 不需要再实现
        '''
        pass