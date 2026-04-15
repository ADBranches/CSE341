import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import usersRouter from "./routes/users.js";
import projectsRouter from "./routes/projects.js";
import tasksRouter from "./routes/tasks.js";
import commentsRouter from "./routes/comments.js";
import authRouter from "./routes/auth.js";
import "./config/passport.js";

const app = express();

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const isTest = process.env.NODE_ENV === "test";

if (!isTest) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      proxy: true,
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
} else {
  app.use(passport.initialize());
}

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

export default app;