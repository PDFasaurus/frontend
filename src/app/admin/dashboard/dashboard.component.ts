import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { AdminService } from '../admin.service';
import { CookieService } from '../../cookie.service';
import { AUTH_COOKIE, PAGE_SIZE, ERRORS } from '../../constants';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AdminService, CookieService],
})
export class DashboardComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'API Requests',
      backgroundColor: '#21262A',
      borderColor: '#CFD4D9'
    }
  ];
  public error: string;
  public total: number = 0;
  public currentPage: number;
  public hasNextPage: boolean;
  public hasPreviousPage: boolean;
  public requests: any[] = [];

  constructor(
    private adminService: AdminService,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.fetchResults(0)
  }

  nextPage() {
    this.fetchResults(this.currentPage + 1);
  }

  previousPage() {
    this.fetchResults(this.currentPage - 1);
  }

  fetchResults(page: number) {
    this.currentPage = page;
    this.adminService
      .getRequests(this.cookieService.getCookie(AUTH_COOKIE), page)
      .subscribe((res: any) => {
        const { results, total } = res;
        const chartLabels: Label[] = [];
        const chartData: number[] = [];

        // Toggle the right next/prev buttons
        this.hasNextPage = total > ((page * PAGE_SIZE) + PAGE_SIZE);
        this.hasPreviousPage = page > 0;
        this.total = total;

        // Make the dates pretty
        this.requests = results.map((request, _) => {
          return {
            ...request,
            created_at: moment(request.created_at).format('YYYY-MM-DD HH:mm:ss'),
          }
        });

        // Update the chart here
        this.requests.map((request, _) => {
          // Get a nice repr. of the date
          const prettyLabel = moment(request.created_at).format('YYYY-MM-DD');

          // If our label isn't in the array add it:
          if (chartLabels.indexOf(prettyLabel) == -1) {
            chartLabels.push(prettyLabel)

            // And get all the data points for this day
            chartData.push(this.requests.reduce((a, r) => {
              return moment(r.created_at).format('YYYY-MM-DD') == prettyLabel ? (a + 1) : a
            }, 0))
          }
        })

        // Now update our chart
        this.barChartLabels = chartLabels;
        this.barChartData = [
          {
            data: chartData,
            label: 'API Requests',
            backgroundColor: '#21262A',
            borderColor: '#CFD4D9'
          }
        ]
    }, (err) => {
      this.error = ERRORS.GENERIC;
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
