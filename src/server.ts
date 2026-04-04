import Fastify from "fastify";
import { getEvents, saveEvent, type TelemetryEvent } from "./eventStore";
import "./db";

type GetEventsQuery = {
  event?: string;
  source?: string;
  limit?: string;
};

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { status: "ok" };
});

app.post<{ Body: TelemetryEvent }>("/events", async (request, reply) => {
  saveEvent(request.body);
  return { success: true };
});

app.get<{ Querystring: GetEventsQuery }>("/events", async (request) => {
  const { event, source, limit } = request.query;

  const parsedLimit = limit ? Number(limit) : undefined

  return getEvents({
    event,
    source,
    limit: parsedLimit && parsedLimit > 0 ? parsedLimit : undefined,
  });
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();