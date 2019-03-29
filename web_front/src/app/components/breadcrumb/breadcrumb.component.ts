import { Component, Input, Output, EventEmitter } from '@angular/core';

class Breadcrumb {
    name: string;
    routelink: string;
}

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.less']
})
export class BreadcrumbComponent {

    m_aDataList: Array<Breadcrumb> = [];
    m_objDataLastItem: Breadcrumb = new Breadcrumb;
    m_lsBreadcrumb: Array<Breadcrumb> = [];

    @Input()
    get data() {
        return this.m_lsBreadcrumb;
    }
    set data(value) {
        console.log(value);
        this.m_lsBreadcrumb = value;
        this.m_aDataList = this.data.splice(0, this.data.length - 1);
        this.m_objDataLastItem = this.data.pop();
        this.areaChange.emit(value);
    }

    @Output()
    areaChange: EventEmitter<any> = new EventEmitter();

    constructor() {}
}

// class BreadcrumbClass {
//     name: string;
//     routelink: string;
// }
