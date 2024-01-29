import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Asset } from 'src/app/common/dto/Asset';
import { AssetTypeService } from '../../service/asset-type.service';
@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  clonedAssets: Asset[];
  noRecordFound:boolean;
  constructor() { }
  @Input('childViewModeData') assets: Asset[];
  @Input('ChildPanelTitle') assetname;
  displayedColumns = ['slno', 'name', 'parentAsset', 'assetType', 'id'];
  ngOnInit(): void {
  }
  ngOnChanges() {
    if (this.assets.length <= 0) {
      this.noRecordFound = true;
    }
    else{
      this.noRecordFound = false;
    }
    this.clonedAssets = this.assets;
  }
  filterAsset(filterText: string) {
    filterText = filterText.toLocaleLowerCase();
    let searchDataSource = [];
    this.assets = this.clonedAssets;
    if (!(filterText === "" || filterText === null)) {
      for (let i = 0; i < this.assets.length; i++) {
        if (this.assets[i].name.toLocaleLowerCase().includes(filterText)) {
          searchDataSource.push(this.assets[i]);
        }
      }
      this.assets = searchDataSource;
    }
    if (filterText === "" || filterText === null) {
      this.assets = this.clonedAssets;
    }
    if (this.assets.length <= 0) {
      this.noRecordFound = true;
    }
    else{
      this.noRecordFound = false;
    }
  }
}
