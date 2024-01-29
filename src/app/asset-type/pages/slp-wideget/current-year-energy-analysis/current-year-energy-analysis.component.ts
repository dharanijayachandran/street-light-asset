import { Component, Input, OnInit } from '@angular/core';
import { AssetStatusService } from 'src/app/asset-type/service/asset-status.service';
import { EnergyAnalysis } from 'src/app/common/dto/EnergyAnalysis';

@Component({
  selector: 'app-current-year-energy-analysis',
  templateUrl: './current-year-energy-analysis.component.html',
  styleUrls: ['./current-year-energy-analysis.component.css']
})
export class CurrentYearEnergyAnalysisComponent implements OnInit {
  constructor(private assetStatusService:AssetStatusService) { }
  @Input('slpId') assetId;
  showLoaderImage: boolean = true;
  currentyearEnergyAnalysis: EnergyAnalysis;
  inter: NodeJS.Timeout;
  ngOnInit(): void {
    this.getCurrentYearEnergy();
    this.refreshdata();
  }

  getCurrentYearEnergy(){
    let organizationId = sessionStorage.getItem("beId"); 
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
    this.assetStatusService.getCurrentYearEnergyConsumtionWithCost(Number(organizationId), Number(this.assetId), String(timezone)).subscribe(responseData=>{
      this.showLoaderImage = false;
      if(null != responseData){
      this.currentyearEnergyAnalysis=responseData[0];
      }
    },
    error => {
      this.showLoaderImage = false;
      console.log(error);
    })
  }
  refreshThisYearEnergyAnalysis(){
    this.getCurrentYearEnergy();
  }
  refreshdata(){
    this.assetStatusService.getTimeIntervalsFromFile().toPromise().then(data => {
    let  interval = data.refreshtimeinterval;
    this.inter = setInterval(() => {
      this.assetStatusService.resetAutoLogOutTimeInterval();
      this.getCurrentYearEnergy();
    }, +interval);
  });
}
ngOnDestroy() {
  clearInterval(this.inter);
} 
}
