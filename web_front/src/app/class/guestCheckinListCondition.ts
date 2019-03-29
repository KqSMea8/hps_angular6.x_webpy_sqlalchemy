export class GuestCheckinCondition {
    nSearchUserIDMust: number; // (操作用户ID)
    sSearchUserCodeMust: string; // (操作用户)
    sHotelGuestNameLike: string; // 酒店入住旅客姓名
    nHotelDocType: number; // 酒店入住旅客证件类型
    sHotelDocNoLikeL: string; // 酒店入住客人证件号码
    sGuestDocNameLike: string; // 酒店入住旅客出示的证件姓名
    nDocType: number; // 酒店入住客人出示的证件类型
    sDocNoLikeL: string; // 酒店入住客人出示的证件号码
    nHotelSex: number; // 证件性别
    nSex: number; // 依据酒店旅客入住表
    sNation: string; // 民族->依据酒店旅客入住表
    nHotelNation: string; // 证件民族
    sBornDateStart: string; // 出生日期开始->依据酒店旅客入住表
    sBornDateEnd: string; // 出生日期结束->依据酒店旅客入住表
    sHotelBornDateStart: string; // 证件出生日期开始
    sHotelBornDateEnd: string; // 证件出生日期结束
    sHotelNameLike: string;
    nProvinceID: number; // 省份ID
    nCityID: number;
    nDistrictID: number;
    sRoomNo: string; // 酒店房号
    sCheckInDateTimeStart: string; // 入住时间(查询开始时间)
    sCheckInDateTimeEnd: string; // 入住时间(查询结束时间)
    nNationality: number; // 国籍
    nHotelNationality: number; // 证件国籍
}
