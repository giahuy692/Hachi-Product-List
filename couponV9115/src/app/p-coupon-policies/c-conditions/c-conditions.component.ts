import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-c-conditions',
  templateUrl: './c-conditions.component.html',
  styleUrls: ['./c-conditions.component.scss'],
})
export class CConditionsComponent implements OnInit {
  public dataApply: any[] = [
    { text: 'Website hachihachi.com.vn' },
    {
      text: 'Tất cả cửa hàng',
      items: [
        { text: 'CH Hachi Hachi Pastuer' },
        { text: 'CH Hachi Hachi NVT' },
        { text: 'CH Hachi Hachi CMT8' },
        { text: 'CH Hachi Hachi PMH' },
      ],
    },
  ];

  public dataSubgroups: any[] = [
    { text: 'công khai' },
    {
      text: 'cá nhân',
      items: [{ text: 'đích danh' }],
    },
  ];

  public dataSubgroups1: any[] = [
    { text: 'công khai' },
    {
      text: 'cá nhân',
    },
  ];

  public model = {
    gender: null,
  };

  public children = (dataItem: any): Observable<any[]> => of(dataItem.items);
  public hasChildren = (dataItem: any): boolean => !!dataItem.items;

  selectedSubgroups: any;
  identitys: boolean = false;

  ngOnInit(): void {}

  handleCheckboxChangeIdentity(event: any) {
    this.identitys = event.target.value; // giá trị của radio button được chọn
  }

  handleCheckboxChange(event: any): void {
    this.identitys = false;
  }
}
