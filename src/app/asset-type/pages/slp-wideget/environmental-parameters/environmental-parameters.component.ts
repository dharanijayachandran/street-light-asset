import { Component, Input, OnInit } from '@angular/core';
import { resolveCname } from 'dns';
import { AssetStatusService } from 'src/app/asset-type/service/asset-status.service';
import { AssetLatestStatus } from 'src/app/common/dto/AssetLatestStatus';

@Component({
  selector: 'app-environmental-parameters',
  templateUrl: './environmental-parameters.component.html',
  styleUrls: ['./environmental-parameters.component.css']
})
export class EnvironmentalParametersComponent implements OnInit {

  constructor(private assetStatusService:AssetStatusService) { }
  @Input('slpId') assetId;
  showLoaderImage: boolean = true;
   environmentalparams:AssetLatestStatus;
   name=[];
   namesList:any;
   humidity:any;
   temperature:any;
   value:any;
   paramName:AssetLatestStatus;
  ngOnInit() {
    this.getenvironmentalParameters();
  }
  refreshParams(){
    this.getenvironmentalParameters();
  }
  getenvironmentalParameters(){
     let organizationId = sessionStorage.getItem("beId");
     let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.assetStatusService.getEnvironmentalparams(Number(organizationId),
    Number(this.assetId), String(timezone)).subscribe(responseData=>{
      this.showLoaderImage = false;
      this.namesList= responseData
    },
    error => {
      this.showLoaderImage = false;
      console.log(error);
    }) 
  } 
}
