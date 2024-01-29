import { Component, Input, OnInit } from '@angular/core';
import { AssetStatusService } from 'src/app/asset-type/service/asset-status.service';
import { EnergyAnalysis } from 'src/app/common/dto/EnergyAnalysis';

@Component({
  selector: 'app-current-month-energy-analysis',
  templateUrl: './current-month-energy-analysis.component.html',
  styleUrls: ['./current-month-energy-analysis.component.css']
})
export class CurrentMonthEnergyAnalysisComponent implements OnInit {

 
  constructor(private assetStatusService:AssetStatusService) { }
  currentMonthEnergyAnalysis: EnergyAnalysis;
  showLoaderImage: boolean = true;
  @Input('slpId') assetId;
  inter: NodeJS.Timeout;
  ngOnInit(): void {
    this.getCurrentMonthEnergy();
    this.refreshdata();
  }
  ngOnDestroy() {
    clearInterval(this.inter);
  } 
  getCurrentMonthEnergy(){
    let organizationId = sessionStorage.getItem("beId"); 
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
    this.assetStatusService.getCurrentMonthEnergyConsumtionWithCost(Number(organizationId), Number(this.assetId), String(timezone)).subscribe(responseData=>{
      this.showLoaderImage = false;
      this.currentMonthEnergyAnalysis = responseData[0];
    })
  }

  refreshThisMonthEnergyAnalysis(){
    this.getCurrentMonthEnergy();
  }

  refreshdata(){
    this.assetStatusService.getTimeIntervalsFromFile().toPromise().then(data => {
    let  interval = data.refreshtimeinterval;
    this.inter = setInterval(() => {
      this.assetStatusService.resetAutoLogOutTimeInterval();
      this.getCurrentMonthEnergy();
    }, +interval);
  });
}
}
