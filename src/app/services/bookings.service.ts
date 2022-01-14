import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private apiEndpoint: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getBookings(filter?) {
    return this.http.get(`${this.apiEndpoint}/bookings${filter ? "/?filter=" + filter : ''}`)
  }

  approveBooking(booking_id, driver_id) {
    return this.http.post(`${this.apiEndpoint}/bookings/approve`, { booking_id, driver_id })
  }

  rejectBooking(booking_id, reason?) {
    return this.http.post(`${this.apiEndpoint}/bookings/reject`, { booking_id, reason })
  }
}
