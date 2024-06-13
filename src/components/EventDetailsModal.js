import React, {
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useContext,
  useRef,
} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheetModal from "@gorhom/bottom-sheet";

import { AuthContext } from "../context/AuthContext";
import { RefContext } from "../context/RefContext";

import { getCategory } from "../utils/functions";

export const EventDetailsModal = forwardRef((props, ref) => {
  const { deleteEvent, updateCompleted } = useContext(AuthContext);
  const { eventDetailsRef } = useContext(RefContext);
  const { addEventRef } = useContext(RefContext);

  const [event, setEvent] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [adjustedCategory, setAdjustedCategory] = useState(null);
  const bottomSheetRef = useRef(null);

  function handleEdit() {
    bottomSheetRef.current?.close();
    addEventRef.current?.expand(event);
  }

  function handleUpdateCompleted() {
    setIsCompleted(!isCompleted);
    updateCompleted(event, !isCompleted);
  }

  function handleDelete() {
    deleteEvent(event.id);
    bottomSheetRef.current?.close();
  }

  useImperativeHandle(eventDetailsRef, () => ({
    expand(data) {
      setEvent(data);
      setAdjustedCategory(getCategory(data));
      if (data.category === "toDoItem") {
        setIsCompleted(data.isCompleted);
      }
      bottomSheetRef.current?.expand();
    },
  }));

  const snapPoints = useMemo(() => ["100%"], []);
  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      containerStyle={{ marginTop: 50 }}
    >
      <View className="flex-1 justify-start align-center px-4 w-full">
        <View className="flex-row items-center justify-between w-full">
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.close();
            }}
          >
            <Text className="color-primary text-xl">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleEdit()}>
            <Text className="color-primary text-xl">Edit</Text>
          </TouchableOpacity>
        </View>
        <View className="flex justify-center align-center p-4 w-full">
          <View className="flex-row items-center justify-between w-full">
            <Text className="text-xl font-bold">{event?.title}</Text>
            <Text className="text-lg">{adjustedCategory}</Text>
          </View>
          {event?.location && (
            <Text className="text-lg">Location: {event?.location}</Text>
          )}
          <View className="w-full bg-lightGrey h-[1] rounded-full my-2" />
          {event?.category === "event" ? (
            <>
              <Text className="text-sm color-darkGrey">
                from{" "}
                {new Date(event?.startDateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                {new Date(event?.startDateTime).toDateString()}
              </Text>
              <Text className="text-sm color-darkGrey">
                to{" "}
                {new Date(event?.endDateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                {new Date(event?.endDateTime).toDateString()}
              </Text>
            </>
          ) : (
            <Text className="text-sm color-darkGrey">
              {new Date(event?.startDateTime).toDateString()}
            </Text>
          )}
          <View className="w-full bg-lightGrey h-[1] rounded-full my-2" />
          {event?.category === "toDoItem" && (
            <>
              <View className="flex-row items-center justify-between w-full">
                <Text className="text-md">
                  Status: {isCompleted ? "Completed" : "Incomplete"}
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={handleUpdateCompleted}
                    className="flex-row items-center justify-center w-full"
                  >
                    <Text className="text-md color-primary">
                      {isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="w-full bg-lightGrey h-[1] rounded-full my-2" />
            </>
          )}
          <View
            className="w-full h-6 rounded-full my-2"
            style={{ backgroundColor: event?.color }}
          />
        </View>
      </View>
      <View className="flex-row items-center justify-center w-full py-6">
        <TouchableOpacity
          className="py-2 px-10 rounded-full m-2 flex-row items-center justify-self-end"
          onPress={() => handleDelete()}
        >
          <Text className="color-primary text-xl">Delete Event</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});
