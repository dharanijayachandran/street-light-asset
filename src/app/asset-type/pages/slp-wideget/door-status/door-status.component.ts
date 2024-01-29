import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TablePanelComponent } from 'global/lib/component/panel/table-panel/table-panel.component';
import { AssetStatusService } from 'src/app/asset-type/service/asset-status.service';
import { AssetLatestStatus } from 'src/app/common/dto/AssetLatestStatus';

@Component({
  selector: 'app-door-status',
  templateUrl: './door-status.component.html',
  styleUrls: ['./door-status.component.css']
})
export class DoorStatusComponent implements OnInit {
  constructor(private assetStatusService:AssetStatusService) { }
  @Input('slpId') assetId;
  doorStatus:AssetLatestStatus;
  showLoaderImage: boolean = true;
  imageUrl: string;
  status:any;
  statusTime:any;
  @ViewChild('panelHeader')
  public panelHeader : TablePanelComponent;
  inter: NodeJS.Timeout;
  ngOnInit(): void {
    this.imageUrl = "/assets/street-light/img/status/door-status-closed.png";
    this.getDoorStatus();
    this.refreshdata();
  }

   getDoorStatus(){
    let organizationId = sessionStorage.getItem("beId");
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   this.assetStatusService.getDoorStatus(Number(organizationId),
   Number(this.assetId), String(timezone)).subscribe(reponseData=>{
    this.showLoaderImage = false;
     this.doorStatus=reponseData[0];
     this.status=this.doorStatus.status;
     this.statusTime=this.doorStatus.statusTime;
      if (null != this.doorStatus && null != this.doorStatus.status) {
        if (this.doorStatus.status.toUpperCase() == "OPEN") {
          this.imageUrl =  "/assets/street-light/img/status/door-status-open.png";
        }
      }
     
   },
   error => {
    this.showLoaderImage = false;
     console.log(error);
   }) 
   }

    maxOrMinScreen(){
     let chartId= document.getElementById('door');
     if(this.panelHeader.expand == true){
       chartId.requestFullscreen(); 
     }else{  
     document.exitFullscreen(); 
     }
   } 

   refreshDoorStatus(){
    this.imageUrl = "/assets/street-light/img/status/door-status-closed.png";
    this.getDoorStatus();
   }

   refreshdata(){
    this.assetStatusService.getTimeIntervalsFromFile().toPromise().then(data => {
    let  interval = data.refreshtimeinterval;
    this.inter = setInterval(() => {
      this.assetStatusService.resetAutoLogOutTimeInterval();
      this.imageUrl = "/assets/street-light/img/status/door-status-closed.png";
    this.getDoorStatus();
    }, +interval);

  });
}
ngOnDestroy() {
  clearInterval(this.inter);
} 
}
