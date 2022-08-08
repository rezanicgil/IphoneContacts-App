import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../models/list.model';
@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }
  

//CRUD Operations
get(uri: string):Observable<List[]> {
  return this.http.get<List[]>(`${this.ROOT_URL}/${uri}`);
}

post(uri: string, payload: Object) {
  return this.http.post(`${this.ROOT_URL}/${uri}`, payload,  {responseType:'text'});
}

patch(uri: string, payload: Object) {
  return this.http.patch(`${this.ROOT_URL}/${uri}`, payload,  {responseType:'text'});
}

delete(uri: string) {
  return this.http.delete(`${this.ROOT_URL}/${uri}`);
}

}
