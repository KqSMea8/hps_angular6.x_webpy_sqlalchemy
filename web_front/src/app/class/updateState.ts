export class UpdateState {
    nUpdateUserIDMust: number;
    sUpdateUserNameMust: string;
    nUpdateType: number; // 更新的是省还是市区 1:Province 2:City 3:District
    nProvinceID: number;
    sProvince: string;
    nCityID: number;
    sCityName: string;
    nDistrictID: number;
    sDistrictName: string;
    nFlag: number;
}
