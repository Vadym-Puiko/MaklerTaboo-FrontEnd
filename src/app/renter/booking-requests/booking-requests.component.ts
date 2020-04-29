import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FlatBookingService} from "../../services/flat-booking.service";
import {RequestsForFlatBooking} from "../entity/request-for-flat-booking";
import {MatDialog} from "@angular/material/dialog";
import {AgreementReviewAreaComponent} from "../agreement-review-area/agreement-review-area.component";
import {ConfirmationDialogComponent} from "../../shared/confirmation-dialog/confirmation-dialog.component";
import {AgreementReviewComponent} from "../agreement-review/agreement-review.component";

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.scss']
})
export class BookingRequestsComponent implements OnInit {
  @ViewChild(AgreementReviewAreaComponent) agreementReviewAreaComponent;
  @ViewChild(AgreementReviewComponent) agreementReviewComponent;

  constructor(private http: HttpClient, private bookingService: FlatBookingService,
              private bar: MatSnackBar, public dialog: MatDialog) {
  }

  data: any;
  requests: RequestsForFlatBooking = new RequestsForFlatBooking();
  status = 'all';

  ngOnInit() {
    this.loadFlats();
  }

  loadFlats() {
    this.bookingService.getRenterRequests()
      .subscribe(data => {
        this.data = data;
        this.requests.content = this.data;
        this.status = 'all';
        if (this.requests.content.length < 1) {
          this.bar.open("You haven't made any requests yet!", "x",
            {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar']
            });
        }
      });
  }

  loadDeclinedFlats() {
    this.bookingService.getDeclinedRenterRequests()
      .subscribe(data => {
        this.data = data;
        this.requests.content = this.data;
        this.status = 'declined';
        if (this.requests.content.length < 1) {
          this.bar.open("You don't have any declined requests!", "x",
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar']
            });
        }
      });
  }

  loadActiveFlats() {
    this.bookingService.getActiveRenterRequests()
      .subscribe(data => {
        this.data = data;
        this.requests.content = this.data;
        this.status = 'active';
        if (this.requests.content.length < 1) {
          this.bar.open("You don't have any active requests!", "x",
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snackbar']
            });
        }
      });
  }

  openCancelDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm canceling the request?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.declineRequestForFlatBooking(id).subscribe(
          success => {
            this.bar.open("Request was canceled!", "x",
              {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['snackbar']
              });
            this.ngOnInit();
          },
          error => {
            this.bar.open(error.error.message, "x",
              {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
                panelClass: ['snackbar']
              });
          }
        );
      }
    });
  }

  createAgreement(id: number) {
    this.openDialog(id);
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(AgreementReviewAreaComponent, {data: {requestId: id}});
    dialogRef.afterClosed().subscribe(
      success => {
        this.ngOnInit();
      }
    );
  }

  payForApartment() {
    
  }
}