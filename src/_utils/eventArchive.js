export function isEventArchived(eventData) {
  // If archived is explicitly set as a boolean, respect that
  if (typeof eventData.archived === 'boolean') {
    return eventData.archived;
  }

  // Get current UTC time minus 10 hours (approx NY time + 5am buffer)
  const now = new Date();
  const offsetTime = new Date(now.getTime() - (10 * 60 * 60 * 1000));
  const compareDate = offsetTime.toISOString().split('T')[0];

  // Determine which date to check (use end date if available, otherwise start date)
  const eventDate = eventData.eventEndDate || eventData.eventDate;

  // If no date is set, don't auto-archive
  if (!eventDate) {
    return false;
  }

  // Event is archived if the event date is before the compare date
  return String(eventDate) < compareDate;
}
