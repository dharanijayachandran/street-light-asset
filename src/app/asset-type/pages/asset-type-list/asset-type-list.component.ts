import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { Asset } from 'src/app/common/dto/Asset';
import { AssetParam } from 'src/app/common/dto/AssetParam';
import { AssetType } from 'src/app/common/dto/AssetType';
import { AssetService } from 'src/app/common/service/asset.service';
import { AssetTypeService } from '../../service/asset-type.service';

@Component({
  selector: 'app-asset-type-list',
  templateUrl: './asset-type-list.component.html',
  styleUrls: ['./asset-type-list.component.css']
})
export class AssetTypeListComponent implements OnInit {
  showLoaderImage: boolean = true;
  assetTypes: AssetType[] = [];
  field: Object = {};
  assets: Asset[] = [];
  assetsall: Asset[] = [];
  assetname: string;
  assetallname:string;
   isSelected:boolean;
   allAssets=[]
  constructor(private assetTypeService: AssetTypeService,
    private assetService: AssetService) { }
  ngOnInit(): void {
    this.getAssetTypes();
    }
  getAssetTypes() {
   let organizationId = sessionStorage.getItem("beId");
    this.assetTypeService.getAssetTypesByOrganizationId(Number(organizationId)).subscribe(data => {
      this.showLoaderImage = false;
      this.assetTypes = data;
      if(null !=this.assetTypes && this.assetTypes.length>0){
      this.assetTypes.push({"organizationId":null,"assetCategoryId":null,"name":"All Assets","description":"All Assets","isGeneric":true,"id":1,"status":"A"}); 
      }
      this.assetService.setAssetTypes(data);
      this.formatedResponse(this.assetTypes);
      this.getAssetsByTypeId(this.field['dataSource'][0].id);
      this.field['dataSource'][0].isSelected = true;
      this.assetname = this.field['dataSource'][0].name;
    },
      error => {
        this.showLoaderImage = false;
        console.log(error);
      })
  }
  formatedResponse(response: any) {
    return this.field = {
      dataSource: response,
      id: 'id',
      text: 'name',
      selected: 'isSelected'
    };
  }
  getAssetsByTypeId(assetTypeId: any) {
    let organizationId = sessionStorage.getItem("beId");
    this.assetTypeService.getAssetsByTypeId(
      Number(organizationId), Number(assetTypeId)).subscribe(data => {
        this.showLoaderImage = false;
        this.assets = data;
      },
        error => {
          this.showLoaderImage = false;
          console.log(error);
        })
  }
  onClickAssetType(assetType: any) {
    if(assetType.nodeData.id != 1) {
      this.getAssetsByTypeId(assetType.nodeData.id);
      this.assetname = assetType.nodeData.text;
    }else{
      this. getAssetsByOrganizationId()
    }
  }
  getAssetsByOrganizationId() {
    let assetsArray: Asset[] = [];
    this.assetsall.length=0;
    this.assetname = 'Asset';
    let organizationId = sessionStorage.getItem("beId");
    let userId = sessionStorage.getItem('userId');
    this.assetService.getAssetsByOrganizationId(
      Number(organizationId), Number(userId)).subscribe(data => {
        this.getAllAssets(data);
      },
        error => {
          this.showLoaderImage = false;
          console.log(error);
        })
  }
  getAllAssets(assets){
    if(assets.length>0){
      for(let idx=0; idx<assets.length;idx++){
          this.allAssets.push(assets[idx]);
          if(null!=assets[idx].subAssets && assets[idx].subAssets.length>0){
            this.getAllAssets(assets[idx].subAssets)
          }
      }
       this.assets=this.allAssets;
    }
  }
}
