# coding: utf-8
from libs.orm import OrmBase
from sqlalchemy import Column, Integer, String,DateTime
from libs import web


class DataRole(OrmBase):
    # 表名
    __tablename__ = 'u_data_role'
    # 表对应的ID
    TableID = 4
    # 类字段

    DataRoleID = Column(Integer, primary_key=True, autoincrement=True, doc='权限ID')
    DataTypeID = Column(Integer, nullable=True, doc='权限名')
    Fields = Column(String(111), nullable=True, doc='权限')
    FieldType = Column(Integer, nullable=True, doc='权限类型')
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
        self.query = web.ctx.cur_dbsession.query(DataRole)
        self.query2 = web.ctx.cur_dbsession.query

    def save(self, flush=True):
        '''保存数据(一般的新增和更新都可以在这完成)
        '''
        web.ctx.cur_dbsession.add(self)

        # 如果需要立即执行则更新数据库会话
        if flush:
            web.ctx.cur_dbsession.flush()

    def copy(self, bind=True):
        obj_copy = DataRole(bind)

        obj_copy.DataRoleID = self.DataRoleID
        obj_copy.DataTypeID = self.DataTypeID
        obj_copy.Fields = self.Fields
        obj_copy.FieldType = self.FieldType
        obj_copy.Flag = self.Flag
        obj_copy.Remark = self.Remark
        obj_copy.CreateTime = self.CreateTime

        return obj_copy