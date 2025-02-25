import { admin } from "../utils/firebase.js";

class NotificationService {
  static async sendNotification(deviceToken, title, body) {
    const message = {
      notification: {
        title,
        body,
      },
      token: deviceToken,
    };
    try {
      const response = await admin.messaging().send(message);
      console.log("notification sent Successfull:", response);
      return response;
    } catch (error) {
      console.error("Error sending notification:", error);
      throw new Error("Notification sending failed");
    }
  }
}

export default NotificationService;
