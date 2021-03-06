import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class FlatStatisticsService {

  constructor(private http: HttpClient) {
  }

  countActiveFlats(): Observable<number> {
    const url = BASE_URL + 'admin/flat-statistics/count-active-flats';
    return this.http.get<number>(url);
  }

  countUnactiveFlats(): Observable<number> {
    return this.http.get<number>(BASE_URL + 'admin/flat-statistics/count-unactive-flats');
  }

  countPostedFlatsByDay(day: Date): Observable<number> {
    const url = BASE_URL + 'admin/flat-statistics/count-posted-flats-on-day';
    let params = new HttpParams();
    params = params.append('day', day.toLocaleDateString());
    return this.http.get<number>(url, {params});
  }

  countFlatsPostedBeforeMonth(day: Date): Observable<number> {
    const url = BASE_URL + 'admin/flat-statistics/count-flats-posted-before-month';
    let params = new HttpParams();
    params = params.append('month', day.toLocaleDateString());
    return this.http.get<number>(url, {params});
  }

  countFlatsPostedBetween(start: Date, end: Date): Observable<number> {
    const url = BASE_URL + 'admin/flat-statistics/count-posted-flats-between-dates';

    let params = new HttpParams();
    params = params.append('start', start.toLocaleDateString());
    params = params.append('end', end.toLocaleDateString());

    return this.http.get<number>(url, {params});
  }

  getFlatsOfLandlord(id: string): Observable<number> {
    const url = BASE_URL + `admin/flat-statistics/get-flat-count-of-user?id=${id}`;
    console.log(url);
    return this.http.get<number>(url);
  }

}
