import { Component, Input, OnInit } from '@angular/core';
import { AssetStatusService } from 'src/app/asset-type/service/asset-status.service';
import { EnergyAnalysis } from 'src/app/common/dto/EnergyAnalysis';

@Component({
  selector: 'app-current-week-energy-analysis',
  templateUrl: './current-week-energy-analysis.component.html',
  styleUrls: ['./current-week-energy-analysis.component.css']
})
export class CurrentWeekEnergyAnalysisComponent implements OnInit {
  constructor(private assetStatusService:AssetStatusService) { }
  showLoaderImage: boolean = true;
  @Input('slpId') assetId;
  currentWeekEnergyAnalysis: EnergyAnalysis;
  inter: NodeJS.Timeout;
  ngOnInit(): void {
    this.getCurrentWeekEnergy();
    this.refreshdata();
  }

  getCurrentWeekEnergy(){
    let organizationId = sessionStorage.getItem("beId"); 
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
    this.assetStatusService.getCurrentWeekEnergyConsumtionWithCost(Number(organizationId), Number(this.assetId), String(timezone)).subscribe(responseData=>{
      this.showLoaderImage = false;
      this.currentWeekEnergyAnalysis = responseData[0];
    },error => {
      this.showLoaderImage = false;
      console.log(error);
    })
  }
  refreshThisWeekEnergyAnalysis(){
    this.getCurrentWeekEnergy();
  }
  refreshdata(){
    this.assetStatusService.getTimeIntervalsFromFile().toPromise().then(data => {
    let  interval = data.refreshtimeinterval;
    this.inter = setInterval(() => {
      this.assetStatusService.resetAutoLogOutTimeInterval();
      this.getCurrentWeekEnergy();
    }, +interval);
  });
}
ngOnDestroy() {
  clearInterval(this.inter);
} 
}
