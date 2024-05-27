import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function getEventsByDay(date) {
  const { userData } = useContext(AuthContext);
  if (!userData.events) {
    return [];
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return userData.events
    .map((event) => {
      const eventStart = new Date(event.startDateTime);
      const eventEnd = new Date(event.endDateTime);

      if (eventStart <= endOfDay && eventEnd >= startOfDay) {
        const adjustedEvent = { ...event };

        if (eventStart < startOfDay) {
          adjustedEvent.startDateTime = startOfDay.toISOString();
        }

        if (eventEnd > endOfDay) {
          adjustedEvent.endDateTime = endOfDay.toISOString();
        }

        return adjustedEvent;
      }
      return null;
    })
    .filter((event) => event !== null)
    .sort((a, b) => {
      return new Date(a.startDateTime) - new Date(b.startDateTime);
    });
}

export function getEventsByMonth(date) {
  const { userData } = useContext(AuthContext);
  if (!userData || !userData.events) {
    return [];
  }

  const filteredEvents = userData.events
    .filter((event) => {
      const eventDate = new Date(event.startDateTime);
      return (
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    })
    .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));

  const eventsByDay = [];

  filteredEvents.forEach((event) => {
    const eventDate = new Date(event.startDateTime).getDate();
    if (!eventsByDay[eventDate]) {
      eventsByDay[eventDate] = [];
    }
    eventsByDay[eventDate].push(event);
  });

  // Ensure the result is an array of arrays
  for (let i = 0; i < 31; i++) {
    if (!eventsByDay[i]) {
      eventsByDay[i] = [];
    }
  }

  return eventsByDay;
}
