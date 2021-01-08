import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public menuList: Array<{ title: string; path: string; icon: string }> = [
    {
      title: 'หน้าหลัก',
      path: '/home',
      icon: '',
    },
    {
      title: 'ตั้งค่า',
      path: '/setting',
      icon: '',
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public service: AppService
  ) {}

  ngOnInit() {}
}
