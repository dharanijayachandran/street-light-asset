import { Component, Input, OnInit } from '@angular/core';
import { Asset } from 'src/app/common/dto/Asset';

@Component({
  selector: 'app-asset-child',
  templateUrl: './asset-child.component.html',
  styleUrls: ['./asset-child.component.css']
})
export class AssetChildComponent implements OnInit {
  displayedColumns = ['slno', 'name', 'viewdetail'];
  constructor() { }
  @Input('childdetaildata') asset:Asset; 
  ngOnInit(): void {
  }

}
