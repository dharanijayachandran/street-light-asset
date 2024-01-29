import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-testing',
  templateUrl: './chart-testing.component.html',
  styleUrls: ['./chart-testing.component.css']
})
export class ChartTestingComponent implements OnInit {
  public primaryXAxis: Object;
  public chartData: Object[];
  constructor() { }

  ngOnInit(): void {
    this.chartData = [
      { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
      { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
      { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
      { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
      { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
      { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
  ];
  this.primaryXAxis = {
      valueType: 'Category'
  };
  }

}
