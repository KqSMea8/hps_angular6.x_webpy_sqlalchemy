# coding: utf-8
from libs.orm import OrmBase
from sqlalchemy import Column, Integer, String, DateTime

from libs import web


class AuthEQ(OrmBase):
    # 表名
    __tablename__ = 'u_auth_eq'
    # 表对应的ID
    TableID = 2
    # 类字段

    AuthEQID = Column(Integer, primary_key=True, autoincrement=True, doc='授权设备ID')
    EQToken = Column(String(512), nullable=True, doc='设备令牌')
    Flag = Column(Integer, nullable=True, doc='是否有效')
    CreateTime = Column(DateTime, nullable=True, doc='创建时间')

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
        self.query = web.ctx.cur_dbsession.query(AuthEQ)

    def save(self, flush=True):
        '''保存数据(一般的新增和更新都可以在这完成)
        '''
        web.ctx.cur_dbsession.add(self)

        # 如果需要立即执行则更新数据库会话
        if flush:
            web.ctx.cur_dbsession.flush()

    def copy(self, bind=True):
        obj_copy = AuthEQ(bind)

        obj_copy.AuthEQID = self.AuthEQID
        obj_copy.EQToken = self.EQToken
        obj_copy.Flag = self.Flag
        obj_copy.CreateTime = self.CreateTime

        return obj_copy