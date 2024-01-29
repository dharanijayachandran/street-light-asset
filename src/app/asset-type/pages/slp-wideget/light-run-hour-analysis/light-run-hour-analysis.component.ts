import { Component, Input, OnInit } from '@angular/core';
import { AssetStatusService } from 'src/app/asset-type/service/asset-status.service';
import { LightRunHour } from 'src/app/common/dto/LightRunHour';

@Component({
  selector: 'app-light-run-hour-analysis',
  templateUrl: './light-run-hour-analysis.component.html',
  styleUrls: ['./light-run-hour-analysis.component.css']
})
export class LightRunHourAnalysisComponent implements OnInit {

  constructor(private assetStatusService:AssetStatusService) { }
   
  @Input('slpId') assetId;
  showLoaderImage: boolean = true;
  lightRunHour : LightRunHour[];
  inter: NodeJS.Timeout;
  ngOnInit(): void {
    this.getLightRunHourAnalysis();
    this.refreshdata();
  }
   
  getLightRunHourAnalysis(){
    let organizationId = sessionStorage.getItem("beId");
     let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.assetStatusService.getLightRunHourAnalysis(Number(organizationId),
    Number(this.assetId), String(timezone)).subscribe(reponseData=>{
      this.showLoaderImage = false;
      if(null != reponseData){
      this.lightRunHour= reponseData;
      }
    },
    error => {
      this.showLoaderImage = false;
      console.log(error);
    }) 
  }
  refreshLightsRunHoutAnalysis(){
    this.getLightRunHourAnalysis();
  }

  refreshdata(){
    this.assetStatusService.getTimeIntervalsFromFile().toPromise().then(data => {
    let  interval = data.refreshtimeinterval;
    this.inter = setInterval(() => {
      this.assetStatusService.resetAutoLogOutTimeInterval();
      this.getLightRunHourAnalysis();
    }, +interval);
  });
}
ngOnDestroy() {
  clearInterval(this.inter);
} 
}
