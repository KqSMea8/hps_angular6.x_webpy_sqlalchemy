# coding: utf-8
from libs.orm import OrmBase
from sqlalchemy import Column, Integer, String, DateTime, Float
from libs import web


class GuestDoc(OrmBase):
    # 表名
    __tablename__ = 'g_guest_doc'
    # 表对应的ID
    TableID = 9
    # 类字段

    GuestDocID = Column(Integer, primary_key=True, autoincrement=True, doc='旅客信息ID')
    GuestType = Column(Integer, nullable=True, doc='旅客类型')
    DocType = Column(String(100), nullable=True, doc='证件类型')
    DocNo = Column(String(100), nullable=True, doc='证件号码')
    DocName = Column(String(100), nullable=True, doc='证件姓名')
    GuestName = Column(String(100), nullable=True, doc='客人姓名')
    BornDate = Column(String(100), nullable=True, doc='出生日期')
    Sex = Column(String(100), nullable=True, doc='性别')
    NativePlace = Column(String(100), nullable=True, doc='籍贯')
    Nation = Column(String(100), nullable=True, doc='民族')
    AuthStatus = Column(String(100), nullable=True, doc='认证状态')
    ResAddress = Column(String(100), nullable=True, doc='户籍地址')
    State = Column(Integer, nullable=True, doc='旅客状态')
    CertiOffice = Column(String(100), nullable=True, doc='发证机关')
    CertiEffStartTime = Column(DateTime, nullable=True, doc='证件起始有效时间')
    CertiEffEndTime = Column(DateTime, nullable=True, doc='证件结束有效时间')
    DocPhotoURL = Column(String(100), nullable=True, doc='证件照片地址')
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
        self.query = web.ctx.cur_dbsession.query(GuestDoc)

    def save(self, flush=True):
        '''保存数据(一般的新增和更新都可以在这完成)
        '''
        web.ctx.cur_dbsession.add(self)

        # 如果需要立即执行则更新数据库会话
        if flush:
            web.ctx.cur_dbsession.flush()

    def copy(self, bind=True):
        obj_copy = GuestDoc(bind)

        obj_copy.GuestDocID = self.GuestDocID
        obj_copy.GuestType = self.GuestType
        obj_copy.DocType = self.DocType
        obj_copy.DocNo = self.DocNo
        obj_copy.DocName = self.DocName
        obj_copy.GuestName = self.GuestName
        obj_copy.BornDate  = self.BornDate
        obj_copy.Sex = self.Sex
        obj_copy.NativePlace = self.NativePlace
        obj_copy.Nation = self.Nation
        obj_copy.AuthStatus = self.AuthStatus
        obj_copy.ResAddress = self.ResAddress
        obj_copy.State = self.State
        obj_copy.CertiOffice = self.CertiOffice
        obj_copy.CertiEffStartTime = self.CertiEffStartTime
        obj_copy.CertiEffEndTime = self.CertiEffEndTime
        obj_copy.DocPhotoURL = self.DocPhotoURL
        obj_copy.Remark = self.Remark
        obj_copy.CreateTime = self.CreateTime

        return obj_copy