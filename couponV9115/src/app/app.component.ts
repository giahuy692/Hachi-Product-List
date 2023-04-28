// Angular
import {
  AfterViewInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  DrawerComponent,
  DrawerContainerComponent,
  DrawerItem,
  DrawerSelectEvent,
} from '@progress/kendo-angular-layout';
import { ProductApi, Item, ProductList } from 'src/app/DTO';
import { ServiceAPI } from 'src/app/service/service.service';

// Icon
import { faCheckCircle, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { checkCircleIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { NotificationService } from '@progress/kendo-angular-notification';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Coupon v9.1.15';

  // Variable icon
  faCheckCircle = faCheckCircle;
  faPenSquare = faPenSquare;
  svgCheckCircleIcon: SVGIcon = checkCircleIcon;

  // Variable Sidebar
  public showChildren: boolean = false;
  public selectedItem: number = 1;
  public expanded: boolean = false;
  public expandedRight: boolean = false;

  // Variable Header
  valueSeletedNav: string = '';

  public items: Array<any> = [
    {
      text: 'KHUYẾN MÃI',
      icon: 'icon_coppy.png',
      selected: true,
      id: 0,
    },
    {
      text: 'NỘI DUNG WEBSITE',
      icon: 'icon_coppy.png',
      id: 1,
    },
    {
      text: 'QUẢN LÝ BANNER',
      icon: 'icon_coppy.png',
      id: 2,
    },
    {
      text: 'CHÍNH SÁCH',
      icon: 'icon_coppy.png',
      id: 3,
      child: [
        {
          text: 'Coupon',
          icon: '',
          parentId: 3,
        },
        {
          text: 'xxxxxxxxxx',
          icon: '',
          parentId: 3,
        },
        {
          text: 'xxxxxxxxxx',
          icon: '',
          parentId: 3,
        },
        {
          text: 'xxxxxxxxxx',
          icon: '',
          parentId: 3,
        },
        {
          text: 'xxxxxxxxxx',
          icon: '',
          parentId: 3,
        },
      ],
    },

    {
      text: 'BÁO CÁO EXCEL',
      icon: 'icon_coppy.png',
      id: 4,
      expanded: false,
    },
  ];

  // Variable detail product
  @ViewChild('drawerRight') public DrawerRightComponent: DrawerComponent;
  @ViewChildren(NgModel) myInputs!: QueryList<NgModel>;
  public drawerRef: DrawerComponent;
  ReponProduct: any;
  products = new ProductApi();
  statusItem: Array<Item> = [
    { value: 0, text: 'Tạo mới' },
    { value: 1, text: 'Chờ duyệt' },
    { value: 2, text: 'Đã duyệt' },
    { value: 3, text: 'Ngừng hiển thị' },
    { value: 4, text: 'Trả về' },
  ];
  selectedItemStatus: Item = this.statusItem[this.products.StatusID];

  typeData: Array<Item> = [
    { value: 1, text: 'Sản phẩm thường' },
    { value: 2, text: 'Combo' },
    { value: 3, text: 'Quả tặng' },
  ];
  selectedItemTypeData: Item = this.typeData[this.products.TypeData];
  tempStatus: number = 0;

  // Variable dialog
  opened: boolean = false;

  constructor(
    private service: ServiceAPI,
    private notificationService: NotificationService
  ) {
    this.service.tempStatus.subscribe((v) => {
      this.tempStatus = v;
    });
    this.loadValue();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.drawerRef = this.DrawerRightComponent;
  }

  //start: Header
  getValueNav(v: string) {
    this.valueSeletedNav = v;

    if (this.valueSeletedNav == 'CẤU HÌNH') {
      this.items = [
        {
          text: 'KHUYẾN MÃI',
          icon: 'icon_coppy.png',
          selected: true,
          id: 0,
        },
        {
          text: 'NỘI DUNG WEBSITE',
          icon: 'icon_coppy.png',
          id: 1,
        },
        {
          text: 'QUẢN LÝ BANNER',
          icon: 'icon_coppy.png',
          id: 2,
        },
        {
          text: 'CHÍNH SÁCH',
          icon: 'icon_coppy.png',
          id: 3,
          child: [
            {
              text: 'Coupon',
              icon: '',
              path: '/config',

              parentId: 3,
            },
            {
              text: 'xxxxxxxxxx',
              icon: '',
              parentId: 3,
            },
            {
              text: 'xxxxxxxxxx',
              icon: '',
              parentId: 3,
            },
            {
              text: 'xxxxxxxxxx',
              icon: '',
              parentId: 3,
            },
            {
              text: 'xxxxxxxxxx',
              icon: '',
              parentId: 3,
            },
          ],
        },

        {
          text: 'BÁO CÁO EXCEL',
          icon: 'icon_coppy.png',
          id: 4,
          expanded: false,
        },
      ];
    }

    if (this.valueSeletedNav == 'NHÂN SỰ') {
      this.items = [
        {
          text: 'XXXX',
          icon: 'icon_coppy.png',
          id: 0,
        },
        {
          text: 'CƠ CẤU TỔ CHỨC',
          icon: 'icon_coppy.png',
          selected: true,
          id: 1,
          child: [
            {
              text: 'Cơ cấu tổ chức',
              icon: '',
              parentId: 3,
            },
            {
              text: 'Điểm làm việc',
              path: '/pessonnellocation',
              icon: '',
              parentId: 3,
            },
          ],
        },
        {
          text: 'XXXX',
          icon: 'icon_coppy.png',
          id: 2,
        },
        {
          text: 'XXXX',
          icon: 'icon_coppy.png',
          id: 3,
        },
      ];
    }
  }
  // end: Header

  loadValue() {
    this.service.Product.subscribe((value: ProductApi) => {
      this.products = value;
      this.selectedItemStatus = this.statusItem[this.products.StatusID];
      this.selectedItemTypeData =
        this.typeData[parseInt(this.products.TypeData) - 1];
    });
  }

  loadData() {
    this.service.getDataApi().subscribe(
      (data: ProductList) => {
        this.ReponProduct = data.ObjectReturn.Data;
      },
      (e) => {
        console.error(e);
      }
    );
  }

  reload(v: any) {
    this.service.loaddData(v).subscribe(
      (data: ProductList) => {
        this.ReponProduct = data.ObjectReturn.Data;
      },
      (e) => {
        console.error(e);
      }
    );
  }

  // <- Drawer left
  //Handle  onSelectd in drawer left
  public onSelect(ev: DrawerSelectEvent): void {
    this.selectedItem = ev.item.id;
  }

  //Handle show children in drawer left
  toggleChildren() {
    this.showChildren = !this.showChildren;
  }

  //Handle expand change drawer left
  onExpandChange(e: boolean): void {
    if (e == false) {
      this.showChildren = false;
    }
  }
  // Drawer left ->

  // <- Start: Drawer right
  onChangeBarcode(value: string): void {
    if (this.products.Barcode == '') {
      this.notificationService.show({
        content: 'Vui lòng nhập Barcode',
        cssClass: 'button-notification',
        hideAfter: 2000,
        animation: { type: 'fade', duration: 400 },
        position: { horizontal: 'left', vertical: 'bottom' },
        type: { style: 'error', icon: true },
      });
    } else {
      this.service.GetProduct(value).subscribe((v: any) => {
        if (v.ErrorString != null) {
          this.notificationService.show({
            content: v.ErrorString,
            cssClass: 'button-notification',
            hideAfter: 2000,
            animation: { type: 'fade', duration: 400 },
            position: { horizontal: 'left', vertical: 'bottom' },
            type: { style: 'error', icon: true },
          });
        } else {
          this.products = v.ObjectReturn;
          this.loadValue();
        }
      });
    }
  }

  onExpandChangeRight(e: boolean): void {
    if (e == true && this.tempStatus == 0) {
      this.products = new ProductApi();
    }
  }

  // End: Drawer right ->

  // <-- Start: dialog

  // Close dialog
  closeDialog(status: string): void {
    if (status == 'yes') {
      if (this.tempStatus == 1) {
        this.service
          .UpdateProduct(
            this.products.Code,
            this.products.Barcode,
            this.products.Price,
            this.products.PriceBase,
            this.products.PriceVIP
          )
          .subscribe((v) => {
            if (v.ErrorString != null) {
              this.notificationService.show({
                content: v.ErrorString,
                cssClass: 'button-notification',
                hideAfter: 2000,
                animation: { type: 'fade', duration: 400 },
                position: { horizontal: 'left', vertical: 'bottom' },
                type: { style: 'error', icon: true },
              });
            } else {
              this.notificationService.show({
                content:
                  'Cập nhật sản phẩm thành công ' + this.products.ProductName,
                cssClass: 'button-notification',
                hideAfter: 2000,
                animation: { type: 'fade', duration: 400 },
                position: { horizontal: 'left', vertical: 'bottom' },
                type: { style: 'success', icon: true },
              });
            }
          });
        this.loadValue();
        this.DrawerRightComponent.toggle();
        this.opened = false;
      } else {
        this.service
          .AddProduct(
            this.products.Barcode,
            this.products.Price,
            this.products.PriceBase
          )
          .subscribe((v) => {
            if (v.ErrorString != null) {
              this.notificationService.show({
                content: v.ErrorString,
                cssClass: 'button-notification',
                hideAfter: 2000,
                animation: { type: 'fade', duration: 400 },
                position: { horizontal: 'left', vertical: 'bottom' },
                type: { style: 'error', icon: true },
              });
            } else {
              this.notificationService.show({
                content:
                  'Thêm sản phẩm thành công ' + this.products.ProductName,
                cssClass: 'button-notification',
                hideAfter: 2000,
                animation: { type: 'fade', duration: 400 },
                position: { horizontal: 'left', vertical: 'bottom' },
                type: { style: 'success', icon: true },
              });
            }
          });
        this.service.SearchShare.subscribe((v) => {
          this.reload(v);
        });
        this.DrawerRightComponent.toggle();
        this.opened = false;
      }
    } else {
      this.opened = false;
    }
  }

  // Open dialog
  openDialog(): void {
    this.opened = true;
  }

  // End: dialog -->
}
