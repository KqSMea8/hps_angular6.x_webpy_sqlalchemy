export class SearchHotelListCondition {
    nSearchUserIDMust: number; // 操作者id
    sSearchUserNameMust: string; // 操作者姓名
    nHotelID: number; // 酒店ID
    sHotelCodeLikeL: string; // 酒店编号
    sHotelNameLike: string; // 酒店名
    sHotelTel: string;	// 前台电话
    nRoomCountStart: number; // 房间开始数量
    nRoomCountEnd: number; // 房间结束数量
    sResponPerson: string; // 责任人
    sResponPersonTel: string; // 责任人电话
    sLegalPerson: string; // 法人姓名
    sLegalPersonNo: string; // 法人证件号
    sLegalPersonMobile: string; // 法人联系电话
    nProvinceID: number;     //  省份ID
    nCityID: number;
    nDistrictID: number;
    dtRegStartTime: string; // 登记时间起始
    dtRegEndTime: string; // 登记时间结束
    nState: number; // 酒店状态
    sCreateuserCode: string; // 登记人
    nAuditState: number; // 申请状态
    nRowCount: number;
    nSort: number;
}
