# coding: utf-8
'''
Created on 2013-11-11

@author: Administrator
'''

import redis
from utils.tools import obj_to_json, json_to_obj
from libs.redis.common import get_redis_pool
 
class RedisStore():
    
    def __init__(self, ip='127.0.0.1', port=6379, db=0, initial_flush=False, expire=3600):
       
        pool = get_redis_pool(ip=ip, port=port, db = db)
        if pool:
            self.redis_server = redis.StrictRedis(connection_pool=pool)
        else:
            self.redis_server = redis.StrictRedis(host=ip, port=port, db=db)
             
        self.expire = expire
        if initial_flush: 
            self.redis_server.flushdb()
             
    def contains(self, key):
        '''是否存在对应的键值
        ''' 
        return bool(self.redis_server.get(key))
 
    def get(self, key):
        '''获取
        '''
        
        data = self.redis_server.get(key)  
        if data:
            # 更新超时时间
            self.redis_server.expire(key, self.expire)
            return json_to_obj(data)
        else:
            raise KeyError
 
    def set(self, key, value):
        '''更新并设置超时时间(默认一个小时)
        '''
        self.redis_server.set(key, obj_to_json(value))
        
        self.redis_server.expire(key, self.expire)
                
    def del_key(self, key):
        self.redis_server.delete(key)