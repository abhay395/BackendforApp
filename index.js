import express from "express";
import connectDB from "./db/connectDb.js";
import userRouter from "./routes/User.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cluster from "cluster";
import os from "os";
import { logger } from "./utils/logger.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);
  console.log(`Number of CPUs: ${numCPUs}`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Monitor worker exit and restart
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    );
    cluster.fork(); // Fork a new worker
  });

  // Handle graceful shutdown for master
  process.on("SIGINT", () => {
    console.log("Master shutting down gracefully...");
    cluster.disconnect(() => {
      console.log("All workers have been disconnected");
      process.exit(0);
    });
  });

} else {
  const app = express();
  app.use(express.json());

  // Middleware to log request count per worker
  app.use((req, res, next) => {
    app.locals.requestCount = (app.locals.requestCount || 0) + 1;
    logger.info(`Request: ${req.method} ${req.url} (Worker: ${process.pid})`);
    next();
  });

  // Simple route to check request count
  app.get("/", (req, res) => {
    res.status(200).json({
      message: `Worker ${process.pid} - Total Requests: ${app.locals.requestCount}`,
    });
  });

  // User routes
  app.use("/api/v1/users", userRouter);

  // Error handling middleware
  app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message} - ${req.method} ${req.url}`);
    res.status(500).json({ error: "Something went wrong!" });
  });

  // Additional error handler
  app.use(errorHandler);

  // Start the app
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running on port ${PORT}`);
  });

  // Connect to DB
  connectDB()
    .then(() => {
      logger.info("Database connected successfully");
    })
    .catch((err) => {
      logger.error("Database connection error:", err);
      process.exit(1); // Exit process on DB connection error
    });

  // Graceful shutdown
  process.on("SIGINT", () => {
    console.log(`Worker ${process.pid} shutting down gracefully...`);
    process.exit(0);
  });
}
