import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";

const Schema = z.object({
  summary: z.string().min(1).max(300),
  description: z.string().max(5000).optional().default(""),
  location: z.string().max(300).optional().default(""),
  startISO: z.string().min(10),
  endISO: z.string().min(10),
  timeZone: z.string().min(1).max(64).default("Africa/Dakar"),
  attendeeEmail: z.string().email().optional(),
  attendeeName: z.string().max(150).optional(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const Route = createFileRoute("/api/calendar-event")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
        const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
        if (!LOVABLE_API_KEY || !GOOGLE_CALENDAR_API_KEY) {
          return new Response(
            JSON.stringify({ error: "Calendar connector not configured" }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
          return new Response(
            JSON.stringify({ error: "Invalid input", issues: parsed.error.issues }),
            { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } },
          );
        }
        const data = parsed.data;

        const eventBody: Record<string, unknown> = {
          summary: data.summary,
          description: data.description,
          location: data.location,
          start: { dateTime: data.startISO, timeZone: data.timeZone },
          end: { dateTime: data.endISO, timeZone: data.timeZone },
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 30 },
            ],
          },
        };
        if (data.attendeeEmail) {
          eventBody.attendees = [
            { email: data.attendeeEmail, displayName: data.attendeeName ?? undefined },
          ];
        }

        const res = await fetch(
          `${GATEWAY_URL}/calendars/primary/events?sendUpdates=all`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "X-Connection-Api-Key": GOOGLE_CALENDAR_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventBody),
          },
        );

        const payload = await res.json().catch(() => ({}));
        if (!res.ok) {
          return new Response(
            JSON.stringify({ error: "Calendar API failed", status: res.status, details: payload }),
            { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } },
          );
        }

        return new Response(
          JSON.stringify({
            id: payload.id,
            htmlLink: payload.htmlLink,
            hangoutLink: payload.hangoutLink ?? null,
            status: payload.status,
          }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } },
        );
      },
    },
  },
});
