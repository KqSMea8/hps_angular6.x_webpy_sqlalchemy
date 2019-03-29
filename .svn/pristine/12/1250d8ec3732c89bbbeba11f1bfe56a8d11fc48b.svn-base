# coding: utf-8

import sys
import json
from tools import prettify
from libs import web

def _get_lines_from_file(filename, lineno, context_lines):
        """
        Returns context_lines before and after lineno from file.
        Returns (pre_context_lineno, pre_context, context_line, post_context).
        """
        try:
            source = open(filename).readlines()
            lower_bound = max(0, lineno - context_lines)
            upper_bound = lineno + context_lines

            pre_context = \
                [line.strip('\n') for line in source[lower_bound:lineno]]
            context_line = source[lineno].strip('\n')
            post_context = \
                [line.strip('\n') for line in source[lineno + 1:upper_bound]]

            return lower_bound, pre_context, context_line, post_context
        except (OSError, IOError, IndexError):
            return None, [], None, []  
        
def get_cur_except():
    ''' 获取当前异常信息
    '''
    try:
        exception_type, exception_value, tback = sys.exc_info()
        frames = []
        while tback is not None:
            filename = tback.tb_frame.f_code.co_filename
            function = tback.tb_frame.f_code.co_name
            lineno = tback.tb_lineno - 1
     
            lineno += tback.tb_frame.f_locals.get("__lineoffset__", 0)
            
            pre_context_lineno, pre_context, context_line, post_context = \
                _get_lines_from_file(filename, lineno, 7)
    
            if '__hidetraceback__' not in tback.tb_frame.f_locals:
                frames.append(web.storage({
                    'tback': tback,
                    'filename': filename,
                    'function': function,
                    'lineno': lineno,
                    'vars': tback.tb_frame.f_locals,
                    'id': id(tback),
                    'pre_context': pre_context,
                    'context_line': context_line,
                    'post_context': post_context,
                    'pre_context_lineno': pre_context_lineno,
                }))
            tback = tback.tb_next
                
        frames.reverse() 
        dict_Data = {}
        dict_Data['filename'] = frames[0].filename
        dict_Data['function'] = frames[0].function
        dict_Data['lineno'] = frames[0].lineno + 1
        dict_Data['exception_type'] = prettify(exception_type)
        dict_Data['exception_value'] = prettify(exception_value)
        json_result = json.dumps(dict_Data) 
        print json_result
        return (json_result, dict_Data)
    except:
        return None
    
    
 