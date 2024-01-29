import { Component, Input, OnInit } from '@angular/core';
import { AssetStatusService } from 'src/app/asset-type/service/asset-status.service';
import { Instantaneous } from 'src/app/common/dto/Instantaneous';

@Component({
  selector: 'app-instantaneous-electrical-parameter',
  templateUrl: './instantaneous-electrical-parameter.component.html',
  styleUrls: ['./instantaneous-electrical-parameter.component.css']
})
export class InstantaneousElectricalParameterComponent implements OnInit {

  constructor(private assetStatusService:AssetStatusService) { }
  @Input('slpId') assetId;
  displayedColumns = ['metricName', 'rPhaseValue', 'yPhaseValue', 'bPhaseValue'];
  showLoaderImage: boolean = true;
  instantaneous : Instantaneous[];
  inter: NodeJS.Timeout;
  noRecordsfound=false;
  ngOnInit(): void {
    this.getInstantaneousElectrical();
    this.refreshdata();
  }
   
  getInstantaneousElectrical(){
    let organizationId = sessionStorage.getItem("beId");
     let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.assetStatusService.getInstantaneousElectricalPrarameter(Number(organizationId),
    Number(this.assetId), String(timezone)).subscribe(reponseData=>{
      this.showLoaderImage = false;
     // if(null != reponseData){
      this.instantaneous=reponseData;
     // }
    },
    error => {
      this.showLoaderImage = false;
      console.log(error);
    }) 
  }
  refreshInstElectricalParameter(){
    this.getInstantaneousElectrical();
  }

  refreshdata(){
    this.assetStatusService.getTimeIntervalsFromFile().toPromise().then(data => {
    let  interval = data.refreshtimeinterval;
    this.inter = setInterval(() => {
      this.assetStatusService.resetAutoLogOutTimeInterval();
      this.getInstantaneousElectrical();
    }, +interval);
  });
}
ngOnDestroy() {
  clearInterval(this.inter);
} 
}
