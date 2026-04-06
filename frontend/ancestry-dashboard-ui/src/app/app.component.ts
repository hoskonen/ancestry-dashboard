import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelemetryApiService } from './core/services/telemetry-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  status = 'loading...';

  constructor(private api: TelemetryApiService) {}

  ngOnInit() {
    this.api.getHealth().subscribe({
      next: (res) => {
        this.status = res.status;
        console.log('Health OK:', res);
      },
      error: (err) => {
        console.error(err);
        this.status = 'error';
      },
    });
  }
}
