import { Component, OnInit } from '@angular/core';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-system-notification',
  templateUrl: './system-notification.component.html',
  styleUrls: ['./system-notification.component.less']
})
export class SystemNotificationComponent implements OnInit {

  constructor(
    public m_objContextService: ContextService,
  ) { }

  ngOnInit() {
  }

}
