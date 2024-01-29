import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartTestingComponent } from './asset-type/pages/chart-testing/chart-testing.component';
import {DateTimeService,LegendService, CategoryService, ChartModule, ColumnSeriesService, LineSeriesService, TooltipService,AccumulationChartAllModule, MultiColoredLineSeriesService, RangeColumnSeriesService, StackingColumnSeriesService, ZoomService } from '@syncfusion/ej2-angular-charts';
import { AssetLayoutComponent } from './asset-type/pages/asset-layout/asset-layout.component';
import { AssetHeaderComponent } from './asset-type/pages/asset-header/asset-header.component';
import { AssetTypeListComponent } from './asset-type/pages/asset-type-list/asset-type-list.component';
import { MainInterceptor } from './main-interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AssetListComponent } from './asset-type/pages/asset-list/asset-list.component';
import { AssetDetailComponent } from './asset-type/pages/asset-detail/asset-detail.component';
import { AssetChildComponent } from './asset-type/pages/asset-child/asset-child.component';
import { SiteDetailComponent } from './asset-type/pages/site-detail/site-detail.component';
import { GlobalModule, PendingChangesGuard } from 'global';
import { SlpDetailComponent } from './asset-type/pages/slp-detail/slp-detail.component';
import { CurrentMonthEnergyAnalysisComponent } from './asset-type/pages/slp-wideget/current-month-energy-analysis/current-month-energy-analysis.component';
import { CurrentWeekEnergyAnalysisComponent } from './asset-type/pages/slp-wideget/current-week-energy-analysis/current-week-energy-analysis.component';
import { CurrentYearEnergyAnalysisComponent } from './asset-type/pages/slp-wideget/current-year-energy-analysis/current-year-energy-analysis.component';
import { DailyCostComparisionComponent } from './asset-type/pages/slp-wideget/daily-cost-comparision/daily-cost-comparision.component';
import { DailyEnergyComparisionComponent } from './asset-type/pages/slp-wideget/daily-energy-comparision/daily-energy-comparision.component';
import { DailyRunHourAnalysisComponent } from './asset-type/pages/slp-wideget/daily-run-hour-analysis/daily-run-hour-analysis.component';
import { DoorStatusComponent } from './asset-type/pages/slp-wideget/door-status/door-status.component';
import { InstantaneousElectricalParameterComponent } from './asset-type/pages/slp-wideget/instantaneous-electrical-parameter/instantaneous-electrical-parameter.component';
import { LightRunHourAnalysisComponent } from './asset-type/pages/slp-wideget/light-run-hour-analysis/light-run-hour-analysis.component';
import { LightStatusComponent } from './asset-type/pages/slp-wideget/light-status/light-status.component';
import { MonthlyCostComparisionComponent } from './asset-type/pages/slp-wideget/monthly-cost-comparision/monthly-cost-comparision.component';
import { MonthlyRunHourAnalysisComponent } from './asset-type/pages/slp-wideget/monthly-run-hour-analysis/monthly-run-hour-analysis.component';
import { TodayEnergyAnalysisComponent } from './asset-type/pages/slp-wideget/today-energy-analysis/today-energy-analysis.component';
import { WeeklyCostComparisionComponent } from './asset-type/pages/slp-wideget/weekly-cost-comparision/weekly-cost-comparision.component';
import { WeeklyEnergyComparisionComponent } from './asset-type/pages/slp-wideget/weekly-energy-comparision/weekly-energy-comparision.component';
import { YearlyCostComparisionComponent } from './asset-type/pages/slp-wideget/yearly-cost-comparision/yearly-cost-comparision.component';
import { YearlyRunHourAnalysisComponent } from './asset-type/pages/slp-wideget/yearly-run-hour-analysis/yearly-run-hour-analysis.component';
import { YearlyEnergyComparisionComponent } from './asset-type/pages/slp-wideget/yearly-energy-comparision/yearly-energy-comparision.component';
import { MonthlyEnergyComparisionComponent } from './asset-type/pages/slp-wideget/monthly-energy-comparision/monthly-energy-comparision.component';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { YearlyEnergyEmissionComponent } from './asset-type/pages/slp-wideget/yearly-energy-emission/yearly-energy-emission.component';
import { EnvironmentalParametersComponent } from './asset-type/pages/slp-wideget/environmental-parameters/environmental-parameters.component';
import { SlpListComponent } from './asset-type/pages/slp-list/slp-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import { GaugeTooltipService } from '@syncfusion/ej2-angular-circulargauge';
import { ExcelExportService, FilterService, GroupService, PageService, SortService, ToolbarService, VirtualScrollService } from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [
    AppComponent,
    ChartTestingComponent,
    AssetLayoutComponent,
    AssetHeaderComponent,
    AssetTypeListComponent,
    AssetListComponent,
    AssetDetailComponent,
    AssetChildComponent,
    SiteDetailComponent,
    SlpDetailComponent,
    CurrentMonthEnergyAnalysisComponent,
    CurrentWeekEnergyAnalysisComponent,
    CurrentYearEnergyAnalysisComponent,
    DailyCostComparisionComponent,
    DailyEnergyComparisionComponent,
    DailyRunHourAnalysisComponent,
    DoorStatusComponent,
    InstantaneousElectricalParameterComponent,
    LightRunHourAnalysisComponent,
    LightStatusComponent,
    MonthlyEnergyComparisionComponent,
    MonthlyCostComparisionComponent,
    MonthlyRunHourAnalysisComponent,
    TodayEnergyAnalysisComponent,
    WeeklyCostComparisionComponent,
    WeeklyEnergyComparisionComponent,
    YearlyEnergyComparisionComponent,
    YearlyCostComparisionComponent,
    YearlyRunHourAnalysisComponent,
    YearlyEnergyEmissionComponent,
    EnvironmentalParametersComponent,
    SlpListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartModule,
    HttpClientModule,
    MatTableModule,
    GlobalModule,
    TreeViewModule,
    NgbModule,
    MatSelectModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    TooltipService,MultiColoredLineSeriesService, PendingChangesGuard,
    GaugeTooltipService, LineSeriesService, CategoryService,
    LegendService, SortService, RangeColumnSeriesService,
    StackingColumnSeriesService, ColumnSeriesService,
    FilterService, VirtualScrollService, PageService,
    ToolbarService, PageService, ExcelExportService,
    DateTimeService, GroupService, ZoomService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
