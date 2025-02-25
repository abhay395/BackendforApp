import express from 'express';
import connectDB from './db/connectDb.js';
import userRouter from './routes/User.routes.js';
import {authMiddleware} from './middleware/authMiddleware.js';
import taskRouter from './routes/Task.routes.js';
import notificationRouter from './routes/Notification.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import taskStatsRoutes from './routes/TaskStats.routes.js'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/',(req, res) => {
    res.status(200).json({
        // data:req.user,
        success: true,
        message: "Welcome to the Authentication API"
    });
});
app.use('/api/v1/users', userRouter);
app.use('/api/v1/task', taskRouter);
app.use('/api/v1/stats',taskStatsRoutes);
app.use('/', notificationRouter);
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
connectDB();
