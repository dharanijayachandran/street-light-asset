import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AccumulationChart, AccumulationChartComponent, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { TablePanelComponent } from 'global/lib/component/panel/table-panel/table-panel.component';
import { AssetStatusService } from 'src/app/asset-type/service/asset-status.service';
import { RunHourAnalysis } from 'src/app/common/dto/RunHourAnalysis';

@Component({
  selector: 'app-daily-cost-comparision',
  templateUrl: './daily-cost-comparision.component.html',
  styleUrls: ['./daily-cost-comparision.component.css']
})
export class DailyCostComparisionComponent implements OnInit {

  constructor(private assetStatusService:AssetStatusService) { }
  @Input('slpId') assetId;
  showLoaderImage: boolean = true;
  dailyCost: RunHourAnalysis [];
  tooltip: Object;
  chartArea: Object;
  palette: string[];
  inter: NodeJS.Timeout;
  @ViewChild('chart')
    public chart: AccumulationChartComponent | AccumulationChart;

    @ViewChild('panelHeader')
    public panelHeader : TablePanelComponent;

  ngOnInit(): void {
    this.setToolTip();
    this.setChartArea();
    this.getDailyCostComparision();
    this.refreshdata();
  }

  refreshdata(){
    this.assetStatusService.getTimeIntervalsFromFile().toPromise().then(data => {
    let  interval = data.refreshtimeinterval;
    this.inter = setInterval(() => {
      this.assetStatusService.resetAutoLogOutTimeInterval();
    //call method here
      this.getDailyCostComparision();
    }, +interval);
  });
}
  setToolTip(){
    this.tooltip = {
      enable: true,
      format: 'Cost : ${point.y} OMR</b>' 
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

  getDailyCostComparision(){
    let organizationId = sessionStorage.getItem("beId"); 
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; 
     this.assetStatusService.getDailyCostComparision(Number(organizationId), Number(this.assetId), String(timezone)).subscribe(responseData=>{
      this.showLoaderImage = false;
      if(null != responseData){
      this.dailyCost=responseData;
      this.chart.series[0].dataSource=responseData;
      }
    },
    error => {
      this.showLoaderImage = false;
      console.log(error);
    })

  }
  public primaryXAxis: Object = {
    title:'Last 7 Days',
    valueType: 'Category',
    labelIntersectAction: 'Rotate45',
    majorGridLines: { width: 0 },
    minorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    lineStyle: { width: 0 }   
  };
   public primaryYAxis: Object = {
    minimum: 0,
    majorGridLines: { width: 1 },
    minorGridLines: { width: 1 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
    lineStyle: { width: 1 }
  };
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
   refreshDailyCostComparison(){
    this.getDailyCostComparision();
   }
   ngOnDestroy() {
    clearInterval(this.inter);
  } 
}
