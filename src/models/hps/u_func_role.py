# coding: utf-8
from libs.orm import OrmBase
from sqlalchemy import Column, Integer, String, DateTime
from libs import web


class FunRole(OrmBase):
    # 表名
    __tablename__ = 'u_func_role'
    # 表对应的ID
    TableID = 3
    # 类字段

    RoleID = Column(Integer, primary_key=True, autoincrement=True, doc='权限ID')
    RoleName = Column(String(100), nullable=True, doc='权限名')
    RoleType = Column(Integer, nullable=True, doc='权限类型')
    Flag = Column(Integer, nullable=True, doc='是否有效')
    Remark = Column(String(100), nullable=True, doc='备注')
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
        self.query = web.ctx.cur_dbsession.query(FunRole)

    def save(self, flush=True):
        '''保存数据(一般的新增和更新都可以在这完成)
        '''
        web.ctx.cur_dbsession.add(self)

        # 如果需要立即执行则更新数据库会话
        if flush:
            web.ctx.cur_dbsession.flush()

    def copy(self, bind=True):
        obj_copy = FunRole(bind)

        obj_copy.RoleID = self.RoleID
        obj_copy.RoleName = self.RoleName
        obj_copy.RoleType = self.RoleType
        obj_copy.Flag = self.Flag
        obj_copy.Remark = self.Remark
        obj_copy.CreateTime = self.CreateTime

        return obj_copy