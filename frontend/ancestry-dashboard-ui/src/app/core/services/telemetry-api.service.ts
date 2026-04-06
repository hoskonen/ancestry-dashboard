import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TelemetryApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getHealth() {
    return this.http.get<{ status: string }>(`${this.baseUrl}/health`);
  }
}
