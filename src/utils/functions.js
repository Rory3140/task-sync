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
  if (!userData.events) {
    return [];
  }

  return userData.events
    .filter((event) => {
      return (
        new Date(event.startDateTime).getMonth() === date.getMonth() &&
        new Date(event.startDateTime).getFullYear() === date.getFullYear()
      );
    })
    .sort((a, b) => {
      return new Date(a.startDateTime) - new Date(b.startDateTime);
    });
}
