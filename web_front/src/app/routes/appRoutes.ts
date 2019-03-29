import { Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { SystemNotificationComponent } from '../components/system-notification/system-notification.component';
import { GuestCheckinComponent } from '../components/guest-checkin/guest-checkin.component';
import { AllGuestComponent } from '../components/all-guest/all-guest.component';
import { ForeignGuestComponent } from '../components/foreign-guest/foreign-guest.component';
import { GuestDetailsComponent } from '../components/guest-details/guest-details.component';
import { HotelCheckinComponent } from '../components/hotel-checkin/hotel-checkin.component';
import { CheckinListComponent } from '../components/checkin-list/checkin-list.component';
import { CheckinLogListComponent } from '../components/checkin-log-list/checkin-log-list.component';
import { HotelManagemantComponent } from '../components/hotel-managemant/hotel-managemant.component';
import { HotelVerifyComponent } from '../components/hotel-verify/hotel-verify.component';
import { HotelOfflineComponent } from '../components/hotel-offline/hotel-offline.component';
import { HotelSearchComponent } from '../components/hotel-search/hotel-search.component';
import { HotelAddComponent } from '../components/hotel-add/hotel-add.component';

import { SystemManagemantComponent } from '../components/system-managemant/system-managemant.component';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { UserManageComponent } from '../components/user-manage/user-manage.component';
import { LogComponent } from '../components/log/log.component';
import { ParameterConfigComponent } from '../components/parameter-config/parameter-config.component';

import { UploadComponent } from '../components/upload/upload.component';
import { AuthGuard } from '../guard/auth/auth.guard';


export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent,
        data: {
            breadcrumb: 'Home'
        },
        children: [
            {
                path: '',
                redirectTo: 'systemNotification',
                pathMatch: 'full'
            },
            {
                path: 'systemNotification',
                canActivate: [AuthGuard],
                component: SystemNotificationComponent
            },
            {
                path: 'guestCheckin',
                component: GuestCheckinComponent,
                canActivate: [AuthGuard],
                data: {
                    breadcrumb: 'GuestCheckin'
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'allGuest',
                        pathMatch: 'full'
                    },
                    {
                        path: 'allGuest',
                        canActivate: [AuthGuard],
                        component: AllGuestComponent,
                        data: {
                            keep: true,
                            breadcrumb: 'allGuest'
                        }
                    },
                    {
                        path: 'foreignGuest',
                        canActivate: [AuthGuard],
                        component: ForeignGuestComponent,
                        data: {
                            keep: true,
                            breadcrumb: 'foreignGuest'
                        }
                    },
                    {
                        path: 'guestDetails',
                        data: {
                            keep: true,
                            breadcrumb: 'GuestDetails'
                        },
                        component: GuestDetailsComponent,
                        canActivate: [AuthGuard],
                    }
                ]
            },
            {
                path: 'hotelCheckin',
                component: HotelCheckinComponent,
                canActivate: [AuthGuard],
                data: {
                    breadcrumb: 'HotelCheckin'
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'checkinList',
                        pathMatch: 'full'
                    },
                    {
                        path: 'checkinList',
                        canActivate: [AuthGuard],
                        component: CheckinListComponent,
                        data: {
                            keep: true,
                            breadcrumb: 'CheckinList'
                        },
                    },
                    {
                        path: 'checkinLogList',
                        canActivate: [AuthGuard],
                        component: CheckinLogListComponent,
                        data: {
                            keep: true,
                            breadcrumb: 'CheckinLogList'
                        },
                    }
                ]
            },
            {
                path: 'hotelManagement',
                component: HotelManagemantComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'hotelSearch',
                        pathMatch: 'full'
                    },
                    {
                        path: 'hotelSearch',
                        canActivate: [AuthGuard],
                        component: HotelSearchComponent,
                        data: {
                            keep: true,
                        },
                    },
                    {
                        path: 'hotelEdit',
                        canActivate: [AuthGuard],
                        component: HotelAddComponent
                    },
                    {
                        path: 'verify',
                        data: { keep: false },
                        canActivate: [AuthGuard],
                        component: HotelVerifyComponent
                    },
                    {
                        path: 'offline',
                        data: { keep: false },
                        canActivate: [AuthGuard],
                        component: HotelOfflineComponent
                    },
                    {
                        path: 'hotelAdd',
                        data: {keep: false},
                        canActivate: [AuthGuard],
                        component: HotelAddComponent
                    },
                    {
                        path: 'ul',
                        data: {keep: false},
                        canActivate: [AuthGuard],
                        component: UploadComponent
                    }
                ]
            },
            {
                path: 'systemManagement',
                component: SystemManagemantComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'userInfo',
                        pathMatch: 'full'
                    },
                    {
                        path: 'userInfo',
                        data: {keep: false},
                        canActivate: [AuthGuard],
                        component: UserInfoComponent
                    },
                    {
                        path: 'userManage',
                        data: {keep: false},
                        canActivate: [AuthGuard],
                        component: UserManageComponent
                    },
                    {
                        path: 'log',
                        data: {keep: true},
                        canActivate: [AuthGuard],
                        component: LogComponent
                    },
                    {
                        path: 'parameterConfig',
                        data: {keep: true},
                        canActivate: [AuthGuard],
                        component: ParameterConfigComponent
                    }
                ]
            }
        ]
    }
]
