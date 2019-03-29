import SimpleHTTPServer

import web,web.wsgiserver,web.contrib.template
from gevent.pywsgi import WSGIHandler
from web import *
from web.httpserver import StaticMiddleware
from web.wsgiserver import *
from web.contrib.template import *
import types

g = globals()
cache= storage()
cache.__doc__ = """
Non important cache in web.py for various aspects

"""

g['cache'] = cache

class application(application):
    def _delegate(self, f, fvars, args=[]):
        def handle_class(cls):
            meth = web.ctx.method
            if meth == 'HEAD' and not hasattr(cls, meth):
                meth = 'GET'
            if not hasattr(cls, meth):
                raise web.nomethod(cls)
            tocall = getattr(cls(), meth)
            return tocall(*args)

        def is_class(o):
            return isinstance(o, (types.ClassType, type))

        if f is None:
            raise web.notfound()
        elif isinstance(f, application):
            return f.handle_with_processors()
        elif is_class(f):
            return handle_class(f)
        elif isinstance(f, basestring):
            if f.startswith('redirect '):
                url = f.split(' ', 1)[1]
                if web.ctx.method == "GET":
                    x = web.ctx.env.get('QUERY_STRING', '')
                    if x:
                        url += '?' + x
                raise web.redirect(url)
            elif fvars.get(f):
                cls = fvars[f]
            elif '.' in f:
                mod, cls = f.rsplit('.', 1)
                mod = __import__(mod, None, None, [''])
                cls = getattr(mod, cls)
            else:
                cls = fvars[f]
            return handle_class(cls)
        elif hasattr(f, '__call__'):
            return f()
        else:
            return web.notfound()

