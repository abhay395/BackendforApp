import express from "express";
import connectDB from "./db/connectDb.js";
import userRouter from "./routes/User.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cluster from "cluster";
import os from "os";
import { logger } from "./utils/logger.js";

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);
  console.log(`Number of CPUs: ${numCPUs}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    );
    cluster.fork();
  });
} else {
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(express.json());
  // app.use(morgan("combined"));
  // Middleware to log request count per worker
  app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
  });

  app.get("/", (req, res) => {
    res
      .status(200)
      .json({
        message: `Worker ${process.pid} - Total Requests: ${app.locals.requestCount}`,
      });
  });

  app.use("/api/v1/users", userRouter);

  app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message} - ${req.method} ${req.url}`);
    res.status(500).json({ error: "Something went wrong!" });
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running on port ${PORT}`);
  });
  connectDB();
}
