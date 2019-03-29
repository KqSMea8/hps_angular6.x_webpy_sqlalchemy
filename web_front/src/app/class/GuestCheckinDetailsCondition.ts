export class GuestCheckinCondition {
    nSearchUserIDMust: number; // 搜索人id
    sSearchUserNameMust: string; // 搜索人姓名
    nCheckInID: number;       // 旅客ID *
    nIsForeigner: number; // 是否是外国人
}

export class GetCheckinLogListCondition {
    nSearchUserIDMust: number; // 搜索人id
    sSearchUserNameMust: string; // 搜索人姓名
    nHotelGuestID: number; // 旅客ID *
}

export class ForeignerDetailsCondition {
    nSearchUserIDMust: number; // 搜索人id
    sSearchUserNameMust: string; // 搜索人姓名
    nGuestDocID: number;       // 旅客ID *
}