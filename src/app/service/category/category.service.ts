import { Injectable } from '@angular/core';
import { Category } from 'src/app/interface/category';
import { DataCategorys } from 'src/app/data/category';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private category = new BehaviorSubject<string>('');

  constructor() {}

  getCategory(): Category[] {
    return DataCategorys;
  }

  getCategoryChange() {
    return this.category.asObservable();
  }

  setCategorychange(value: string) {
    this.category.next(value);
  }
}
