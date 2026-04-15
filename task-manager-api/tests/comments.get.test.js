import request from "supertest";
import app from "../app.js";
import connectDB, { closeDb } from "../db/conn.js";

describe("Comments GET routes", () => {
  beforeAll(async () => {
    await connectDB();
  }, 60000);

  afterAll(async () => {
    await closeDb();
  }, 60000);

  test("GET /comments returns 200", async () => {
    const res = await request(app).get("/comments");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("GET /comments/:id returns 200 for an existing comment", async () => {
    const listRes = await request(app).get("/comments");
    expect(listRes.statusCode).toBe(200);
    expect(listRes.body.data.length).toBeGreaterThan(0);

    const commentId = listRes.body.data[0]._id;

    const res = await request(app).get(`/comments/${commentId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("_id", commentId);
  });

  test("GET /comments/:id returns 404 for a valid but missing comment", async () => {
    const res = await request(app).get("/comments/507f1f77bcf86cd799439011");
    expect(res.statusCode).toBe(404);
  });

  test("GET /comments/:id returns 400 for an invalid comment id", async () => {
    const res = await request(app).get("/comments/123");
    expect(res.statusCode).toBe(400);
  });
});