import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function getEvents(date, selectedOption) {
  const { userData } = useContext(AuthContext);
  if (!userData.events) {
    return [];
  }

  return userData.events
    .filter((event) => {
      if (selectedOption === "day") {
        return (
          new Date(event.startDateTime).toDateString() === date.toDateString()
        );
      } else {
        return (
          new Date(event.startDateTime).getMonth() === date.getMonth() &&
          new Date(event.startDateTime).getFullYear() === date.getFullYear()
        );
      }
    })
    .sort((a, b) => {
      return new Date(a.startDateTime) - new Date(b.startDateTime);
    });
}
