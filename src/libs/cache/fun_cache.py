# coding: utf-8

import collections
import functools
from datetime import datetime
from libs import web 
from utils.func_api import FuncResult

class CacheObjBase(object):
    pass
   
def fun_cache(time=30):
    '''缓存函数的调用结果
        Params:
            @func:要缓存的函数
            @time:缓存的时间， 以分钟为单位， 默认缓存30分钟， 30分钟后失效
    '''
    web.cache.fun_cache = {}
    kwd_mark = object()  
    
    def cache_wrapper(func): 
        @functools.wraps(func)
        def cache_fun(*args, **kwargs):  
            #return func(*args, **kwargs) #测试的时候不缓存 
            key = args
            
            if len(args) > 0 and isinstance(args[0], CacheObjBase): 
                key = ('CacheArgs',)
                if len(args) > 1: 
                    key = args[1:] 
                
                     
            #清空一下缓存
            clear_cache() 
            
            if not isinstance(key, collections.Hashable):return func(*args, **kwargs)
             
            #不设置时间则返回调用
            if time <= 0:return func(*args, **kwargs)
             
            key += (func.__module__,)
            key += (func.__name__,)
            
            if kwargs:
                key += (kwd_mark,) + tuple(sorted(kwargs.items())) 
          
            
            if not web.cache.fun_cache.has_key(key):
                result = func(*args, **kwargs)
                if isinstance(result, FuncResult):
                    #只有成功的时候才缓存
                    if result.success:
                        web.cache.fun_cache[key] = (datetime.now(), result)
                    else:
                        return result
                else:
                    web.cache.fun_cache[key] = (datetime.now(), result)
             
            #如果超时则重新调用 
            if (datetime.now() - web.cache.fun_cache[key][0]).total_seconds() > time * 60:
               
                result = func(*args, **kwargs)
                if isinstance(result, FuncResult):
                    #只有成功的时候才缓存
                    if result.success:
                        web.cache.fun_cache[key] = (datetime.now(), result)
                else:
                    web.cache.fun_cache[key] = (datetime.now(), result)
             
            return web.cache.fun_cache[key][1]
        
        return cache_fun
    return cache_wrapper


def clear_cache():
    return
    for key in web.cache.fun_cache.keys(): 
        #如果超过一天的则需要清理缓存
        #默认最大缓存一天
        if (datetime.now() - web.cache.fun_cache[key][0]).total_seconds() > 86400:
            del web.cache.fun_cache[key]