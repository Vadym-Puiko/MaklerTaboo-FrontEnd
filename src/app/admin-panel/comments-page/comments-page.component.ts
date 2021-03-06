import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.scss']
})
export class CommentsPageComponent implements OnInit {
  pageNumber = 0;
  pageSize = 5;
  formUser: FormGroup;
  vSub: Subscription;
  dSub: Subscription;
  displayedColumns: string[] = ['id', 'author', 'date_registration', 'role', 'status', 'view_comments'];
  dataSource = new MatTableDataSource<Comment>();

  constructor(public dialog: MatDialog) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
  }

  paginationPage() {
    this.pageNumber = this.paginator.pageIndex;
    this.pageSize = this.paginator.pageSize;
    // this.getAllUserByPage();
  }

  openDialog(element) {
    console.log('Opened edit form');
    // const dialogRef = this.dialog.open(DialogWindowEditUserComponent, {
    //   data: element
    // });
    // dialogRef.afterClosed().subscribe(() => {
    //   console.log('The dialog was closed');
    // }).unsubscribe();
  }
}
