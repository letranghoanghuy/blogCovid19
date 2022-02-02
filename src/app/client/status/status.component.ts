import { ApiServerService } from './../../Services/api-server.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label as ng2Chart } from 'ng2-charts';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  title = 'Covid19';
  public globalData:any=[];
  public countriesData:any=[];
  public search='';

  public isDataOpened = false;
  public isUSDataOpened = false;
  public usData:any = [];
  public chartIsReady = false;
  private chartOptions = {
    responsive: true,
  };
  public totalColumns = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  public currentTotalColumn = 5;
  public interestedData:any = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    title: {
      text: 'LIVE - Chương trình thông báo về Coronavirus - Covid 19',
      display: true,
      fontSize: 40,
    },
    scales: {
      xAxes: [{}],
      yAxes: [{}],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        // font: {
        //   size: 20,
        // },
        formatter(value, context) {
          //   return context.chart.data.labels[context.dataIndex];
          // return context.dataIndex + ': ' + Math.round(value * 100) + '%';
          return value.toLocaleString('en-US');
        },
      },
    },
  };

  public barChartLabels: ng2Chart[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    { data: [278, 148, 40, 19, 5, 27, 7], label: 'Series C' },
  ];
  public chartColors: Array<any> = [
    {
      // first color
      backgroundColor: 'rgba(255, 140, 0, 0.84)',
      borderColor: 'rgba(14, 117, 0, 1)',
      // pointBackgroundColor: 'rgba(225,10,24,0.2)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(225,10,24,0.2)',
    },
    {
      // second color
      backgroundColor: 'rgba(255, 0, 0, 0.84)',
      borderColor: 'rgba(14, 117, 0, 1)',
    },
    {
      backgroundColor: 'rgba(255, 162, 87, 0.8)',
      borderColor: 'rgba(163, 73, 0, 1)',
    },
    {
      backgroundColor: 'rgba(255, 134, 36, 1)',
      borderColor: 'rgba(117, 53, 0, 1)',
    },
    {
      backgroundColor: 'rgba(255, 46, 46, 0.78)',
      borderColor: 'rgba(255, 26, 26, 0.86)',
    },
    {
      backgroundColor: 'rgba(235, 0, 0, 1)',
      borderColor: 'rgba(255, 26, 26, 0.86)',
    },
  ];


  constructor(private serverHttp: ApiServerService){}


  ngOnInit(): void {
    this.serverHttp.getSummary().subscribe((data) => {
      //console.log(data);
      this.globalData=data.Global;
      //this.countriesData=data.Countries;
      this.countriesData=[];
      //console.log(this.countriesData);
      for (const row of data.Countries) {
        const filteredData = {
          Country: row.Country,
          CountryCode: row.CountryCode,
          Date: row.Date,
          NewConfirmed: row.NewConfirmed,
          NewDeaths: row.NewDeaths,
          NewRecovered: row.NewRecovered,
          TotalConfirmed: row.TotalConfirmed,
          TotalDeaths: row.TotalDeaths,
          TotalRecovered: row.TotalRecovered,
        };
        if (row.CountryCode === 'US') {
          this.interestedData.push(filteredData);
        }
        if (row.CountryCode === 'VN') {
          this.interestedData.push(filteredData);
        }
        this.interestedData = _.orderBy(
          this.interestedData,
          ['CountryCode'],
          ['desc']
        );
        this.countriesData.push(filteredData);
        };
        if (
          this.countriesData &&
          this.countriesData.length > 0 &&
          this.countriesData[0].hasOwnProperty('TotalConfirmed')
        ) {
          // TotalDeaths, TotalConfirmed
          this.countriesData = _.orderBy(
            this.countriesData,
            ['TotalConfirmed'],
            ['desc']
          );
          // this.chartIsReady = true;
          this.buildChart();
        }
      })
      this.serverHttp.getUSData().subscribe((data) => {
        // console.log(data);
        this.usData = data;
      });
  }

  public orderBy(key:any,dir:any){
    this.countriesData = _.orderBy(this.countriesData,key,dir);
  }
  public getWord(key:any) {
    const map:any = {
      //NewConfirmed: 'New Confirmed',
      TotalConfirmed: 'Tổng số ca nhiễm',
      //NewRecovered: 'New Recovered',
      //TotalRecovered: 'Total Recovered',
      //NewDeaths: 'New Deaths',
      TotalDeaths: 'Tổng số ca tử vong',
      CountryCode: 'Country Code',
    };
    return map[key] || key;
  }
  public buildChart() {
    const key = 'Country';
    const keys = [
      //'NewConfirmed',
      'TotalConfirmed',
      //'NewRecovered',
      //'TotalRecovered',
      //'NewDeaths',
      'TotalDeaths',
    ];
    const countriesData:any = [];
    let records = 0;
    this.barChartLabels = [];
    for (const row of this.countriesData) {
      // row.hasOwnProperty(key)
      records++;
      this.barChartLabels.push(row[key]);
      for (const key2 of keys) {
        if (!countriesData[key2]) {
          countriesData[key2] = [];
        }
        countriesData[key2].push(row[key2]);
      }
      if (records === this.currentTotalColumn) {
        break;
      }
    }
    this.barChartData = [];
    for (const key2 of keys) {
      this.barChartData.push({
        label: `${this.getWord(key2)}`,
        // backgroundColor: backgroundColor[i++],
        data: countriesData[key2],
        // borderColor: backgroundColor[i++],
        fill: false,
        // maxBarThickness: 8,
        // minBarLength: 2,
      });
    }
    this.chartIsReady = true;
  }
  public displayDataToggle() {
    this.isDataOpened = !this.isDataOpened;
  }

  public displayUSDataToggle() {
    this.isUSDataOpened = !this.isUSDataOpened;
  }
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
  public changingValue(event:any) {
    // console.log(event);
    this.chartIsReady = false;
    this.currentTotalColumn = +event.target.value || 5;
    // console.log('this.currentTotalColumn', this.currentTotalColumn);
    this.buildChart();
  }

  // public orderBy(key, dir) {
  //   this.chartIsReady = false;
  //   this.countriesData = _.orderBy(this.countriesData, key, dir);
  //   this.buildChart();
  // }

  // public orderUSDataBy(key, dir) {
  //   this.usData = _.orderBy(this.usData, key, dir);
  //   // console.log(this.usData);
  // }
}
