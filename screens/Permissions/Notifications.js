import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { StyledHeader, StyledText } from "../../components/Typography";
import Button from "../../components/FormInput/Button";
import { gql, useMutation } from "@apollo/client";
import { showMessage } from "react-native-flash-message";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

const notificationsImage = require("../../assets/images/notifications.png");

const mutation = gql`
  mutation($notificationToken: String!) {
    setMemberNotificatonToken(
      input: { notificationToken: $notificationToken }
    ) {
      success
    }
  }
`;

const NotificationsPermission = ({ navigation }) => {
  const [setNotificationToken, { loading }] = useMutation(mutation, {
    onCompleted: ({ setMemberNotificatonToken }) => {
      if (setMemberNotificatonToken.success) {
        navigation.navigate("LoadData");
      } else {
        showMessage({
          message: "Failed to set notification token"
        });
      }
    }
  });

  const getNotificationToken = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      navigation.navigate("LoadData");
    } else {
      let notificationToken = await Notifications.getExpoPushTokenAsync();
      setNotificationToken({
        variables: {
          notificationToken
        }
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 40,
        alignItems: "center"
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <StyledHeader style={{ fontSize: 25 }}>
          Allow Notifications
        </StyledHeader>
      </View>
      <View style={{ alignItems: "center", flex: 4 }}>
        <Image
          source={notificationsImage}
          style={{ height: 200, width: 200 }}
        />

        <StyledText style={{ textAlign: "center" }}>
          Allow Worship Companion to send you announcements, events and general
          information from your congregation. We will not spam you or send you
          marketing messages.
        </StyledText>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={getNotificationToken}>
            <Button style={{ width: 200, height: 50 }} loading={loading}>
              <StyledText style={{ color: "#fff", textAlign: "center" }}>
                Allow Notifications
              </StyledText>
            </Button>
          </TouchableOpacity>

          <View style={{ marginTop: 10 }}>
            <StyledText style={{ textAlign: "center", color: "grey" }}>
              Do not allow
            </StyledText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotificationsPermission;
