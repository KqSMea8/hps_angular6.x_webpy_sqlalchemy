# coding: utf-8
'''
Created on 2013-9-15

@author: Administrator
'''
import os
from imp import load_source

class Service_Base(object):
    pass



def import_modules(app_dir, g):
    '''加载app模块处理
    '''
    urls = []  
      
    for root, dirs, files in os.walk(app_dir, topdown=True): 
        for fp in files: 
            if fp.endswith('.py') and fp[0] != '_':  
                module_name = os.path.join(root, fp).replace(app_dir, '/api').replace('\\', '/')[:-3]
                
                m = load_source(module_name, os.path.join(root, fp))
                
                h = 'handler' in dir(m)
                if not h:
                    continue
#                    raise ImportError('模块 %s 没有实现handler接口' % module_name)
                 
                g[module_name + '.handler'] = getattr(m, 'handler')
                
                urls.extend([module_name, module_name + '.handler'])
     
    return urls
                
def import_templates(web_dir, g):  
    '''加载模板页面处理
    '''
    urls = []  
    
    m = load_source('globals_template_handle', os.path.join(web_dir, 'handle.py'))
    # m = load_source('globals_template_handle', web_dir)
    
    g['globals_template_handle.handler'] = getattr(m, 'handler')
    
    for root, dirs, files in os.walk(web_dir, topdown=True): 
        for fp in files: 
            if fp.endswith('.html') and fp[0] != '_':  
                temp_name = os.path.join(root, fp).replace(web_dir, '').replace('\\', '/')[:-5]

                urls.extend([temp_name, 'globals_template_handle.handler'])

    return urls

def import_images(img_dir, g):
    '''加载模板页面处理
    '''
    urls = []

    m = load_source('globals_img_handle', os.path.join(img_dir, 'handle.py'))

    g['globals_img_handle.handler'] = getattr(m, 'handler')
    for root, dirs, files in os.walk(img_dir, topdown=True):
        for fp in files:
            if fp.endswith('.png') and fp[0] != '_':
                temp_name = os.path.join(root, fp).replace(img_dir, '')
                urls.extend([temp_name, 'globals_img_handle.handler'])

    return urls