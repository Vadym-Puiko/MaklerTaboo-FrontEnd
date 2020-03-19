import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-diagram-flats',
  templateUrl: './diagram-flats.component.html',
  styleUrls: ['./diagram-flats.component.scss']
})
export class DiagramFlatsComponent implements OnInit {
  public chartType = 'pie';
  public chartDatasets: Array<any> = [{data: [0, 0, 0]}];
  public chartLabels: Array<any> = ['Active', 'Unactive'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#4183fa', '#9c9595'],
      hoverBackgroundColor: ['#65a0fa', '#dcd9d7'],
      borderWidth: 1,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getFlatsData().subscribe(data => {
      this.chartDatasets = data;
    });  }
}