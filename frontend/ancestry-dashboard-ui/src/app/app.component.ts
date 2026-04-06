import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TelemetryApiService,
  EventStats,
  TelemetryEvent,
} from './core/services/telemetry-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  status = 'loading...';
  stats: EventStats | null = null;
  events: TelemetryEvent[] = [];

  constructor(
    private api: TelemetryApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.api.getHealth().subscribe({
      next: (res) => {
        this.status = res.status;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Health error', err),
    });

    this.api.getStats().subscribe({
      next: (res) => {
        this.stats = res;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Stats error', err),
    });

    this.api.getEvents({ source: 'godot', limit: 5 }).subscribe({
      next: (res) => {
        this.events = res;
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Events error', err),
    });
  }
}
