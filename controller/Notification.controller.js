import NotificationService from "../services/Notification.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccessResponse } from "../utils/response.js";

const sendNotification = asyncHandler(async (req, res) => {
  const { title, body, deviceToken } = req.body;
  await NotificationService.sendNotification(deviceToken, title, body);
  sendSuccessResponse(res, 200, "Notification sent successfully");
});
export { sendNotification };
