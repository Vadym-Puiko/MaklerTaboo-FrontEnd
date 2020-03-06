import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsForUserVerification} from '../entity/requests-for-user-verification';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../component/interfaces';
import {AdminService} from '../../../services/admin.service';
import {Subscribable, Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-flat-requests',
  templateUrl: './flat-requests.component.html',
  styleUrls: ['./flat-requests.component.scss']
})
export class FlatRequestsComponent implements OnInit {
  requests: RequestsForUserVerification[];
  vSub: Subscription;
  aSub: Subscription;
  dSub: Subscription;


  displayedColumns: string[] = ['id', 'date', 'status', 'review'];
  dataSource: MatTableDataSource<RequestsForUserVerification>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.vSub = this.adminService.getFlatRequests()
      .subscribe(request => {
        this.requests = request;
        this.dataSource = new MatTableDataSource<RequestsForUserVerification>(request);
      });
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  review(id: string) {

  }

  decline(id: number) {
    this.dSub = this.adminService.declineFlatRequests(id)
      .subscribe(request => {
        this.dataSource = new MatTableDataSource<RequestsForUserVerification>(this.requests);
      });
  }

  approve(id: number) {
    this.aSub = this.adminService.approveFlatRequests(id)
      .subscribe(request => {
        this.dataSource = new MatTableDataSource<RequestsForUserVerification>(this.requests);
      });
  }

}
