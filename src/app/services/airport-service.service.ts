import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirportServiceService {
  apiEndPoint = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllAirports() {
    return this.http.get(`${this.apiEndPoint}/a`)
  }

  addAirport(airport) {
    return this.http.post(`${this.apiEndPoint}/a`, JSON.parse(JSON.stringify(airport)))
  }

  updateAirport(id, price) {
    return this.http.put(`${this.apiEndPoint}/a`, { place_id: id, toll_price: price })

  }

  deleteAirport(id) {
    return this.http.delete(`${this.apiEndPoint}/a/${id}`)
  }


}
