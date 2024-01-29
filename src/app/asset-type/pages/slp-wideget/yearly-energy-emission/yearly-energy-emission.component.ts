import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent } from '@syncfusion/ej2-angular-charts';
import { TablePanelComponent } from 'global/lib/component/panel/table-panel/table-panel.component';
import { AssetStatusService } from 'src/app/asset-type/service/asset-status.service';
import { RunHourAnalysis } from 'src/app/common/dto/RunHourAnalysis';

@Component({
  selector: 'app-yearly-energy-emission',
  templateUrl: './yearly-energy-emission.component.html',
  styleUrls: ['./yearly-energy-emission.component.css']
})
export class YearlyEnergyEmissionComponent implements OnInit {

  constructor(private assetStatusService:AssetStatusService) { }

  @Input('slpId') assetId: any;
  showLoaderImage: boolean = true;
  yearlyEnergyEmission: RunHourAnalysis [];
  inter: NodeJS.Timeout;
  tooltip: Object;
  chartArea: Object;
  palette: string[];

  
  @ViewChild('chart')
    public chart : AccumulationChartComponent | AccumulationChart;

  @ViewChild('panelHeader')
    public panelHeader : TablePanelComponent;
  ngOnInit() {
    this.setToolTip();
    this.setChartArea();
    this.getYearlyEnergyEmission();
    this.refreshdata();
  }
  setToolTip(){
    this.tooltip = {
      enable: true,
      format: 'Cost : ${point.y} MT</b>' 
  }
  this.palette = ["#FFA500"];
  }

  setChartArea(){
    this.chartArea= {
     border: {
       width: 0
     }
   }
  }
  

  getYearlyEnergyEmission(){
    let organizationId = sessionStorage.getItem("beId"); 
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
    this.assetStatusService.getYearlyEnergyEmission(Number(organizationId), Number(this.assetId), String(timezone)).subscribe(responseData=>{
      this.showLoaderImage = false;
      if(null != responseData){
     this.yearlyEnergyEmission = responseData;
     this.chart.series[0].dataSource=responseData;
      }
    },
    error => {
      this.showLoaderImage = false;
      console.log(error);
    })
  }
  
  

  refreshdata(){
    this.assetStatusService.getTimeIntervalsFromFile().toPromise().then(data => {
    let  interval = data.refreshtimeinterval;
    this.inter = setInterval(() => {
      this.assetStatusService.resetAutoLogOutTimeInterval();
      this.getYearlyEnergyEmission();
    }, +interval);
  });
}
ngOnDestroy() {
  clearInterval(this.inter);
}

public primaryXAxis: Object = {
  title:'Last 3 Years',
  valueType: 'Category',
  labelIntersectAction: 'Rotate45',
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    lineStyle: { width: 0 }   
};
public primaryYAxis: Object = {
  minimum:0,
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  lineStyle: { width: 1 }
};
refreshYearlyEnergyEmission(){
  this.getYearlyEnergyEmission();
}
maxOrMinScreen(){
 // let chartId= document.getElementById('ect');
  if(this.panelHeader.expand == true){
   /*  chartId.requestFullscreen(); */
    this.chart.height='100%';
  }else{  
  // document.exitFullscreen();
   this.chart.height='250px';
  }
}
}
