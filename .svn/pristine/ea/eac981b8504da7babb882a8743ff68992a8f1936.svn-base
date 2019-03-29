# coding: utf-8
from libs.orm import OrmBase
from sqlalchemy import Column, Integer, String, DateTime, BigInteger
from libs import web


class RelationCheckIn(OrmBase):
    # 表名
    __tablename__ = 'h_relation_checkin'
    # 表对应的ID
    TableID = 6
    # 类字段

    RelationCheckInID = Column(Integer, primary_key=True, autoincrement=True, doc='开房信息ID')
    CheckInID = Column(Integer, nullable=True, doc='开房日志ID')
    HotelGuestID = Column(BigInteger, nullable=True, doc='旅客入住ID')
    GuestDocID = Column(Integer, nullable=True, doc='旅客证件照ID')
    CheckInType = Column(Integer, nullable=True, doc='入住类型')
    CheckInTime = Column(DateTime, nullable=True, doc='入住时间')
    CheckOutTime = Column(DateTime, nullable=True, doc='离店时间')
    GuestState = Column(Integer, nullable=True, doc='客人状态')
    LastModifyTime = Column(DateTime, nullable=True, doc='新建时间')
    HotelLastModifyTime = Column(DateTime, nullable=True, doc='PMS时间')

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
        self.query = web.ctx.cur_dbsession.query(RelationCheckIn)

    def save(self, flush=True):
        '''保存数据(一般的新增和更新都可以在这完成)
        '''
        web.ctx.cur_dbsession.add(self)

        # 如果需要立即执行则更新数据库会话
        if flush:
            web.ctx.cur_dbsession.flush()

    def copy(self, bind=True):
        obj_copy = RelationCheckIn(bind)

        obj_copy.RelationCheckInID = self.RelationCheckInID
        obj_copy.CheckInID = self.CheckInID
        obj_copy.HotelGuestID = self.HotelGuestID
        obj_copy.GuestDocID = self.GuestDocID
        obj_copy.CheckInType = self.CheckInType
        obj_copy.CheckInTime = self.CheckInTime
        obj_copy.CheckOutTime = self.CheckOutTime
        obj_copy.GuestState = self.GuestState
        obj_copy.LastModifyTime = self.LastModifyTime
        obj_copy.HotelLastModifyTime = self.HotelLastModifyTime

        return obj_copy