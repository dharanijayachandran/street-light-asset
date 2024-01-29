import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetLatestStatus } from 'src/app/common/dto/AssetLatestStatus';
import { EnergyAnalysis } from 'src/app/common/dto/EnergyAnalysis';
import { Instantaneous } from 'src/app/common/dto/Instantaneous';
import { LightRunHour } from 'src/app/common/dto/LightRunHour';
import { RunHourAnalysis } from 'src/app/common/dto/RunHourAnalysis';
import { environment } from 'src/environments/environment';
const STORE_KEY = 'lastAction';
@Injectable({
  providedIn: 'root'
})
export class AssetStatusService {
  constructor(private http: HttpClient) { }
  streetLightManagement = environment.baseUrl_StreetLightManagement;
  getAssetLatestLightStatus(organizationId: number, assetId: number, timezone: string): Observable<AssetLatestStatus[]> {
    let userId = sessionStorage.getItem("userId");
    let userType="";
    if (sessionStorage.getItem("isAdmin") == "true") {
      userType = "Admin";
    }
    return this.http.get<AssetLatestStatus[]>(
      this.streetLightManagement + 'organizations/' + organizationId+'/assets/'+assetId+'/latest-light-status?timezone='+timezone+ "&user-id=" +userId +"&user-type=" +userType);
}

getAssetsStatusByStatusAssetIds(organizationId: number, assetId: number, timezone: string, statusAssetIds:String){
  let userId = sessionStorage.getItem("userId");
  let userType="";
  if (sessionStorage.getItem("isAdmin") == "true") {
    userType = "Admin";
  }
  return this.http.get<AssetLatestStatus[]>(
    this.streetLightManagement + 'organizations/' + organizationId+'/assets/'+assetId+'/status-asset-ids/latest-status?timezone='+timezone+'&status-assets-ids='+statusAssetIds+ "&user-id=" +userId +"&user-type=" +userType);
}

getTodaysEnergyConsumtionWithCost(organizationId: number, assetId: number,timezone: string ):Observable<EnergyAnalysis[]>{
  return this.http.get<EnergyAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/today-energy-analysis?timezone='+timezone);
}

getLatestLightStatus(organizationId: number, assetId: number, timezone: string):Observable<AssetLatestStatus[]>{
  let userId = sessionStorage.getItem("userId");
  let userType="";
  if (sessionStorage.getItem("isAdmin") == "true") {
    userType = "Admin";
  }
  return this.http.get<AssetLatestStatus[]>(
    this.streetLightManagement + 'organizations/' + organizationId+ '/'+assetId+ '/light-status?timezone='+timezone+  "&user-id=" +userId +"&user-type=" +userType );
}

getCurrentWeekEnergyConsumtionWithCost(organizationId: number, assetId: number,timezone: string ):Observable<EnergyAnalysis[]>{
  return this.http.get<EnergyAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/current-week-energy-analysis?timezone='+timezone);
}

getCurrentMonthEnergyConsumtionWithCost(organizationId: number, assetId: number,timezone: string ):Observable<EnergyAnalysis[]>{
  return this.http.get<EnergyAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/current-month-energy-analysis?timezone='+timezone);
}

getCurrentYearEnergyConsumtionWithCost(organizationId: number, assetId: number,timezone: string):Observable<EnergyAnalysis[]>{
  return this.http.get<EnergyAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/current-year-energy-analysis?timezone='+timezone);
}

getDailyRunHourAnalysis(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
  return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/daily-hour-analysis?timezone='+timezone);
}

getMonthRunHourAnalysis(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
  return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/monthly-hour-analysis?timezone='+timezone);
}

getYearlyRunHourAnalysis(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
  return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/yearly-hour-analysis?timezone='+timezone);
}

getLightRunHourAnalysis(organizationId: number, assetId: number,timezone: string):Observable<LightRunHour[]>{
  return this.http.get<LightRunHour[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/run-hour-analysis?timezone='+timezone);
}

getInstantaneousElectricalPrarameter(organizationId: number, assetId: number,timezone: string):Observable<Instantaneous[]>{
    return this.http.get<Instantaneous[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/instantaneous-electrical-parameter?timezone='+timezone);
  }

  getDailyEnergyComparision(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
    return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/daily-energy-comparison?timezone='+timezone);
  }

  getWeeklyEnergyComparision(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
    return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/weekly-energy-comparison?timezone='+timezone);
  }

  getMonthlyEnergyComparision(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
    return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/monthly-energy-comparison?timezone='+timezone);
  }

  getYearlyEnergyComparision(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
    return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/yearly-energy-comparison?timezone='+timezone);
  }

  getDailyCostComparision(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
    return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/daily-cost-comparison?timezone='+timezone);
  }

  getWeeklyCostComparision(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
    return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/weekly-cost-comparison?timezone='+timezone);
  }

  getMonthlyCostComparision(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
    return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/monthly-cost-comparison?timezone='+timezone);
  }

  getYearlyCostComparision(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
    return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/yearly-cost-comparison?timezone='+timezone);
  }

  getYearlyEnergyEmission(organizationId: number, assetId: number,timezone: string):Observable<RunHourAnalysis[]>{
    return this.http.get<RunHourAnalysis[]>(this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/yearly-energy-emission?timezone='+timezone);
  }


  getDoorStatus(organizationId: number, assetId: number,timezone: string):Observable<AssetLatestStatus[]>{
    let userId = sessionStorage.getItem("userId");
    let userType="";
    if (sessionStorage.getItem("isAdmin") == "true") {
      userType = "Admin";
    }
    return this.http.get<AssetLatestStatus[]>(
      this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/door-status?timezone='+timezone+ "&user-id=" +userId +"&user-type=" +userType);
  }
  getEnvironmentalparams(organizationId: number, assetId: number,timezone: string):Observable<AssetLatestStatus[]>{
    let userId = sessionStorage.getItem("userId");
    let userType="";
    if (sessionStorage.getItem("isAdmin") == "true") {
      userType = "Admin";
    }
    return this.http.get<AssetLatestStatus[]>(
      this.streetLightManagement + 'organizations/' + organizationId + '/' +assetId+ '/environment-parameters/latest-value?timezone='+timezone+ "&user-id=" +userId +"&user-type=" +userType);
  }

  getTimeIntervalsFromFile(): Observable<any> {
    return this.http.get<any>('/assets/street-light/json/refreshtimeinterval.json');
   }
   resetAutoLogOutTimeInterval(){
    localStorage.setItem(STORE_KEY, Date.now().toString());
   }

   getAlarmCountByType(organizationId: number, assetId: number,typeCode: string):Observable<Object>{
    let userId = sessionStorage.getItem("userId");
    let userType="";
    if (sessionStorage.getItem("isAdmin") == "true") {
      userType = "Admin";
    }
    return this.http.get<Object>(
      this.streetLightManagement + 'organizations/' + organizationId + '/alarm-count?asset-id='+assetId+'&asset-type='+typeCode+"&user-id=" +userId +"&user-type=" +userType);
   }
   
  getAssetLightStatus(organizationId: Number, assetId: Number): Observable<AssetLatestStatus[]> {
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let userId = sessionStorage.getItem("userId");
    let userType="";
    if (sessionStorage.getItem("isAdmin") == "true") {
      userType = "Admin";
    }
    return this.http.get<AssetLatestStatus[]>
      (this.streetLightManagement + 'organizations/' + organizationId + '/child-assets/' + assetId +'/latest-value?type-code=slp' +  '&offset=' +'&limit=' +'&timezone='+ timezone);
  }  
}