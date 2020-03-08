import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerResponse, User} from '../shared/interfaces';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `/api/users/signIn`;

  constructor(private http: HttpClient) {
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  login(user: User): Observable<any> {
    return this.http.post(this.url, user, {observe: 'response'});
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: ServerResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('token', response.idToken);
      localStorage.setItem('token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }


  }

}
