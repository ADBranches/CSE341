import express from "express";
import cors from "cors";

import usersRouter from "./routes/users.js";
import projectsRouter from "./routes/projects.js";
import tasksRouter from "./routes/tasks.js";
import commentsRouter from "./routes/comments.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";


import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import authRouter from "./routes/auth.js";
import "./config/passport.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      dbName: process.env.DB_NAME,
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "team-task-api is running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API healthy",
    database: "MongoDB Atlas connection configured",
  });
});

app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/tasks", tasksRouter);
app.use("/comments", commentsRouter);
app.use("/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;