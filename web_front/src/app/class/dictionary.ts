export enum Dict {
    gres_nation = 1, // 民族
    gres_country = 2, // 国籍
    doc_type = 3, // 证件类型
    sex = 4, // 性别
    checkin_state = 5, // 住宿状态
    visa_type = 6, // 签证类型
    hotel_state = 7, // 旅店营业状态
    hotel_type = 8, // 旅店类型
    audit_state = 9, // 审核状态
    opera_type = 10, // 操作类型
    log_type = 11, // 日志类型
    user_state = 12, // 用户状态
    verify_state = 13, // 认证状态
    sort = 14, // 排序类型
    foreigner_doc = 15, // 外籍旅客证件类型
}

export class Dictionary {
    nCodeType: number;
}

export class DictResult {
    CodeID: number;
    CodeName: string;
    CodeNo: number;
    Flag: number;
    TypeName: string;
    CodeType: number;
    ExtendInfo: string;
    CodeEnumName: string;
    Sort: number;
    checked: boolean;
}

export class AllDictResult {
    gres_nation: DictResult[] = [];
    gres_country: DictResult[] = [];
    doc_type: DictResult[] = [];
    sex: DictResult[] = [];
    checkin_state: DictResult[] = [];
    visa_type: DictResult[] = [];
    hotel_state: DictResult[] = [];
    hotel_type: DictResult[] = [];
    audit_state: DictResult[] = [];
    opera_type: DictResult[] = [];
    log_type: DictResult[] = [];
    user_state: DictResult[] = [];
    verify_state: DictResult[] = [];
    sort: DictResult[] = [];
    foreigner_doc: DictResult[] = [];
}
