import { Component, Input, OnInit } from '@angular/core';
import { AssetLatestStatus } from 'src/app/common/dto/AssetLatestStatus';

@Component({
  selector: 'app-slp-list',
  templateUrl: './slp-list.component.html',
  styleUrls: ['./slp-list.component.css']
})
export class SlpListComponent implements OnInit {
  displayedColumns = ['slno', 'name', 'status','statustime'];
  @Input('childdetaildata') assetLatestStatus:AssetLatestStatus;
  constructor() { }

  ngOnInit() {
  }

}
