import request from "supertest";
import app from "../app.js";
import connectDB, { closeDb } from "../db/conn.js";

describe("Tasks GET routes", () => {
  beforeAll(async () => {
    await connectDB();
  }, 30000);

  afterAll(async () => {
    await closeDb();
  }, 30000);

  test("GET /tasks returns 200", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("GET /tasks/:id returns 200 for an existing task", async () => {
    const listRes = await request(app).get("/tasks");
    expect(listRes.statusCode).toBe(200);
    expect(listRes.body.data.length).toBeGreaterThan(0);

    const taskId = listRes.body.data[0]._id;

    const res = await request(app).get(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("_id", taskId);
  });

  test("GET /tasks/:id returns 404 for a valid but missing task", async () => {
    const res = await request(app).get("/tasks/507f1f77bcf86cd799439011");
    expect(res.statusCode).toBe(404);
  });
});