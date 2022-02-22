import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  async login(username, password) {
    let res: any;
    try {
      res = await this.http.post(`${this.baseUrl}/auth`, { username, password }).toPromise();
      if (res.token) {
        localStorage.setItem('bookings_token', res.token)
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  logout() {
    localStorage.setItem('bookings_token', '')
    return true;
  }

  isLoggedIn() {
    return localStorage.getItem('bookings_token') ? true : false;
  }


}
