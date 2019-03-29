# coding: utf-8
from libs import web

from sqlalchemy import text, and_

from core.modules.module_handle import api_handle
from libs.orm.ormutils import get_data
from models.hps.g_foreigner import Foreigner
from models.hps.g_guest_checkin import GuestCheckIn
from models.hps.g_guest_doc import GuestDoc
from models.hps.h_checkin import CheckIn
from models.hps.h_hotel import Hotel
from models.hps.h_relation_checkin import RelationCheckIn
from utils import json_to_obj, obj_to_dict, to_datetime, dict_to_name
from utils.func_api import FuncResult


class CheckinInfo(object):
    ArrivalTime = ""
    CheckInID = []
    CheckInTime = ""
    CheckInType = [1, 2, 3, 4]
    CheckOutTime = ""
    DepartTime = ""
    FolioCode = 1000
    FolioState = [1, 2, 3, 4]
    HotelAddr = ['广州', '深圳', '北京', '上海']
    HotelID = [1, 2, 3];
    HotelLastModifyTime = ""
    HotelName = ['七天', '']
    LastModifyTime = ""
    RoomNo = ""
    RoomTypeCode = ""
    RoomTypeName = ""


class Foreigner(object):
    DeparturePlace = "2"
    DepartureTime = "2019-01-02 09 =40 =37"
    EntryPlace = "2"
    EntryTime = ""
    ForeignerID = 2
    Nationality = ""
    NationalityName = ""
    PassNo = "2"
    VisaDeadline = "2019-01-12 09 =40 =32"
    VisaType = ""
    VisaTypeName = ""


class GuestCheckIn(object):
    CheckInTime = ""
    CheckOutTime = ""
    GuestState = 1
    GuestStateName = "在住"
    HotelAddress = ""
    HotelBornDate = ""
    HotelDocName = "eqw"
    HotelDocNo = "3"
    HotelDocType = 2
    HotelDocTypeName = "护照"
    HotelGuestID = 3
    HotelGuestName = "czxc"
    HotelLastModifyTime = ""
    HotelNation = ""
    HotelNationName = ""
    HotelNationality = ""
    HotelNationalityName = ""
    HotelRemark = ""
    HotelSex = ""
    HotelSexName = ""
    HotelTel = ""
    LastModifyTime = ""
    MatchResult = ""
    MatchResultPercent = ""


class GuestDoc(object):
    AuthStatus = ""
    BornDate = "2019-01-11 09 =41 =51"
    CertiEffEndTime = ""
    CertiEffStartTime = ""
    CertiOffice = ""
    CreateTime = ""
    DocName = "222"
    DocNo = "222"
    DocPhotoURL = ""
    DocType = 2
    DocTypeName = "护照"
    GuestDocID = 2
    GuestName = "222"
    GuestType = 1
    Nation = ""
    NationName = ""
    NativePlace = ""
    Remark = ""
    ResAddress = ""
    Sex = ""
    SexName = ""
    State = ""
    StateName = ""


def add(self):
    pass