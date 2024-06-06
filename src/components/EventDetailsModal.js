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
      >
        <View className="flex-1 justify-start align-center p-4 w-full">
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
          <View className="flex-row justify-around w-full mt-4">
            <TouchableOpacity>
              <Text className="text-lg font-bold color-primary">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteEvent(event?.id)}>
              <Text className="text-lg font-bold color-primary">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>
  );
});
