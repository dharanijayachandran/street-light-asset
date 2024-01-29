import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset } from 'src/app/common/dto/Asset';
import { AssetLatestStatus } from 'src/app/common/dto/AssetLatestStatus';
import { AssetService } from 'src/app/common/service/asset.service';
import { AssetStatusService } from '../../service/asset-status.service';
import { AssetTypeService } from '../../service/asset-type.service';
@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {
  assetid: any;
  assetTypeCode:string;
  assetname: any;
  asset: Asset[] = [];
  geocoordinates: any;
  latitude: any;
  longitude: any;
  typename: any;
  displayPage: String;
  typecode: string;
  lightCount: any;
  assetLatestStatus: AssetLatestStatus[];
  imgUrl: string;
  siteName: string; 
  assetAlarmCount:any;
  lightWatt: string;
  contract: string;
  lightBrandDriver: string;
  assetId:any;
  refAssetName:string;
  assetCount:any;
  assetTypeImageUrl = new Map<string, string>();
  constructor(private _Activatedroute: ActivatedRoute, private assetService: AssetService,
    private assetStatusService: AssetStatusService,private assetTypeService:AssetTypeService) { }
  ngOnInit(): void {
    this._Activatedroute.queryParamMap.subscribe(params => {
      this.assetId = params.get('id');
      let typeCode = params.get('typeCode');
      let statusAssetIds = params.get('statusAssetIds');
      this.setAssetTypeIconUrl();
      this.getAssetByIdAndTypeCode(this.assetId, typeCode, statusAssetIds);
    });
  }
  getAssetByIdAndTypeCode(assetId: any, assetTypeCode: string, statusAssetIds: any) {
    let organizationId = sessionStorage.getItem("beId");
      this.assetService.getAssetById(Number(organizationId), Number(assetId)).subscribe(data => {
      this.assetService.assetType = data['typeName'];
      this.assetService.assetName = data['name'];
      this.assetService.typecode = data['typeCode'];
      this.assetService.geospatialCoordinates = data['geospatialCoordinates'];
      this.setImageUrl(assetTypeCode);
      this.getAssetById(assetId,statusAssetIds);
      this.getAlarmCount(assetId, assetTypeCode);
      })
  }
  setAssetTypeIconUrl(){
    let organizationId = sessionStorage.getItem("beId");
    this.assetTypeService.getIconUrl(Number(organizationId)).subscribe(assetTypes => {
      assetTypes.forEach(assetType=>{
        this.assetTypeImageUrl.set(assetType.code,assetType.icon);
      })
    })
  }
  setImageUrl(assetTypeCode:string){
    this.imgUrl = this.assetTypeImageUrl.get(assetTypeCode);
  }

  getAssetById(assetId,statusAssetIds) {
    this.displayPage=null;
    let organizationId = sessionStorage.getItem("beId");
    let latlong = this.assetService.geospatialCoordinates;
    if (null != latlong) {
      let x = latlong.split(" ");
      this.latitude = x[0];
      this.longitude = x[1];
    }
      this.assetService.getAssetById(Number(organizationId), Number(assetId)).subscribe(data => {
        this.asset = data;
        this.assetCount=this.asset['subAssets'].length;
        if (null != this.asset['assetParams'] && this.asset['assetParams'].length > 0) {
          let assetParamData = this.asset['assetParams'];
          assetParamData.forEach(element => {
            if(element.name == 'Light Count'){
              this.lightCount = element.value;
            }
            if(element.name == 'Light Watt'){
              this.lightWatt = element.value;
            }
            if(element.name == 'Contract'){
              this.contract = element.value;
            }
            if(element.name == 'Light Brand/Driver'){
              this.lightBrandDriver = element.value;
            }
          });
        }
        if(null != this.asset['subAssets'][0]){
        this.displayPage = this.asset['subAssets'][0].typeCode;
        this.assetTypeCode=this.asset['subAssets'][0].typeCode;
        }else if( this.assetService.typecode == "SLP"){
          this.displayPage ='SLP';
        }
        if(("SLP" == this.assetTypeCode && this.asset['subAssets'].length > 0)
        || (null != statusAssetIds && statusAssetIds.length >0)){
          this.assetCount='';
          this.displayPage = 'SLP-LIST';
          this.assetTypeCode="SLP";
          this.assetStatusService.getAssetLightStatus(Number(organizationId), Number(this.assetId)).subscribe(data => {
            if(null != statusAssetIds && statusAssetIds.length >0){
              let selectedSlps : any=[];
              let statusAssetIdsList = statusAssetIds.split(",");
              data.forEach(slp=>{
                if(statusAssetIdsList.includes(slp.assetId.toString())){
                  selectedSlps.push(slp);}})
                 this.assetLatestStatus=selectedSlps;
                }else{
                this.assetLatestStatus=data;
                 }
                 this.assetCount=this.assetLatestStatus.length;
          })
        }
        this.typename = this.asset['typeName'];
        this.assetname = this.asset['name'];
        this.typecode = this.asset['typeCode'];
        this.siteName = this.asset['refAssetName'];
      },
        error => {
          console.log(error);
        })
  }
  getAlarmCount(assetId: number, assetTypeCode: string){
    let organizationId = sessionStorage.getItem("beId");
    this.assetStatusService.getAlarmCountByType(Number(organizationId), Number(assetId), String(assetTypeCode)).subscribe(responseData =>{
      this.assetAlarmCount = responseData;
    })
  }
}
