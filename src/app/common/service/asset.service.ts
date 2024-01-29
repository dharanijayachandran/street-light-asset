import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeStamp } from 'console';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asset } from '../dto/Asset';
import { AssetType } from '../dto/AssetType';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  assetManagementurl = environment.baseUrl_AssetManagement;
  assetTypes: AssetType[] = [];
  assetTags:Asset;
  assetTagValue:Asset;
  assets:Asset[]=[];
  assetRequest:Asset;
  assetType:String;
  assetName:string;
  geospatialCoordinates: any;
  typecode: string;
  assetId:any;
  startDate:any;
  endDate:any;
  assetTagObjects:any;
  tabValue:any;
  constructor(private http: HttpClient) { }
  setAssetType(pAssetType:any){
    this.assetType=pAssetType.typeName;
    this.assetName=pAssetType.name;
    this.geospatialCoordinates = pAssetType.geospatialCoordinates;
    this.typecode=pAssetType.typeCode;
  }
  setAssetTypeCode(pAssetTypeCode:string){
    this.typecode=pAssetTypeCode;
  }

  setAssetId(pAssetId:any){
    this.assetId=pAssetId;

  }

  setAssetRequest(assetId:number, typeName:string){
    this.assetRequest.id=assetId;
    this.assetRequest.typeName=typeName;
  }
  getAssetRequest(){
    this.assetRequest;
  }
  setAssets(pAssets:any){
    this.assets=pAssets;
  }
  getAssets(){
    return this.assets;
  }

  setAssetTypes(pAssetTypes: any){
    this.assetTypes=pAssetTypes;

  }

  getAssetTypes(){
    return this.assetTypes;
  }

  getAssetById(organizationId: Number, assetId: Number):Observable<Asset[]>{
    let userId = sessionStorage.getItem("userId");
    let userType="";
    if (sessionStorage.getItem("isAdmin") == "true") {
      userType = "Admin";
    }
    return this.http.get<Asset[]>(
    this.assetManagementurl+'organizations/' + organizationId+'/assets/'+assetId+'?user-id=' +userId +"&user-type=" +userType);
  }

  getAssetsByOrganizationId(organizationId: number, userId: number): Observable<Asset[]> {
    let userType="";
    if (sessionStorage.getItem("isAdmin") == "true") {
      userType = "Admin";
    }
     return this.http.get<Asset[]>(this.assetManagementurl + 'assetsByOrganizationId/' + organizationId+"?user-id="+userId+ "&user-type=" +userType+"&offset=" + 0 + "&limit=" + 0);

   }
   setAssetTagDate(startDate:any,endDate:any){
    this.startDate=startDate;
    this.endDate=endDate;
   }
   setAssetTagObjects(data:any){
    this.assetTagObjects=data;
   }
   setTabValue(data:any){
    this.tabValue=data;
   }
}
