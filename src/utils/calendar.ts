export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startDate: Date; // e.g., 2026-11-25 17:00
  endDate: Date;   // e.g., 2026-11-25 23:00
}

export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const formatTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const start = formatTime(event.startDate);
  const end = formatTime(event.endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(event: CalendarEvent, filename: string = 'wedding-uday-preeti.ics') {
  const formatTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const start = formatTime(event.startDate);
  const end = formatTime(event.endDate);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Uday and Preeti Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
