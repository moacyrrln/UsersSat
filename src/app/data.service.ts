// /mnt/e/dev/sat/v4-17/src/app/data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER = "http://localhost:8080/users";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest() {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  public deleteUser(id: number) {
    return this.httpClient.delete(`${this.REST_API_SERVER}/${id}`);
  }
}
