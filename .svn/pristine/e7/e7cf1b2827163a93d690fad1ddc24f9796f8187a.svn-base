import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HotelSearchComponent } from './components/hotel-search/hotel-search.component';
import { HotelAddComponent } from './components/hotel-add/hotel-add.component';
import { CheckinLogListComponent } from './components/checkin-log-list/checkin-log-list.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AllGuestComponent } from './components/all-guest/all-guest.component';
import { ForeignGuestComponent } from './components/foreign-guest/foreign-guest.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CheckinListComponent } from './components/checkin-list/checkin-list.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserManageComponent } from './components/user-manage/user-manage.component';
import { LogComponent } from './components/log/log.component';
import { GuestDetailsComponent } from './components/guest-details/guest-details.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HotelVerifyComponent } from './components/hotel-verify/hotel-verify.component';
import { HotelOfflineComponent } from './components/hotel-offline/hotel-offline.component';
import { RouteReuseStrategy } from '@angular/router';
import { MyRouteReuseStrategy } from './routes/MyRouteReuseStrategy';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AreaChooseComponent } from './components/area-choose/area-choose.component';
import { ParameterConfigComponent } from './components/parameter-config/parameter-config.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { ErrorBarComponent } from './components/error-bar/error-bar.component';
import { httpInterceptorProviders } from './httpInterceptor/index';
import { SystemNotificationComponent } from './components/system-notification/system-notification.component';
import { GuestCheckinComponent } from './components/guest-checkin/guest-checkin.component';
import { HotelCheckinComponent } from './components/hotel-checkin/hotel-checkin.component';
import { HotelManagemantComponent } from './components/hotel-managemant/hotel-managemant.component';
import { SystemManagemantComponent } from './components/system-managemant/system-managemant.component';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent,
        HotelSearchComponent,
        CheckinLogListComponent,
        HotelAddComponent,
        LoginComponent,
        HeaderComponent,
        AllGuestComponent,
        ForeignGuestComponent,
        SidebarComponent,
        CheckinListComponent,
        UserInfoComponent,
        UserManageComponent,
        LogComponent,
        GuestDetailsComponent,
        LoadingComponent,
        HotelVerifyComponent,
        HotelOfflineComponent,
        BreadcrumbComponent,
        AreaChooseComponent,
        ParameterConfigComponent,
        HomeComponent,
        UploadComponent,
        ErrorBarComponent,
        SystemNotificationComponent,
        GuestCheckinComponent,
        HotelCheckinComponent,
        HotelManagemantComponent,
        SystemManagemantComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
    ],
    providers: [
        HttpService,
        { provide: NZ_I18N, useValue: zh_CN },
        { provide: RouteReuseStrategy, useClass: MyRouteReuseStrategy },
        httpInterceptorProviders,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
