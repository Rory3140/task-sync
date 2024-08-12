import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { DateContext } from "../context/DateContext";
import { colors } from "../utils/colors";

export const DrawerContent = (props) => {
  const { listView, setListView } = useContext(DateContext);

  return (
    <DrawerContentScrollView {...props}>
      <View className="flex-column justify-start items-center bg-white w-full px-4">
        <View className="flex-row justify-between items-center w-full py-2">
          <View className="flex-row justify-start items-center">
            <Image
              className="mr-1 rounded-md w-8 h-8"
              source={require("../../assets/logo/app-icon.png")}
            />
            <Image
              className="w-24 h-8"
              source={require("../../assets/logo/logo-text.png")}
            />
          </View>
          <TouchableOpacity
            className={`flex justify-center items-center w-8 h-8 mx-2 rounded-md
             ${listView ? "bg-secondary" : "bg-white"}`}
            onPress={() => setListView(!listView)}
          >
            <MaterialIcons
              name="list"
              color={colors.primary}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View className="w-5/6 bg-lightGrey h-[1] rounded-full" />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
