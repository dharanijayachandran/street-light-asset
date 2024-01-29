import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/common/dto/Asset';
import { AssetType } from 'src/app/common/dto/AssetType';
import { AssetTypeImage } from 'src/app/common/dto/AssetTypeImage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetTypeService {
  dashboardurl=environment.baseUrl_DashboardEngine;
  assetManagementurl = environment.baseUrl_AssetManagement;
  apiurl=environment.baseUrl_StreetLightManagement;
  constructor(private http: HttpClient) { }

  getAssetTypesByOrganizationId(organizationId:number): Observable<AssetType[]> {
      return this.http.get<AssetType[]>(
        this.assetManagementurl + 'organizations/' + organizationId+'/asset-types');
  }

  getAssetsByTypeId(organizationId:number,assetTypeId:number):Observable<Asset[]>{
    let userId = sessionStorage.getItem("userId");
    let userType="";
    if (sessionStorage.getItem("isAdmin") == "true") {
      userType = "Admin";
    }
    return this.http.get<Asset[]>(
       this.assetManagementurl+'organizations/' + organizationId+'/asset-types/'+assetTypeId+'/assets?user-id=' +userId +"&user-type=" +userType);
  }
  getIconUrl(organizationId: number){
    return this.http.get<AssetTypeImage[]>(this.apiurl+"organizations/"+organizationId+"/asset-types");
  }
  
  getAssetSlpIds(organizationId: Number, assetId: Number): Observable<Asset[]> {
    let userId = sessionStorage.getItem("userId");
    let userType="";
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (sessionStorage.getItem("isAdmin") == "true") {
      userType = "Admin";
    }
    return this.http.get<Asset[]>
      (this.apiurl + 'organizations/' + organizationId + '/child-assets/' + assetId +'/latest-value?type-code=slp' +  '&offset=' +'&limit=' +'&timezone='+ timezone);
  }  
  getAssetTagsByAssetId(organizationId: Number, assetId: Number):Observable<Asset[]>{
    return this.http.get<Asset[]>(
      this.apiurl + 'organizations/' + organizationId +'/assets/' +assetId +'/statistics-asset-tags');
  }
  getAssetValueByAssetTagList(assetDetails): Observable<any> {
    return this.http.post<any>(this.dashboardurl + 'assetDataByAssetTagIds', assetDetails);
  }
}