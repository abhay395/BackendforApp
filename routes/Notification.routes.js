import express from "express";
import { sendNotification } from "../controller/Notification.controller.js";

const router = express.Router();

router.post("/sendnotification", sendNotification);

const notificationRouter = router;
export default notificationRouter;