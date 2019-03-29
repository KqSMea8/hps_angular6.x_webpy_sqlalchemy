# coding: utf-8
from libs.orm import OrmBase
from sqlalchemy import Column, Integer, String, DateTime
from libs import web


class UserDataRole(OrmBase):
    # 表名
    __tablename__ = 'u_user_data_role'
    # 表对应的ID
    TableID = 5
    # 类字段

    UserDataRoleID = Column(Integer, primary_key=True, autoincrement=True, doc='权限ID')
    UserID = Column(String(100), nullable=True, doc='用户ID')
    DataRoleID = Column(Integer, nullable=True, doc='权限类型')
    BeginValue = Column(String(100), nullable=True, doc='开始的值')
    EndValue = Column(String(100), nullable=True, doc='结束的值')
    ValueSet = Column(String(100), nullable=True, doc='值的范围')
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
        self.query = web.ctx.cur_dbsession.query(UserDataRole)

    def save(self, flush=True):
        '''保存数据(一般的新增和更新都可以在这完成)
        '''
        web.ctx.cur_dbsession.add(self)

        # 如果需要立即执行则更新数据库会话
        if flush:
            web.ctx.cur_dbsession.flush()

    def copy(self, bind=True):
        obj_copy = UserDataRole(bind)

        obj_copy.UserDataRoleID = self.UserDataRoleID
        obj_copy.UserID = self.UserID
        obj_copy.DataRoleID = self.DataRoleID
        obj_copy.BeginValue = self.BeginValue
        obj_copy.EndValue = self.EndValue
        obj_copy.ValueSet = self.ValueSet
        obj_copy.Flag = self.Flag
        obj_copy.Remark = self.Remark
        obj_copy.CreateTime = self.CreateTime

        return obj_copy