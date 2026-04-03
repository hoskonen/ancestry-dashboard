import { db } from "./db";

export type TelemetryEvent = {
  event: string;
  source?: string;
  data?: Record<string, unknown>;
};

export type StoredTelemetryEvent = {
  id: number;
  event: string;
  source?: string;
  timestamp: string;
  data?: Record<string, unknown>;
};

const insertEventStmt = db.prepare(`
  INSERT INTO events (event, source, data)
  VALUES (?, ?, ?)
`);

const selectEventsStmt = db.prepare(`
  SELECT id, event, source, timestmap, data
  FROM events
  ORDER BY id ASC
`);

export function saveEvent(event: TelemetryEvent): void {
  const data = event.data ? JSON.stringify(event.data) : null;

  insertEventStmt.run(
    event.event,
    event.source ?? null,
    data
  );
}

export function getEvents(): StoredTelemetryEvent[] {
  const rows = selectEventsStmt.all() as Array<{
    id: number;
    event: string;
    source: string | null;
    timestamp: string;
    data: string | null;
  }>;

  return rows.map((row) => ({
    id: row.id,
    event: row.event,
    source: row.source ?? undefined,
    timestamp: row.timestamp,
    data: row.data ? JSON.parse(row.data) : undefined,
  }));
}