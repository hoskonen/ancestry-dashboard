import { TestBed } from '@angular/core/testing';

import { TelemetryApi } from './telemetry-api';

describe('TelemetryApi', () => {
  let service: TelemetryApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelemetryApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
