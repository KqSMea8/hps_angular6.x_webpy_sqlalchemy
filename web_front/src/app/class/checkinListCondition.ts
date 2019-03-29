export class CheckinListCondition {
    nSearchUserIDMust: number; // (操作用户ID)
    sSearchUserNameMust: string; // (操作用户)
    nHotelID: number;
    sHotelCode: string; // 酒店编号
    sHotelName: string;
    sResponPerson: string; // 责任人
    nRoomCountMin: number; // 房间数最小值
    nRoomCountMax: number; // 房间数最大值
    nBedCountMin: number; // 床位数最小值
    nBedCountMax: number; // 床位数最大值
    nProvinceID: number; // 省份ID
    nCityID: number;
    nDistrictID: number;
    sCreateUserNameLike: string;
    sRegStartDate: string; // 登记时间(查询开始时间)
    sRegEndDate: string; // 登记时间(查询结束时间)
    sCheckInStartDate: string; // 入住时间(查询开始时间)
    sCheckInEndDate: string; // 入住时间(查询结束时间)
}
