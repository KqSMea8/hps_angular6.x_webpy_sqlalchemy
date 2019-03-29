# coding: utf-8
from libs.orm import OrmBase
from sqlalchemy import Column, Integer, String, DateTime
from libs import web


class Hotel(OrmBase):
    # 表名
    __tablename__ = 'h_hotel'
    # 表对应的ID
    TableID = 11
    # 类字段

    HotelID = Column(Integer, primary_key=True, autoincrement=True, doc='酒店ID')
    HotelCode = Column(String(111), nullable=True, doc='酒店编号')
    HotelName = Column(String(111), nullable=True, doc='酒店名称')
    HotelAddr = Column(String(111), nullable=True, doc='酒店地址')
    HotelTel = Column(String(111), nullable=True, doc='酒店电话')
    LegalTel = Column(String(100), nullable=True, doc='法人联系电话')
    LegalPerson = Column(String(100), nullable=True, doc='法人代表')
    LegalDocNo = Column(String(100), nullable=True, doc='法人证件号码')
    Coordinate = Column(String(100), nullable=True, doc='坐标')
    ProvinceID = Column(Integer, nullable=True, doc='省份ID')
    Province = Column(String(100), nullable=True, doc='省份名称')
    CityID = Column(Integer, nullable=True, doc='城市ID')
    CityName = Column(String(100), nullable=True, doc='城市名称')
    DistrictID = Column(Integer, nullable=True, doc='地区ID')
    District = Column(String(100), nullable=True, doc='地区名称')
    State = Column(Integer, nullable=True, doc='酒店状态')
    HotelType = Column(Integer, nullable=True, doc='酒店类型')
    CreateUserID = Column(Integer, nullable=True, doc='登记人ID')
    CreateUserName = Column(String(100), nullable=True, doc='登记人名称')
    ResponPersonTel = Column(String(111), nullable=True, doc='责任人联系电话')
    ResponPerson = Column(String(100), nullable=True, doc='责任人')
    ApplyTime = Column(DateTime(100), nullable=True, doc='申请时间')
    AuditTime = Column(DateTime(100), nullable=True, doc='审核时间')
    AuditUserID = Column(String(100), nullable=True, doc='审核用户ID')
    AuditUserName = Column(String(100), nullable=True, doc='审核用户名称')
    RoomCount = Column(Integer, nullable=True, doc='房间数量')
    BedCount = Column(Integer, nullable=True, doc='床位数量')
    AuditState = Column(Integer, nullable=True, doc='审核状态')
    AuditStateName = Column(String(100), nullable=True, doc='审核状态名称')
    BusLicenseCode = Column(String(100), nullable=True, doc='营业执照号')
    BusLicenseName = Column(String(100), nullable=True, doc='营业执照名称')
    RegStartTime = Column(DateTime, nullable=True, doc='登记时间')
    Remark = Column(String(1000), nullable=True, doc='备注')
    CreateTime = Column(Integer, nullable=True, doc='创建时间')

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
        self.query = web.ctx.cur_dbsession.query(Hotel)
        self.query2 = web.ctx.cur_dbsession.query

    def save(self, flush=True):
        '''保存数据(一般的新增和更新都可以在这完成)
        '''
        web.ctx.cur_dbsession.add(self)

        # 如果需要立即执行则更新数据库会话
        if flush:
            web.ctx.cur_dbsession.flush()

    def copy(self, bind=True):
        obj_copy = Hotel(bind)
        obj_copy.HotelID = self.HotelID
        obj_copy.HotelCode = self.HotelCode
        obj_copy.HotelName = self.HotelName
        obj_copy.HotelAddr = self.HotelAddr
        obj_copy.HotelTel = self.HotelTel
        obj_copy.LegalTel = self.LegalTel
        obj_copy.LegalPerson = self.LegalPerson
        obj_copy.LegalDocNo = self.LegalDocNo
        obj_copy.Coordinate= self.Coordinate
        obj_copy.ProvinceID = self.ProvinceID
        obj_copy.Province = self.Province
        obj_copy.CityID = self.CityID
        obj_copy.CityName = self.CityName
        obj_copy.DistrictID = self.DistrictID
        obj_copy.District = self.District
        obj_copy.State = self.State
        obj_copy.HotelType = self.HotelType
        obj_copy.CreateUserID = self.CreateUserID
        obj_copy.CreateUserName = self.CreateUserName
        obj_copy.ResponPersonTel = self.ResponPersonTel
        obj_copy.ResponPerson = self.ResponPerson
        obj_copy.ApplyTime = self.ApplyTime
        obj_copy.AuditTime = self.AuditTime
        obj_copy.AuditUserID = self.AuditUserID
        obj_copy.AuditUserName = self.AuditUserName
        obj_copy.RoomCount = self.RoomCount
        obj_copy.BedCount = self.BedCount
        obj_copy.AuditState = self.AuditState
        obj_copy.AuditStateName = self.AuditStateName
        obj_copy.BusLicenseCode = self.BusLicenseCode
        obj_copy.BusLicenseName = self.BusLicenseName
        obj_copy.RegStartTime = self.RegStartTime
        obj_copy.Remark = self.Remark
        obj_copy.CreateTime = self.CreateTime
        return obj_copy

    def copy2(self):
        obj_copy = {}
        obj_copy['HotelID'] = self.HotelID
        obj_copy['HotelCode'] = self.HotelCode
        obj_copy['HotelName'] = self.HotelName
        obj_copy['HotelAddr'] = self.HotelAddr
        obj_copy['HotelTel'] = self.HotelTel
        obj_copy['LegalTel'] = self.LegalTel
        obj_copy['LegalPerson'] = self.LegalPerson
        obj_copy['LegalDocNo'] = self.LegalDocNo
        obj_copy['Coordinate']= self.Coordinate
        obj_copy['ProvinceID'] = self.ProvinceID
        obj_copy['Province'] = self.Province
        obj_copy['CityID'] = self.CityID
        obj_copy['CityName'] = self.CityName
        obj_copy['DistrictID'] = self.DistrictID
        obj_copy['District'] = self.District
        obj_copy['State'] = self.State
        obj_copy['HotelType'] = self.HotelType
        obj_copy['CreateUserID'] = self.CreateUserID
        obj_copy['CreateUserName'] = self.CreateUserName
        obj_copy['ResponPersonTel'] = self.ResponPersonTel
        obj_copy['ResponPerson'] = self.ResponPerson
        obj_copy['ApplyTime'] = self.ApplyTime
        obj_copy['AuditTime'] = self.AuditTime
        obj_copy['AuditUserID'] = self.AuditUserID
        obj_copy['AuditUserName'] = self.AuditUserName
        obj_copy['RoomCount'] = self.RoomCount
        obj_copy['BedCount'] = self.BedCount
        obj_copy['AuditState'] = self.AuditState
        obj_copy['AuditStateName'] = self.AuditStateName
        obj_copy['BusLicenseCode'] = self.BusLicenseCode
        obj_copy['BusLicenseName'] = self.BusLicenseName
        obj_copy['RegStartTime'] = self.RegStartTime
        obj_copy['Remark'] = self.Remark
        obj_copy['CreateTime'] = self.CreateTime
        return obj_copy