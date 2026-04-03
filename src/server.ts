import Fastify from "fastify";

type TelemetryEvent = {
  event: string;
  source?: string;
  timestamp?: string;
  data?: Record<string, unknown>;
};

const events: TelemetryEvent[] = [];

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { status: "ok" };
});

app.post<{ Body: TelemetryEvent }>("/events", async (request, reply) => {
  const event = request.body

  events.push(event);
  console.log('EVENTS: ', events);

  return { success: true };
});

app.get("/events", async () => {
  return events;
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