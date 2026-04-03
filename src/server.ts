import Fastify from "fastify";
import { getEvents, saveEvent, type TelemetryEvent } from "./eventStore";
import "./db";

const app = Fastify({ logger: true });

app.get("/health", async () => {
  return { status: "ok" };
});

app.post<{ Body: TelemetryEvent }>("/events", async (request, reply) => {
  saveEvent(request.body);
  return { success: true };
});

app.get("/events", async () => {
  return getEvents();
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