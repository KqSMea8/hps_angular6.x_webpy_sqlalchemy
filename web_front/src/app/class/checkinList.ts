export class CheckinList {
    HotelID: number; // 酒店ID
    HotelCode: string; // 酒店编号
    HotelName: string; // 酒店名称
    ResponPerson: string; // 责任人
    RoomCount: number;
    BedCount: number;
    ProvinceID: number; // 省份ID
    Province: string; // 省份
    CityID: number;
    City: string;
    DistrictID: number;
    District: string;
    CreateUserName: string; // 登记人
    RegStartTime: string; // 登记时间
    SumCheckInRoom: number; // 开房次数合计
    SumCheckInGuest: number; // 入住登记人数合计
    AvgCheckInRoom: number; // 平均开房次数
    AvgCheckInGuest: number; // 平均入住登记人数
}
