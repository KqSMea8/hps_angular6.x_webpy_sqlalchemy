# coding: utf-8
from libs.orm import OrmBase
from sqlalchemy import Column, Integer, String, DateTime, Float, BigInteger
from libs import web


class GuestCheckIn(OrmBase):
    # 表名
    __tablename__ = 'g_guest_checkin'
    # 表对应的ID
    TableID = 8
    # 类字段

    HotelGuestID = Column(BigInteger, primary_key=True, autoincrement=True, doc='旅客信息ID')
    HotelDocType = Column(Integer, nullable=True, doc='证件类型')
    HotelDocNo = Column(String(100), nullable=True, doc='证件号码')
    HotelDocName = Column(String(100), nullable=True, doc='证件姓名')
    HotelGuestName = Column(String(100), nullable=True, doc='客人姓名')
    HotelBornDate = Column(DateTime, nullable=True, doc='出生日期')
    HotelSex = Column(String(100), nullable=True, doc='性别')
    HotelNation = Column(String(100), nullable=True, doc='民族')
    HotelNationality = Column(String(100), nullable=True, doc='国籍')
    HotelAddress = Column(String(100), nullable=True, doc='地址')
    HotelRemark = Column(String(100), nullable=True, doc='备注')
    LastModifyTime = Column(DateTime, nullable=True, doc='创建时间')
    HotelLastModifyTime = Column(DateTime, nullable=True, doc='PMS时间')
    HotelTel = Column(String(100), nullable=True, doc='客人手机号')
    MatchResult = Column(Integer, nullable=True, doc='人脸匹配结果')
    MatchResultPercent = Column(Float, nullable=True, doc='人脸匹配结果比率')

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
        self.query = web.ctx.cur_dbsession.query(GuestCheckIn)

    def save(self, flush=True):
        '''保存数据(一般的新增和更新都可以在这完成)
        '''
        web.ctx.cur_dbsession.add(self)

        # 如果需要立即执行则更新数据库会话
        if flush:
            web.ctx.cur_dbsession.flush()

    def copy(self, bind=True):
        obj_copy = GuestCheckIn(bind)

        obj_copy.HotelGuestID = self.HotelGuestID
        obj_copy.HotelDocType = self.HotelDocType
        obj_copy.HotelDocNo = self.HotelDocNo
        obj_copy.HotelDocName = self.HotelDocName
        obj_copy.HotelGuestName = self.HotelGuestName
        obj_copy.HotelBornDate = self.HotelBornDate
        obj_copy.HotelSex  = self.HotelSex
        obj_copy.HotelNation = self.HotelNation
        obj_copy.HotelNationality = self.HotelNationality
        obj_copy.HotelAddress = self.HotelAddress
        obj_copy.HotelRemark = self.HotelRemark
        obj_copy.LastModifyTime = self.LastModifyTime
        obj_copy.HotelLastModifyTime = self.HotelLastModifyTime
        obj_copy.HotelTel = self.HotelTel
        obj_copy.MatchResult = self.MatchResult
        obj_copy.MatchResultPercent = self.MatchResultPercent

        return obj_copy