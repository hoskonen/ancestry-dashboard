import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TelemetryApiService } from '../../../core/services/telemetry-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  status = 'loading...';
  stats: any = null;
  events: any[] = [];
  eventFilter = '';
  sourceFilter = '';
  limit = 20;

  constructor(private api: TelemetryApiService) {}

  ngOnInit(): void {
    this.loadHealth();
    this.loadStats();
    this.loadEvents();
  }

  private loadHealth(): void {
    this.api.getHealth().subscribe({
      next: (response) => {
        this.status = response.status;
      },
      error: () => {
        this.status = 'error';
      },
    });
  }

  private loadStats(): void {
    this.api.getStats().subscribe({
      next: (response) => {
        this.stats = response;
      },
      error: (error) => {
        console.error('Failed to load stats', error);
      },
    });
  }

  loadEvents(): void {
    this.api
      .getEvents({
        event: this.eventFilter || undefined,
        source: this.sourceFilter || undefined,
        limit: this.limit,
      })
      .subscribe({
        next: (response) => {
          console.log('events response', response);
          this.events = response;
        },
        error: (error) => {
          console.error('Failed to load events', error);
          this.events = [];
        },
      });
  }

  applyFilters(event: string, source: string, limit: string): void {
    this.eventFilter = event.trim();
    this.sourceFilter = source.trim();
    this.limit = Number(limit) || 20;

    this.loadEvents();
  }

  resetFilters(): void {
    this.eventFilter = '';
    this.sourceFilter = '';
    this.limit = 20;
    this.loadEvents();
  }
}
