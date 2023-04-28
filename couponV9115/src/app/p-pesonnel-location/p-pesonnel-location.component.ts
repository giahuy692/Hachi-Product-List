import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DTOLocationTree, ListLocationTree } from '../DTO/mock-data';

@Component({
  selector: 'app-p-pesonnel-location',
  templateUrl: './p-pesonnel-location.component.html',
  styleUrls: ['./p-pesonnel-location.component.scss'],
})
export class PPesonnelLocationComponent implements OnInit {
  textSearch: string = '';
  faSearch = faSearch;

  ListLocationTree: any;
  ListLocationTreeView: any;

  constructor() {}

  ngOnInit(): void {
    this.ListLocationTreeView = ListLocationTree.ObjectReturn;
    this.ListLocationTree = ListLocationTree;
    console.log(this.ListLocationTree.ObjectReturn);
  }

  handleReset() {}

  handleSearch() {}

  onKeyUp(event: any) {
    if (event.target.value === '') {
    }
  }
}
