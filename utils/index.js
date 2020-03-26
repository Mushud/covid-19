import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const saveAuthToken = async authToken => {
    try {
        await AsyncStorage.setItem("authToken", authToken);
    } catch (e) {
        throw new Error(e);
    }
};

const retrieveAuthToken = async () => {
    try {
        return await AsyncStorage.getItem("authToken");
    } catch (e) {
        throw new Error(e);
    }
};

const deleteAuthToken = async () => {
    try {
        await AsyncStorage.removeItem("authToken");
    } catch (e) {
        throw new Error(e);
    }
};

const retrievePushNotificationToken = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
        return false;
    }

    // Get the token that uniquely identifies this device
    return await Notifications.getExpoPushTokenAsync();
};

export {
    saveAuthToken,
    retrieveAuthToken,
    deleteAuthToken,
    retrievePushNotificationToken
};
