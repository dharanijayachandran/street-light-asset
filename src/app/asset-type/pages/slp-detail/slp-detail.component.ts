
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent, ChartTheme, ControlPoints, ILoadedEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { Hmac } from 'crypto';
import { ScrollbarDirective } from 'global';
import { EMPTY } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { Asset } from 'src/app/common/dto/Asset';
import { AssetTagDetails } from 'src/app/common/dto/AssetTagDetails';
import { AssetService } from 'src/app/common/service/asset.service';
import { AssetStatusService } from '../../service/asset-status.service';
import { AssetTypeService } from '../../service/asset-type.service';
@Component({
  selector: 'app-slp-detail',
  templateUrl: './slp-detail.component.html',
  styleUrls: ['./slp-detail.component.css']
})
export class SlpDetailComponent implements OnInit {
  noRecordsFound = false;
  showLoaderImage: boolean;
  assetId: any;
  searchText;
  todayDate:any;
  selectedItems:any;
  selectedAssetId:number;
  selectedAssetName:string;
  displayedColumns = ['statistic-list'];
  public title: string;
  assetTags:any;
  assetTagValue:any;
  public primaryXAxis: Object;
public primaryYAxis: Object;
lengthObj: number;
columnLengthList = [];
xyAxisConfiguaration = [];
field: Object = {};
getDataSource:Asset;
pages:any;
displayPage: any;
inter: NodeJS.Timeout;
data:any[]=[];
@ViewChild(ScrollbarDirective) directiveRef?: ScrollbarDirective;
@Output() navigateTemplate = new EventEmitter();
@ViewChild('chartTdy') public chartTdy: ChartComponent;
@ViewChild('chartYdy') public chartYdy: ChartComponent;
@ViewChild('chartSevendy') public chartSevendy: ChartComponent;
  constructor(private _Activatedroute: ActivatedRoute, private assettypeservice:AssetTypeService,
    private assetservice:AssetService,private assetStatusService:AssetStatusService) {  
    } 
  ngOnInit(): void {
    this.showLoaderImage = true;
    this.selectedItems=[];
    this._Activatedroute.queryParamMap.subscribe(params => {
      this.assetId = params.get('id');
      this.getAllAssetTagsByAssetId(this.assetId);
    });
    this.refreshdata();
}
/* Getting Asset tags in left side */
getAllAssetTagsByAssetId(assetId){
   let organizationId = sessionStorage.getItem("beId"); 
   this.assettypeservice.getAssetTagsByAssetId(Number(organizationId), Number(this.assetId)).subscribe(responseData=>{
    this.assetTags=responseData;
    this.formatedResponse(this.assetTags);
    this.field['dataSource'][0].isSelected = true;
    this.onLoadFilterData(this.assetTags[0]);
    this.assetTags[0].id;
   })
}
formatedResponse(response: any) {
  return this.field = {
    dataSource: response,
    id: 'id',
    text: 'name',
    selected: 'isSelected'
  };
}
 onLoadFilterData(assetTag){
  this.noRecordsFound=false;
  this.selectedItems=[];
  this.onLoadRequiredFormat(assetTag);
  this.selectedAssetId = this.assetId;
  this.selectedAssetName = assetTag.name;
  this.todayDate=this.convert();
  this.getTodayData(this.todayDate);
  
} 
onLoadRequiredFormat(assetTag){
  const that = this;
  var returnObj = {
    "id": assetTag.id,
    "itemName": assetTag.text
  }
  this.selectedItems.push(returnObj)
}
/* After clicking any asset tags */
onClickFilterData($event:any){
  this.noRecordsFound=false;
  this.selectedItems=[];
  this.requiredFormat($event);
  this.selectedAssetId = this.assetId;
  this.selectedAssetName = $event.nodeData.text;
  this.getOnClickAssetTagDate();
}
requiredFormat(assetTags) {
  const that = this;
    var returnObj = {
      "id": assetTags.nodeData.id,
      "itemName": assetTags.nodeData.text
    }
    this.selectedItems.push(returnObj)
}
/* Take specific assettag */
getOnClickAssetTagDate(){
  let startDate=this.assetservice.startDate;
  let endDate=this.assetservice.endDate;
  this.getAssetTagData(startDate,endDate)
}
 getAssetTagData(startDate,endDate){
  this.noRecordsFound=false;
  let assetTagObjects = this.formatAssetTagObjects();
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let assetTagDetails = new AssetTagDetails();
  assetTagDetails.assetId=this.selectedAssetId;
  assetTagDetails.startDate=startDate;
  assetTagDetails.endDate=endDate;
  assetTagDetails.targetTimeZone=timezone;
  assetTagDetails.assetTags=assetTagObjects;
  this.assetservice.setAssetTagObjects(assetTagObjects);
   this.assettypeservice.getAssetValueByAssetTagList(assetTagDetails).subscribe(res => {
      this.showLoaderImage = false;
      if(res.length==1){
        this.noRecordsFound=true;
      }
      this.showLoaderImage = false;
      this.assetTagValue = res;
      this.getAssetDataByAssetTagIds(res);
      })
}
getAssetDataByAssetTagIds(res) {
  this.lengthObj = 0;
  this.columnLengthList = [];
  let listOfAssetTags = [];
  this.lengthObj = res.length - 1;
  for (let i = 0; i < res.length - 1; i++) {
    listOfAssetTags.push(res[i]);
  }
  this.convertAssetDataToDataSet(listOfAssetTags);
}
public zoomSettings: Object = {
};
public load(args: ILoadedEventArgs): void {
  let selectedTheme: string = location.hash.split('/')[1];
  selectedTheme = selectedTheme ? selectedTheme : 'Material';
  args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
};
legend: boolean;
public width: string = Browser.isDevice ? '100%' : '100%';
public chartArea: Object = {
  border: {
    width: 0
  }
};
public tooltip: Object = {
  enable: true
};
public marker: Object;
public animation: Object = { enable: false };
convertAssetDataToDataSet(dataSource: any[]) {
  dataSource.forEach(element => {
    let series = [];
    let keys = Object.keys(element[0]);
    let value = keys[1];
    element.forEach(e => {
      let newObject = {};
      let xV = 0;
      let yV = 0;
      let time = e.Time;
      let FinalDate = new Date(time).getTime();
      xV = Number(FinalDate);
      yV = Number(e[value]);
      if (!Number.isNaN(xV) && !Number.isNaN(yV)) {
        newObject = { x: xV, y: yV };
      }
      series.push(newObject);
    });
    this.data = [];
    this.data.push(series);
    this.intializeLineChart(keys);
  });
}
intializeLineChart(keys) {
  let tabValue=this.assetservice.tabValue;
  if(tabValue=='seven_days'){
    let startDate=this.assetservice.startDate;
    let endDate=this.assetservice.endDate;
    this.primaryXAxis = {
      title: keys[0],
      labelIntersectAction: 'Rotate45',
      valueType: 'DateTime',
      labelFormat: 'yy-M-d H:mm:ss',
      edgeLabelPlacement: 'Shift',
      majorGridLines: { width: 0 },
      minimum: new Date(startDate),
      maximum: new Date(endDate),
    };
  }else{
    this.primaryXAxis = {
      title: keys[0],
      labelIntersectAction: 'Rotate45',
      valueType: 'DateTime',
      labelFormat: 'H:mm:ss',
      edgeLabelPlacement: 'Shift',
      majorGridLines: { width: 0 },
    };
  }
  let newObject = {};
  this.zoomSettings = {
    mode: 'X',
    enableDeferredZooming: true,
    enablePinchZooming: true,
    enableSelectionZooming: true,
    enableScrollbar: true,
  };
  this.primaryYAxis = {
    title: keys[1],
    valueType: 'Double',
    labelFormat: "n2",
    rangePadding: 'None',
    lineStyle: { width: 1 },
    majorTickLines: { width: 0 }
  };
  this.marker = {
    visible: true, width: 5, height: 5, fill: '#17a2b8', shape: 'Circle'
  };
  this.xyAxisConfiguaration = [];
  newObject = { zoomSettings: this.zoomSettings, primaryXAxis: this.primaryXAxis, primaryYAxis: this.primaryYAxis };
  this.xyAxisConfiguaration.push(newObject);
}
getTodayData(todayDate){
  let startTime = '00:00:00';
  let startDate=todayDate+'T'+startTime;
  var time = new Date();
  let endTime = time.toLocaleString('en-US', { hour: 'numeric', hour12: false, minute:'numeric',second:'numeric'})
  let endDate= todayDate+'T'+endTime;
  this.assetservice.setAssetTagDate(startDate,endDate);
  this.getAssetTagData(startDate,endDate);
}
getYesterdayData(yesterdayDate){
  let startTime = '00:00:00';
  let startDate=yesterdayDate+'T'+startTime;
  let endTime = '23:59:00';
  let endDate= yesterdayDate+'T'+endTime;
  this.assetservice.setAssetTagDate(startDate,endDate);
  this.getAssetTagData(startDate,endDate)
}
getSevenDaysData(sevenDaysDate){
  let startTime = '00:00:00';
  let startDate=sevenDaysDate+'T'+startTime;
  var time = new Date();
  let endTime = time.toLocaleString('en-US', { hour: 'numeric', hour12: false, minute:'numeric',second:'numeric'})
  let endDate= this.todayDate+'T'+endTime;
  this.assetservice.setAssetTagDate(startDate,endDate);
  this.getAssetTagData(startDate,endDate);
}
/* Today Date And time */
 convert() {
  var date = new Date(),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate() ).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}
changeTab(event) {
  if (event.nextId == 'today') {
    this.assetservice.setTabValue('today');
    this.getTodayData(this.todayDate);
  }
   if (event.nextId == 'yesterday') {
    this.assetservice.setTabValue('yesterday');
    var yesterday = new Date(new Date().setDate(new Date().getDate() - 1)),
    mnth = ("0" + (yesterday.getMonth() + 1)).slice(-2),
    day = ("0" + yesterday.getDate() ).slice(-2);
    this.getYesterdayData([yesterday.getFullYear(), mnth, day].join("-"));
  }
   if (event.nextId == 'seven_days') {
    this.assetservice.setTabValue('seven_days');
    var seven_days = new Date(new Date().setDate(new Date().getDate() - 6)),
    mnth = ("0" + (seven_days.getMonth() + 1)).slice(-2),
    day = ("0" + seven_days.getDate() ).slice(-2);
   this.getSevenDaysData([seven_days.getFullYear(), mnth, day].join("-"));
  }
}
/* Format asset tags for post method */
formatAssetTagObjects(){
  let assetTagObjects =[];
  if (this.selectedItems != null && this.selectedItems.length != 0) {
    if (this.assetTags != null && this.assetTags.length != 0) {
      this.assetTags.forEach(e => {
        this.selectedItems.forEach(element => {
          if (e.id == element.id) {
            let Obj = {
              "id": e.id,
              "dataTypeId": e.dataTypeId,
              "tagType": e.tagType,
              "name": e.name,
              "displayOrder":e.displayOrder
            }
            assetTagObjects.push(Obj);
          }
        });
      });
    }
  }
  else {
    if (this.assetTags != null && this.assetTags.length != 0) {
      this.assetTags.forEach(e => {
        let Obj = {
          "id": e.id,
          "dataTypeId": e.dataTypeId,
          "tagType": e.tagType,
          "name": e.name,
          "displayOrder":e.displayOrder
        }
        assetTagObjects.push(Obj);
      });
    }
  }
  return assetTagObjects;
}/* Search start here */


filterAsset(filterText: string) {
  let assetDataList = [];
  assetDataList = JSON.parse(JSON.stringify(this.assetTags));
  if (filterText.length > 0) {
    this.applyFilter(assetDataList, filterText);
    assetDataList = assetDataList.filter(
      node => node.visible === true);
  }
  if (assetDataList.length == 0) {
    this.noRecordsFound = true;
  } else {
    this.noRecordsFound = false;
    this.getDataSource = this.getFormattedAssetList(assetDataList);
    this.field = this.formatedResponse(this.getDataSource);
    this.directiveRef.scrollToTop();
    this.directiveRef.update();
   // this.field['dataSource'][0].isSelected = true;
  }
}

// Filtering the Nodes by user input
applyFilter(list, searchString) {
  const that = this;
  let isSubMenusVisible;
  return list.map(function (d) {
    isSubMenusVisible = null;
    if (d.subAssets && d.subAssets.length) {
      d.subAssets = that.applyFilter(d.subAssets, searchString);
      isSubMenusVisible = d.subAssets.filter(function (sm) {
        return sm.visible;
      });
    }
    d.visible = d.name.toLowerCase().includes(searchString.toLowerCase()) || (isSubMenusVisible && isSubMenusVisible.length > 0 ? true : false);
    if (d.subAssets && d.subAssets.length) {
      d.subAssets = d.subAssets.filter(sub => sub.visible)
    }
    return d;
  });
}

getFormattedAssetList(list) {
  const that = this;
  return list.map(function (l) {
    return {
      id: l.id,
      name: l.name
    };
  });
}
/* Search end here */
refreshTableListFunction(){
  this.getOnClickAssetTagDate();
}
refreshdata(){
  this.assetStatusService.getTimeIntervalsFromFile().toPromise().then(data => {
  let  interval = data.refreshtimeinterval;
  this.inter = setInterval(() => {
    this.assetStatusService.resetAutoLogOutTimeInterval();
    this.getOnClickAssetTagDate();
  }, +interval);
});
}
}
