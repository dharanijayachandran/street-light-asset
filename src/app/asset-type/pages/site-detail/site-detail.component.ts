import { Component, Input, OnInit } from '@angular/core';
import { AssetLatestStatus } from 'src/app/common/dto/AssetLatestStatus';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css']
})
export class SiteDetailComponent implements OnInit {
  displayedColumns = ['slno', 'name', 'status','statustime'];
  @Input('childdetaildata') assetLatestStatus:AssetLatestStatus;
  constructor() { }
  
  ngOnInit(): void {
  }

}
