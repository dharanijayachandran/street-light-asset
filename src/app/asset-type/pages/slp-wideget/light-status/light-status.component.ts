import { Component, Input, OnInit } from '@angular/core';
import { AssetStatusService } from 'src/app/asset-type/service/asset-status.service';
import { AssetLatestStatus } from 'src/app/common/dto/AssetLatestStatus';

@Component({
  selector: 'app-light-status',
  templateUrl: './light-status.component.html',
  styleUrls: ['./light-status.component.css']
})
export class LightStatusComponent implements OnInit {

  constructor(private assetStatusService:AssetStatusService) { }
  @Input('slpId') assetId;
  showLoaderImage: boolean = true;
  lightStatus : AssetLatestStatus;
  imageUrl: string;
  inter: NodeJS.Timeout;

   

  ngOnInit(): void {
    this.getLightStatus();
    this.refreshdata();
  }
  getLightStatus(){
    this.imageUrl = "/assets/street-light/img/status/light-status-no.png";
     let organizationId = sessionStorage.getItem("beId");
     let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.assetStatusService.getLatestLightStatus(Number(organizationId),
    Number(this.assetId), String(timezone)).subscribe(reponseData=>{
      this.showLoaderImage = false;
      this.lightStatus=reponseData[0];
        if (null != this.lightStatus && null != this.lightStatus.status) {
          if (this.lightStatus.status.toUpperCase() == "ON") {
            this.imageUrl = "/assets/street-light/img/status/light-status-on.png";
          } else if (this.lightStatus.status.toUpperCase() == "OFF") {
            this.imageUrl = "/assets/street-light/img/status/light-status-off.png";
          }
        }
    },
    error => {
      this.showLoaderImage = false;
      console.log(error);
    }) 
  } 


  refreshLightStatus(){
    this.getLightStatus();
  }

  refreshdata(){
    this.assetStatusService.getTimeIntervalsFromFile().toPromise().then(data => {
    let  interval = data.refreshtimeinterval;
    this.inter = setInterval(() => {
      this.assetStatusService.resetAutoLogOutTimeInterval();
      this.getLightStatus();
    }, +interval);
  });
}
ngOnDestroy() {
  clearInterval(this.inter);
} 
}
