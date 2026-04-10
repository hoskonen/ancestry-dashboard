import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-telemetry-card',
  imports: [],
  templateUrl: './telemetry-card.component.html',
  styleUrl: './telemetry-card.component.scss',
})
export class TelemetryCard {
  @Input() name: string = '';
  @Input() value: number = 0;
}
