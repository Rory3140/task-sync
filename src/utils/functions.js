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
      if (event.category != "event") {
        return null;
      }
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

export function getAllDayEventsByDay(date) {
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
      if (event.category === "event") {
        return null;
      }
      const eventStart = new Date(event.startDateTime);

      if (eventStart <= endOfDay && eventStart >= startOfDay) {
        const adjustedEvent = { ...event };

        if (eventStart < startOfDay) {
          adjustedEvent.startDateTime = startOfDay.toISOString();
        }

        return adjustedEvent;
      }
      return null;
    })
    .filter((event) => event !== null)
    .sort((a, b) => {
      if (a.category === "toDoItem" && b.category !== "toDoItem") {
        return -1;
      } else if (a.category !== "toDoItem" && b.category === "toDoItem") {
        return 1;
      } else if (a.category === "allDayEvent" && b.category !== "allDayEvent") {
        return -1;
      } else if (a.category !== "allDayEvent" && b.category === "allDayEvent") {
        return 1;
      } else {
        return new Date(a.startDateTime) - new Date(b.startDateTime);
      }
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
    .sort((a, b) => {
      if (a.category === "toDoItem" && b.category !== "toDoItem") {
        return -1;
      } else if (a.category !== "toDoItem" && b.category === "toDoItem") {
        return 1;
      } else if (a.category === "allDayEvent" && b.category !== "allDayEvent") {
        return -1;
      } else if (a.category !== "allDayEvent" && b.category === "allDayEvent") {
        return 1;
      } else {
        return new Date(a.startDateTime) - new Date(b.startDateTime);
      }
    });

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

export function getCategory(event) {
  if (event.category === "event") {
    return "Event";
  } else if (event.category === "allDayEvent") {
    return "All Day";
  } else if (event.category === "toDoItem") {
    return "To Do Item";
  }
}

export function getAllTasksByDate() {
  const { userData } = useContext(AuthContext);
  if (!userData || !userData.events) {
    return [];
  }

  // Create an object to hold tasks grouped by the exact date
  const tasksByDate = {};

  userData.events.forEach((event) => {
    if (event.category === "toDoItem") {
      // Filter to only include tasks
      const eventStart = new Date(event.startDateTime);
      const eventDate = eventStart.toISOString().split("T")[0]; // Get the date in "YYYY-MM-DD" format

      if (!tasksByDate[eventDate]) {
        tasksByDate[eventDate] = [];
      }
      tasksByDate[eventDate].push(event);
    }
  });

  // Convert the tasksByDate object into an array of arrays
  const result = Object.keys(tasksByDate).map((date) => ({
    date,
    tasks: tasksByDate[date],
  }));

  return result;
}
