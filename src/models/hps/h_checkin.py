# coding: utf-8
from libs.orm import OrmBase
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from libs import web


class CheckIn(OrmBase):
    # 表名
    __tablename__ = 'h_checkin'
    # 表对应的ID
    TableID = 7
    # 类字段

    CheckInID = Column(Integer, primary_key=True, autoincrement=True, doc='开房日志ID')
    HotelID = Column(Integer, nullable=True, doc='酒店ID')
    RoomNo = Column(String(100), nullable=True, doc='房间号')
    RoomTypeCode = Column(String(111), nullable=True, doc='房型编码')
    RoomTypeName = Column(String(100), nullable=True, doc='房型名称')
    ArrivalTime = Column(DateTime, nullable=True, doc='预约到店时间')
    DepartTime = Column(DateTime, nullable=True, doc='预约离店时间')
    CheckInTime = Column(DateTime, nullable=True, doc='入住时间')
    CheckOutTime = Column(DateTime, nullable=True, doc='离店时间')
    CheckInType = Column(Integer, nullable=True, doc='入住类型')
    FolioCode = Column(String(100), nullable=True, doc='房单号')
    FolioState = Column(Integer, nullable=True, doc='房单状态')
    LastModifyTime = Column(DateTime, nullable=True, doc='最后修改时间')
    HotelLastModifyTime = Column(DateTime, nullable=True, doc='PMS时间')
    IsNew = Column(Integer, nullable=True, doc='是否为最新一条数据')
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
        self.query = web.ctx.cur_dbsession.query(CheckIn)

    def save(self, flush=True):
        '''保存数据(一般的新增和更新都可以在这完成)
        '''
        web.ctx.cur_dbsession.add(self)

        # 如果需要立即执行则更新数据库会话
        if flush:
            web.ctx.cur_dbsession.flush()
    def copy(self, bind=True):
        obj_copy = CheckIn(bind)

        obj_copy.CheckInID = self.CheckInID
        obj_copy.HotelID = self.HotelID
        obj_copy.RoomNo = self.RoomNo
        obj_copy.RoomTypeCode = self.RoomTypeCode
        obj_copy.RoomTypeName = self.RoomTypeName
        obj_copy.ArrivalTime = self.ArrivalTime
        obj_copy.DepartTime = self.DepartTime
        obj_copy.CheckInTime = self.CheckInTime
        obj_copy.CheckOutTime = self.CheckOutTime
        obj_copy.CheckInType = self.CheckInType
        obj_copy.FolioCode = self.FolioCode
        obj_copy.FolioState = self.FolioState
        obj_copy.LastModifyTime = self.LastModifyTime
        obj_copy.HotelLastModifyTime = self.HotelLastModifyTime
        obj_copy.IsNew = self.IsNew

        return obj_copy