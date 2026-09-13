/**
 * Calendar Utility for Blue Tick Trading School Masterclasses
 * Zero-dependency RFC 5545 compliant iCalendar (.ics) generator and Google Calendar URL builder.
 */

export interface WebinarCalendarEvent {
  id?: string | number;
  title: string;
  description?: string;
  dateTimeStr: string;
  durationMinutes?: number;
  locationUrl?: string;
  speakerName?: string;
  slug?: string;
}

/**
 * Parses user-friendly date strings like "Upcoming Saturday, 7:00 PM IST" or standard ISO strings
 * into UTC start and end Date objects.
 */
export function parseWebinarDate(dateTimeStr: string, durationMinutes = 90): { start: Date; end: Date } {
  const now = new Date();

  // 1. Try standard Date.parse (for ISO or RFC dates)
  const parsedTimestamp = Date.parse(dateTimeStr);
  if (!isNaN(parsedTimestamp)) {
    const start = new Date(parsedTimestamp);
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
    return { start, end };
  }

  // 2. Handle "Upcoming Saturday" or "Saturday, ... PM IST" pattern
  // Saturday is day 6 in JS (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const currentDay = now.getDay();
  let daysUntilSaturday = (6 - currentDay + 7) % 7;
  if (daysUntilSaturday === 0 && now.getHours() >= 20) {
    // If it's already Saturday evening past 8 PM, set to next Saturday
    daysUntilSaturday = 7;
  }

  const targetDate = new Date(now);
  targetDate.setDate(now.getDate() + daysUntilSaturday);

  // Default masterclass is 7:00 PM IST (13:30 UTC)
  // IST is UTC + 5:30. 19:00 IST - 5h 30m = 13:30 UTC.
  const start = new Date(
    Date.UTC(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
      13, // 13 UTC = 18:30 or 19:00 IST
      30,
      0
    )
  );

  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  return { start, end };
}

/**
 * Formats a Date object to iCalendar UTC string format: YYYYMMDDTHHmmssZ
 */
function formatIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/**
 * Escapes text for iCalendar RFC 5545 format
 */
function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/**
 * Generates an RFC 5545 compliant .ics file content string.
 */
export function generateIcsCalendar(event: WebinarCalendarEvent): string {
  const { start, end } = parseWebinarDate(event.dateTimeStr, event.durationMinutes);
  const now = new Date();
  const uid = `webinar-${event.id || event.slug || "masterclass"}-${start.getTime()}@blueticktradingschool.com`;
  
  const summary = escapeIcsText(event.title || "BlueTick Live Trading Masterclass");
  const speaker = event.speakerName || "Amit Gupta (Blue Tick Trading School)";
  const description = escapeIcsText(
    `${event.description || "Live institutional trading masterclass covering price-time squaring and turn date forecasting."}\n\nMentor: ${speaker}\nMeeting Link: ${event.locationUrl || "Zoom Live Link will be dispatched prior to session"}\nWebsite: https://blueticktrading.com`
  );
  const location = escapeIcsText(event.locationUrl || "Zoom Live Broadcast (Link will be sent via Email & Telegram)");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Blue Tick Trading School//Masterclass Invite//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatIcsDate(now)}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `ORGANIZER;CN="Blue Tick Trading School":mailto:support@blueticktradingschool.com`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    `DESCRIPTION:Reminder: ${summary} starts in 15 minutes!`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Generates a 1-click Google Calendar web event creation URL.
 */
export function generateGoogleCalendarUrl(event: WebinarCalendarEvent): string {
  const { start, end } = parseWebinarDate(event.dateTimeStr, event.durationMinutes);
  const startIso = formatIcsDate(start);
  const endIso = formatIcsDate(end);

  const title = encodeURIComponent(event.title || "BlueTick Live Trading Masterclass with Amit Gupta");
  const details = encodeURIComponent(
    `${event.description || "Live market masterclass with Amit Gupta covering Price-Time Squaring & Institutional Turn Dates."}\n\nJoin Zoom: ${event.locationUrl || "Link will be shared on Telegram & Email"}\nWebsite: https://blueticktrading.com`
  );
  const location = encodeURIComponent(event.locationUrl || "Zoom Live Broadcast");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
}
