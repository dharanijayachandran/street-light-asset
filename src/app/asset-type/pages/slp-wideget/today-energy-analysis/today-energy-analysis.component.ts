import { Component, Input, OnInit } from '@angular/core';
import { AssetStatusService } from 'src/app/asset-type/service/asset-status.service';
import { EnergyAnalysis } from 'src/app/common/dto/EnergyAnalysis';

@Component({
  selector: 'app-today-energy-analysis',
  templateUrl: './today-energy-analysis.component.html',
  styleUrls: ['./today-energy-analysis.component.css']
})
export class TodayEnergyAnalysisComponent implements OnInit {

  constructor(private assetStatusService:AssetStatusService) { }

  todaysEnergyAnalysis: EnergyAnalysis;
  showLoaderImage: boolean = true;
  @Input('slpId') assetId;
  inter: NodeJS.Timeout;

  ngOnInit(): void {
    this.getTodaysEnergyAnalysis();
    this.refreshdata();
  }
 
   getTodaysEnergyAnalysis(){
    let organizationId = sessionStorage.getItem("beId"); 
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.assetStatusService.getTodaysEnergyConsumtionWithCost(Number(organizationId), Number(this.assetId), String(timezone)).subscribe(responseData=>{
     if(responseData){
      this.showLoaderImage = false;
      this.todaysEnergyAnalysis = responseData[0];
     }
    },
    error => {
      this.showLoaderImage = false;
      console.log(error);
    })
   }

   refreshTodayEnergyAnalysis(){
    this.getTodaysEnergyAnalysis();
   }

   refreshdata(){
    this.assetStatusService.getTimeIntervalsFromFile().toPromise().then(data => {
    let  interval = data.refreshtimeinterval;
    this.inter = setInterval(() => {
      this.assetStatusService.resetAutoLogOutTimeInterval();
      this.getTodaysEnergyAnalysis();
    }, +interval);

  });
}
ngOnDestroy() {
  clearInterval(this.inter);
} 

}
