// Copyright @ 2018-2022 xiejiahe. All rights reserved. MIT license.
// See https://github.com/icodebase/nav

import { Component } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { queryString, setLocation } from '../utils'
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n'
import { getLocale } from 'src/locale'
import { settings } from 'src/store'

@Component({
  selector: 'app-xiejiahe',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private i18n: NzI18nService
  ) {}

  ngOnInit() {
    this.goRoute()
    this.activatedRoute.queryParams.subscribe(setLocation)

    if (getLocale() === 'zh-CN') {
      this.i18n.setLocale(zh_CN);
    } else {
      this.i18n.setLocale(en_US);
    }
  }

  goRoute() {
    // is App
    if ('ontouchstart' in window) {
      const url = (this.router.url.split('?')[0] || '').toLowerCase()
      const { page, id, q } = queryString()
      const queryParams = { page, id, q }
      const path = '/' + String(settings.appTheme).toLowerCase()

      if (!url.includes(path)) {
        this.router.navigate([path], { queryParams })
      }
    }
  }
}
