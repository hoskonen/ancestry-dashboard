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

type EventQuery = {
  event?: string;
  source?: string;
  limit?: number;
}

const insertEventStmt = db.prepare(`
  INSERT INTO events (event, source, data)
  VALUES (?, ?, ?)
`);

const selectBaseSql = `
  SELECT id, event, source, timestamp, data
  FROM events
`;

const totalCountStmt = db.prepare(`
  SELECT COUNT(*) as total FROM events  
  `);

const countByEventStmt = db.prepare(`
  SELECT event, COUNT(*) as count
  FROM events
  GROUP BY event
  ORDER BY count DESC
`);

export function saveEvent(event: TelemetryEvent): void {
  const data = event.data ? JSON.stringify(event.data) : null;

  insertEventStmt.run(
    event.event,
    event.source ?? null,
    data
  );
}

export function getEvents(filters: EventQuery = {}): StoredTelemetryEvent[] {
  const conditions: string[] = [];
  const params: Array<string | number> = [];

  let sql = selectBaseSql

  if (filters.event) {
    conditions.push("event = ?");
    params.push(filters.event);
  }

  if (filters.source) {
    conditions.push("source = ?");
    params.push(filters.source);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  sql += " ORDER BY id ASC";

  if (filters.limit !== undefined) {
    sql += " LIMIT ?";
    params.push(filters.limit);
  }

  const stmt = db.prepare(sql);

  const rows = stmt.all(...params) as Array<{
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

export function getEventStats() {
  const totalRow = totalCountStmt.get() as { total: number };

  const byEventsRows = countByEventStmt.all() as Array<{
    event: string;
    count: number;
  }>;

  return {
    total: totalRow.total,
    byEvent: byEventsRows,
  };
}