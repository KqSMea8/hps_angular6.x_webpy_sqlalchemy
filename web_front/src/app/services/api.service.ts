import { FuncRole } from './../class/funcRole';
import { UpdataRoleCondition } from './../class/updataRoleCondition';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, of } from 'rxjs';
import { Pagination } from '../class/pagination';
import { CheckinList } from '../class/checkinList';
import { Result } from '../class/result';
import { SearchCondition } from '../class/searchCondition';
import { CheckinListCondition } from '../class/checkinListCondition';
import { AllGuestCheckinCondition } from '../class/allGuestCheckinCondition';
import { SearchLogCondition } from '../class/searchLogCondition';
import { SearchLogList } from '../class/searchLogList';
import { HotelCheckinLogList } from '../class/hotelCheckinLogList';
import { SearchHotelCheckinLog } from '../class/hotelCheckinLogListCondition';
import { SearchHotelListCondition } from '../class/searchHotelListCondition';
import { SearchHotelList } from '../class/searchHotelList';
import { UpdateUserCondition } from '../class/updateUserCondition';
import { SearchUserCondition } from '../class/searchUserCondition';
import { User } from '../class/user';
import { AddUserCondition } from './../class/addUserCondition';
import { RemoveUserCondition } from '../class/removeUserCondition';
import { AddHotelCondition } from '../class/addHotelCondition';
import { VerifyHotelCondition } from '../class/verifyHotelCondition';
import { OfflineHotelCondition } from '../class/offlineHotelCondition';
import { UpdateHotelCondition } from '../class/UpdateHotelCondition';
import { Login } from '../class/login';
import { GuestCheckinResult } from '../class/guestCheckinResult';
import { ForeignerCheckinCondition } from '../class/foreignerCheckinCodition';
import { DataRole } from '../class/dataRole';
import { GuestCheckinCondition, GetCheckinLogListCondition, ForeignerDetailsCondition } from '../class/GuestCheckinDetailsCondition';
import { AllGuestCheckinDetailsResult } from '../class/AllGuestCheckinDetailsResult';
import { ForeignerCheckinDetailsResult } from '../class/ForeignerCheckinDetailsResult';
import { Province } from '../class/province';
import { City } from '../class/City';
import { District } from '../class/district';
import { GuestCheckinLogResult } from '../class/GuestCheckinLogResult';
import { Dictionary, DictResult, AllDictResult } from '../class/dictionary';
import { UpdateDict } from '../class/updateDict';
import { RemoveDict } from '../class/removeDict';
import { AddDict } from '../class/addDict';
import { UpdateState } from '../class/updateState';
import { AddDistrict } from '../class/addDistrict';
import { UpdateDistrict } from '../class/updateDistrict';
import { SaveImgPath } from '../class/SaveImgPath';
import { UploadImg } from '../class/uploadImg';
import { ImageBasePath } from '../class/imageBasePath';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private m_objHttpService: HttpService
    ) { }

    /**旅店开房查询 */
    fnSearchHotelCheckinList(objParams: SearchCondition<CheckinListCondition>): Observable<Result<Pagination<CheckinList>>> {
        return this.m_objHttpService.request<Result<Pagination<CheckinList>>>('POST', '/Hotel/SearchHotelCheckinList', objParams);
    }

    /**酒店入住历史查詢 */
    fnHotelCheckinLog(objParams: SearchCondition<SearchHotelCheckinLog>): Observable<Result<Pagination<HotelCheckinLogList>>> {
        return this.m_objHttpService.request<Result<Pagination<HotelCheckinLogList>>>('POST', '/Hotel/SearchHotelCheckinLog', objParams);
    }

    /**旅客入住查询 */
    fnAllGuestCheckinList(objParams: SearchCondition<AllGuestCheckinCondition>): Observable<Result<Pagination<GuestCheckinResult>>> {
        return this.m_objHttpService.request<Result<Pagination<GuestCheckinResult>>>('POST', '/Guest/SearchGuestCheckInList', objParams);
    }

    /**日志查询 */
    fnSearchLogList(objParams: SearchCondition<SearchLogCondition>): Observable<Result<Pagination<SearchLogList>>> {
        return this.m_objHttpService.request<Result<Pagination<SearchLogList>>>('POST', '/User/SearchLogList', objParams);
    }

    /**旅店管理查询 */
    fnSearchHotelList(objParams: SearchCondition<SearchHotelListCondition>): Observable<Result<Pagination<SearchHotelList>>> {
        return this.m_objHttpService.request<Result<Pagination<SearchHotelList>>>('POST', '/Hotel/SearchHotelList', objParams);
    }

    /**修改用户资料 */
    fnUpdateUser(objParams: UpdateUserCondition): Observable<Result<String>> {
        return this.m_objHttpService.request<Result<String>>('POST', '/User/UpdateUser', objParams);
    }

    /**修改用户密码 */
    fnUpdatePassword(objParams: UpdateUserCondition): Observable<Result<String>> {
        return this.m_objHttpService.request<Result<String>>('POST', '/User/UpdatePassword', objParams);
    }

    /**管理员重置用户密码 */
    fnResetPassword(objParams: UpdateUserCondition): Observable<Result<String>> {
        return this.m_objHttpService.request<Result<String>>('POST', '/User/ResetPassword', objParams);
    }

    /**修改用户状态 */
    fnUpdateUserState(objParams: UpdateUserCondition): Observable<Result<String>> {
        return this.m_objHttpService.request<Result<String>>('POST', '/User/UpdateUserState', objParams);
    }

    /**关闭用户账号 */
    fnRemoveUser(objParams: RemoveUserCondition): Observable<Result<String>> {
        return this.m_objHttpService.request<Result<String>>('POST', '/User/RemoveUser', objParams);
    }

    /**查询用户 */
    fnSearchUserList(objParams: SearchCondition<SearchUserCondition>): Observable<Result<Pagination<User>>> {
        return this.m_objHttpService.request<Result<Pagination<User>>>('POST', '/User/SearchUserList', objParams);
    }

    /**新增用户 */
    fnAddUser(objParams: AddUserCondition): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/User/AddUser', objParams);
    }

    /**添加酒店 */
    fnAddHotel(objParams: AddHotelCondition): Observable<Result<String>> {
        return this.m_objHttpService.request<Result<String>>('POST', '/Hotel/AddHotel', objParams);
    }

    /**获取数据性权限 */
    fnGetDataRoleList(objParams: UpdataRoleCondition): Observable<Result<Pagination<DataRole>>> {
        return this.m_objHttpService.request<Result<Pagination<DataRole>>>('POST', '/User/GetDataRoleList', objParams);
    }

    /**获取功能性权限 */
    fnGetFuncRoleList(objParams: UpdataRoleCondition): Observable<Result<FuncRole[]>> {
        return this.m_objHttpService.request<Result<FuncRole[]>>('POST', '/User/GetFuncRoleList', objParams);
    }

    /**权限修改 */
    fnUpdateRole(objParams: UpdataRoleCondition): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/User/UpdateRole', objParams);
    }

    /**审核酒店 */
    fnVerifyHotel(objParams: VerifyHotelCondition): Observable<Result<String>> {
        return this.m_objHttpService.request<Result<String>>('POST', '/Hotel/VerifyHotel', objParams);
    }

    /**注销酒店 */
    fnOfflineHotel(objParams: OfflineHotelCondition): Observable<Result<String>> {
        return this.m_objHttpService.request<Result<String>>('POST', '/Hotel/OfflineHotel', objParams);
    }

    /**修改更新酒店 */
    fnUpdateHotel(objParams: UpdateHotelCondition): Observable<Result<String>> {
        return this.m_objHttpService.request<Result<String>>('POST', '/Hotel/UpdateHotel', objParams);
    }

    /**登录 */
    fnLogin(objParams: Login): Observable<Result<User>> {
        return this.m_objHttpService.request<Result<User>>('POST', '/User/Login', objParams);
    }

    /**退出登录 */
    fnLogout(): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/User/Logout');
    }

    /**境外旅客入住查询 */
    fnSearchForeignerCheckin(objParams: SearchCondition<ForeignerCheckinCondition>): Observable<Result<Pagination<GuestCheckinResult>>> {
        return this.m_objHttpService.request<Result<Pagination<GuestCheckinResult>>>('POST', '/Guest/SearchForeignCheckInList', objParams);
    }

    /**入住旅客详情查询 */
    fnGetCheckinDetail(objParams: GuestCheckinCondition): Observable<Result<AllGuestCheckinDetailsResult>> {
        return this.m_objHttpService.request<Result<AllGuestCheckinDetailsResult>>('POST', '/Guest/GetCheckinDetail', objParams);
    }

    /**外籍旅客入住详情查询 */
    fnGetForeignerGuestDetail(objParams: ForeignerDetailsCondition): Observable<Result<ForeignerCheckinDetailsResult>> {
        return this.m_objHttpService.request<Result<ForeignerCheckinDetailsResult>>('POST', '/Guest/GetForeignerGuestDetail', objParams);
    }

    /**单条旅客入住记录历史查询 */
    fnGetCheckinLog(objParams: GuestCheckinCondition): Observable<Result<GuestCheckinLogResult>> {
        return this.m_objHttpService.request<Result<GuestCheckinLogResult>>('POST', '/Guest/GetCheckinLog', objParams);
    }

    /**获取省份列表 */
    fnGetProvince(): Observable<Result<Province[]>> {
        return this.m_objHttpService.request<Result<Province[]>>('POST', '/Dict/GetProvince');
    }

    /**获取城市列表 */
    fnGetCity(): Observable<Result<City[]>> {
        return this.m_objHttpService.request<Result<City[]>>('POST', '/Dict/GetCity');
    }

    /**获取区域列表 */
    fnGetDistrict(): Observable<Result<District[]>> {
        return this.m_objHttpService.request<Result<District[]>>('POST', '/Dict/GetDistrict');
    }

    /**获取字典表 */
    fnGetDict(): Observable<Result<AllDictResult>> {
        const objParams = new Dictionary();
        objParams.nCodeType = 0;
        return this.m_objHttpService.request<Result<AllDictResult>>('POST', '/Dict/GetDict', objParams);
        // const objDictData: Result<AllDictResult> = JSON.parse(localStorage.getItem('dict'));
        // const objParams = new Dictionary();
        // if (objDictData) {
        //     return of(objDictData);
        // } else {
        //     objParams.nDictType = 0;
        //     const rs = this.m_objHttpService.request<Result<AllDictResult>>('POST', '/Dict/GetDict', objParams);
        //     rs.subscribe(u => {
        //         localStorage.setItem('dict', JSON.stringify(u));
        //     });
        //     return rs;
        // }
    }

    /**旅客入住记录历史查询 */
    fnGetCheckinLogList(objParams: GetCheckinLogListCondition): Observable<Result<GuestCheckinLogResult[]>> {
        return this.m_objHttpService.request<Result<GuestCheckinLogResult[]>>('POST', '/Guest/GetCheckinLogList', objParams);
    }

    /**修改字典 */
    fnUpdateDict(objParams: UpdateDict): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/Dict/UpdateDict', objParams);
    }

    /**删除字典 */
    fnRemoveDict(objParams: RemoveDict): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/Dict/RemoveDict', objParams);
    }

    /**新增字典 */
    fnAddDict(objParams: AddDict): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/Dict/AddDict', objParams);
    }

    /**修改省市可用状态 */
    fnUpdateState(objParams: UpdateState): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/Dict/UpdateState', objParams);
    }

    /**新增行政区 */
    fnAddDistrict(objParams: AddDistrict): Observable<Result<any>> {
        return this.m_objHttpService.request<Result<any>>('POST', '/Dict/AddDistrict', objParams);
    }

    /**修改行政区名称 */
    fnUpdateDistrict(objParams: UpdateDistrict): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/Dict/UpdateDistrict', objParams);
    }

    /**保存图片地址到数据库 */
    fnSaveImgPath(objParams: SaveImgPath): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/Hotel/SaveImgPath', objParams, false);
    }

    /**保存图片的酒店ID到数据库 */
    fnSaveImgHotelID(objParams: SaveImgPath): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/Hotel/SaveImgHotelID', objParams, false);
    }

    /**删除数据库中保存的图片地址 */
    fnDelImgPath(objParams: SaveImgPath): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/Hotel/DelImgPath', objParams, false);
    }

    /**删除目录中保存的图片地址 */
    fnDelImgOSPath(objParams: SaveImgPath): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/Hotel/DelImgOSPath', objParams, false);
    }

    /**获取证件照片列表 */
    fnGetCerImgList(objParams: SaveImgPath): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('POST', '/Hotel/GetCerImgList', objParams, false);
    }

    /**获取图片地址 */
    fnGetImgPath(objParams: ImageBasePath): Observable<Result<string>> {
        return this.m_objHttpService.request<Result<string>>('GET', '/Hotel/ShowImg', objParams, false);
    }
}
