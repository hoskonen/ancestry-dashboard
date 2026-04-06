import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TelemetryEvent {
  id: number;
  event: string;
  source?: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

export interface EventStatsRow {
  event: string;
  count: number;
}

export interface EventStats {
  total: number;
  byEvent: EventStatsRow[];
}

export interface GetEventsParams {
  event?: string;
  source?: string;
  limit?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TelemetryApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getHealth(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.baseUrl}/health`);
  }

  getEvents(filters: GetEventsParams = {}): Observable<TelemetryEvent[]> {
    let params = new HttpParams();

    if (filters.event) {
      params = params.set('event', filters.event);
    }

    if (filters.source) {
      params = params.set('source', filters.source);
    }

    if (filters.limit !== undefined) {
      params = params.set('limit', filters.limit.toString());
    }

    return this.http.get<TelemetryEvent[]>(`${this.baseUrl}/events`, { params });
  }

  getStats(): Observable<EventStats> {
    return this.http.get<EventStats>(`${this.baseUrl}/events/stats`);
  }
}
