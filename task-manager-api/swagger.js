import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const baseUrl =
  process.env.BASE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  `http://localhost:${port}`;

const parsed = new URL(baseUrl);

const doc = {
  swagger: "2.0",
  info: {
    title: "Task Manager API",
    description:
      "CSE 341 Task Manager API documentation for auth, users, projects, tasks, and comments.",
    version: "1.0.0",
  },
  host: parsed.host,
  basePath: "/",
  schemes: [parsed.protocol.replace(":", "")],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Auth",
      description: "OAuth authentication endpoints",
    },
    {
      name: "Users",
      description: "User management endpoints",
    },
    {
      name: "Projects",
      description: "Project management endpoints",
    },
    {
      name: "Tasks",
      description: "Task management endpoints",
    },
    {
      name: "Comments",
      description: "Comment management endpoints",
    },
  ],
  definitions: {
    UserInput: {
      type: "object",
      properties: {
        firstName: { type: "string", example: "Edwin" },
        lastName: { type: "string", example: "Bwambale" },
        email: { type: "string", example: "edwin@example.com" },
        role: { type: "string", example: "admin" },
        phone: { type: "string", example: "+256700000000" },
        isActive: { type: "boolean", example: true },
      },
    },
    ProjectInput: {
      type: "object",
      properties: {
        name: { type: "string", example: "Task Manager API Build" },
        ownerId: { type: "string", example: "69d57f3689060222c8d778c9" },
        description: { type: "string", example: "Core CRUD verification" },
        status: { type: "string", example: "active" },
        createdAt: { type: "string", example: "2026-04-08T00:00:00.000Z" },
      },
    },
    TaskInput: {
      type: "object",
      properties: {
        title: { type: "string", example: "Validate task endpoints" },
        projectId: { type: "string", example: "69d5812b89060222c8d778d5" },
        createdBy: { type: "string", example: "69d57f3689060222c8d778c9" },
        assignedTo: { type: "string", example: "69d57f3f89060222c8d778cb" },
        status: { type: "string", example: "pending" },
      },
    },
    CommentInput: {
      type: "object",
      properties: {
        taskId: { type: "string", example: "69d58abc89060222c8d778ef" },
        userId: { type: "string", example: "69d57f3689060222c8d778c9" },
        content: {
          type: "string",
          example: "Project CRUD is working well. Next I am validating the task endpoints.",
        },
      },
    },
    ErrorResponse: {
      type: "object",
      properties: {
        success: { type: "boolean", example: false },
        message: { type: "string", example: "Invalid user ID" },
      },
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = [
  "./routes/auth.js",
  "./routes/users.js",
  "./routes/projects.js",
  "./routes/tasks.js",
  "./routes/comments.js",
  "./app.js",
];

await swaggerAutogen()(outputFile, endpointsFiles, doc);

console.log("swagger.json generated successfully");