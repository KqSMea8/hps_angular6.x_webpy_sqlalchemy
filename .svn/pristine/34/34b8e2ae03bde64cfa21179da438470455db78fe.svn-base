# coding: utf-8
from libs.orm import OrmBase
from sqlalchemy import Column, Integer, DateTime, String
from libs import web


class OperatingLog(OrmBase):
    # 表名
    __tablename__ = 'l_operating_log'
    # 表对应的ID
    TableID = 11
    # 类字段

    OperaLogID = Column(Integer, primary_key=True, autoincrement=True, doc='日志ID')
    UserID = Column(Integer, nullable=True, doc='用户ID')
    # LoginTime = Column(DateTime, nullable=True)
    WorkCode = Column(String(100), nullable=True, doc='操作人帐号')
    UserName = Column(String(100), nullable=True, doc='操作人名称')
    OperaType = Column(String(20), nullable=True, doc='操作类型')
    KeyWord = Column(String(1024), nullable=True, doc='操作内容')
    IP = Column(String(100), nullable=True, doc='IP地址')
    CreateTime = Column(DateTime, nullable=True, doc='操作时间')
    Remark= Column(String(256), nullable=True, doc='备注')
    DeviceCode= Column(String(100), nullable=True, doc='设备编号')

    def __init__(self, bind=True):
        '''数据类初始化
        '''
        if bind:
            self.bind_db()

    def bind_db(self):
        '''跟数据库绑定
        '''
        # 初始化数据类的结构
        self.metadata.bind = web.cache.db[web.ctx.dbcontext.conn_str].engine
        # 初始化数据类查询
        self.query = web.ctx.cur_dbsession.query(OperatingLog)
        self.query2 = web.ctx.cur_dbsession.query

    def save(self, flush=True):
        '''保存数据(一般的新增和更新都可以在这完成)
        '''
        web.ctx.cur_dbsession.add(self)

        # 如果需要立即执行则更新数据库会话
        if flush:
            web.ctx.cur_dbsession.flush()

    def copy(self, bind=True):
        obj_copy = OperatingLog(bind)
        obj_copy.UserID = self.UserID
        obj_copy.OperaLogID = self.OperaLogID
        # obj_copy.LoginTime = self.LoginTime
        obj_copy.WorkCode = self.WorkCode
        obj_copy.UserName = self.UserName
        obj_copy.OperaType = self.OperaType
        obj_copy.KeyWord = self.KeyWord
        obj_copy.IP  = self.IP
        obj_copy.CreateTime = self.CreateTime
        obj_copy.Remark= self.Remark
        obj_copy.DeviceCode = self.DeviceCode

        return obj_copy