import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private apiEndpoint: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getDrivers() {
    return this.http.get(`${this.apiEndpoint}/drivers`)
  }

  addDriver(driver, photo?) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'multipart/form-data')

    const formData = new FormData()
    Object.keys(driver).forEach(prop => formData.append(prop, driver[prop]))
    if (photo)
      formData.append('image', photo)

    return this.http.post(`${this.apiEndpoint}/drivers`, formData, { headers })
  }

  deleteDriver(id) {
    return this.http.delete(`${this.apiEndpoint}/drivers/${id}`)

  }
}
