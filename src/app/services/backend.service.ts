import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiEndpoint: String = "http://localhost:4000/api/admin"

  constructor(private http: HttpClient) { }

  getAllVehicles() {
    return this.http.get(`${this.apiEndpoint}/v`)
  }

  getVehicle(id) {
    return this.http.get(`${this.apiEndpoint}/v/${id}`)
  }

  searchVehicle(query) {
    return this.http.get(`${this.apiEndpoint}/v?q=${query}`)
  }

  addVehicle(data, photos) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'multipart/form-data')

    const formData = new FormData()
    Object.keys(data).forEach(prop => formData.append(prop, data[prop]))
    if (photos.length > 0)
      photos.forEach((e) => formData.append(`images`, e))

    return this.http.post(`${this.apiEndpoint}/v`, formData, { headers })
  }

  updateVehicle(id, data, photos) {
    const formData = new FormData()
    formData.append('id', id)
    if (photos.length > 0)
      photos.forEach((e) => formData.append(`images`, e))
    Object.keys(_.omit(data, ['photos'])).forEach(prop => formData.append(prop, data[prop]))
    formData.append('photos', JSON.stringify(data.photos))
    return this.http.put(`${this.apiEndpoint}/v`, formData)
  }

}
