import React, {
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useContext,
  useRef,
} from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import BottomSheetModal from "@gorhom/bottom-sheet";

import { AuthContext } from "../context/AuthContext";
import { RefContext } from "../context/RefContext";

export const EventDetailsModal = forwardRef((props, ref) => {
  const { eventDetailsRef } = useContext(RefContext);
  const [event, setEvent] = useState(null);
  const bottomSheetRef = useRef(null);

  const { deleteEvent } = useContext(AuthContext);

  function resetStates() {
    setEvent(null);
  }

  function handleDelete() {
    deleteEvent(event.id);
    bottomSheetRef.current?.close();
  }

  useImperativeHandle(eventDetailsRef, () => ({
    expand(data) {
      setEvent(data);
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
      onClose={resetStates}
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

          <TouchableOpacity>
            <Text className="color-primary text-xl">Edit</Text>
          </TouchableOpacity>
        </View>
        <View className="flex justify-center align-center p-4 bg-white w-full">
          <Text className="text-xl font-bold">{event?.title}</Text>
          {event?.location && (
            <Text className="text-lg">Location: {event?.location}</Text>
          )}
          <View className="w-full bg-lightGrey h-[1] rounded-full my-2" />
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
          <View className="w-full bg-lightGrey h-[1] rounded-full my-2" />
        </View>
        <View className="flex-row justify-center w-full mt-4"></View>
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
