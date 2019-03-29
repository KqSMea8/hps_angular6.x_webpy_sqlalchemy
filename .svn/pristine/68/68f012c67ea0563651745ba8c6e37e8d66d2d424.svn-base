export class AreaProvince {
    ProvinceID: number;
    Province: string;
    TableID: number;
    IsFlag: number;
    Children: Array<AreaCity> = [];
}

export class AreaCity {
    CityID: number;
    CityName: string;
    IsCapitalCity: number;
    IsFlag: number;
    ProvinceID: number;
    TableID: number;
    Children: Array<AreaDistrict> = [];
}

export class AreaDistrict {
    CityID: number;
    District: string;
    DistrictID: number;
    IsFlag: number;
    ProvinceID: number;
    TableID: number;
}
