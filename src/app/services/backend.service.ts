import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiEndpoint: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getRushHours() {
    return this.http.get(`${this.apiEndpoint}/rush-hours`)
  }

  setRushHours(data) {
    return this.http.post(`${this.apiEndpoint}/rush-hours`, data)
  }

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

  deleteVehicle(id) {
    return this.http.delete(`${this.apiEndpoint}/v/${id}`)
  }

  fetchMiscellaneous() {
    return this.http.get(`${this.apiEndpoint}/random`);
  }

  createMiscellaneous(misc: any, photo?: any) {
    const formData = new FormData()
    if (photo)
      formData.append(`image`, photo)
    Object.keys(misc).forEach(prop => formData.append(prop, misc[prop]))
    return this.http.post(`${this.apiEndpoint}/random`, formData)
  }

}
