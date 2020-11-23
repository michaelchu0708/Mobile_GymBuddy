// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from "react";
import { useRef, useState, useEffect } from "react";
import { ScrollView, View, Text, SafeAreaView } from "react-native";
import DialogAndroid from "react-native-dialogs";
import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
  SettingsSwitch,
  SettingsPicker,
} from "react-native-settings-components";

const SettingsScreen = () => {
  const [username, setUsername] = useState("itsatestingaccount@gmail.com");
  const [allowPushNoti, setallowPushNoti] = useState(false);
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(10);
  const [firstname, setFirstname] = useState("Michael");
  const [lastname, setLastname] = useState("Chu");

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "ios" ? colors.iosSettingsBackground : colors.white,
      }}
    >
      <SettingsCategoryHeader
        title={"My Account"}
        textStyle={Platform.OS === "android" ? { color: colors.monza } : null}
      />

      <SettingsDividerLong android={true} />
      <SettingsEditText
        title="Username"
        dialogDescription={"Enter your username."}
        valuePlaceholder="..."
        negativeButtonTitle={"Cancel"}
        positiveButtonTitle={"Save"}
        androidDialogInputType={"text"}
        buttonRightTitle={"Save"}
        onValueChange={(value) => {
          console.log("username:", value);
          setUsername(value);
        }}
        value={username}
      />

      <SettingsEditText
        title="First Name"
        dialogDescription={"Enter your first name."}
        valuePlaceholder="..."
        negativeButtonTitle={"Cancel"}
        positiveButtonTitle={"Save"}
        androidDialogInputType={"text"}
        buttonRightTitle={"Save"}
        onValueChange={(value) => {
          console.log("firstname:", value);
          setFirstname(value);
        }}
        value={firstname}
      />

      <SettingsEditText
        title="Last Name"
        dialogDescription={"Enter your last name."}
        valuePlaceholder="..."
        negativeButtonTitle={"Cancel"}
        positiveButtonTitle={"Save"}
        androidDialogInputType={"text"}
        buttonRightTitle={"Save"}
        onValueChange={(value) => {
          console.log("lastname:", value);
          setLastname(value);
        }}
        value={lastname}
      />
      <SettingsPicker
        title="Gender"
        dialogDescription={"Choose your gender."}
        options={[
          { label: "male", value: "male" },
          { label: "female", value: "female" },
          { label: "other", value: "other" },
        ]}
        onValueChange={(value) => {
          console.log("gender:", value);
          setGender(value);
        }}
        value={gender}
        styleModalButtonsText={{ color: colors.monza }}
      />
      <SettingsDividerLong />
      <SettingsCategoryHeader
        title={"NOTIFICATIONS"}
        textStyle={Platform.OS === "android" ? { color: colors.monza } : null}
      />
      <SettingsSwitch
        title={"Allow Push Notifications"}
        onValueChange={(value) => {
          console.log("allow push notifications:", value);
          setallowPushNoti(value);
        }}
        value={allowPushNoti}
        trackColor={{
          true: colors.switchEnabled,
          false: colors.switchDisabled,
        }}
      />
    </ScrollView>
  );
};
const colors = {
  white: "#FFFFFF",
  monza: "#C70039",
  switchEnabled: "#C70039",
  switchDisabled: "#efeff3",
  blueGem: "#27139A",
};
export default SettingsScreen;
