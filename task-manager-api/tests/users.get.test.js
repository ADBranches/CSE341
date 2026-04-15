import request from "supertest";
import app from "../app.js";
import connectDB, { closeDb } from "../db/conn.js";

describe("Users GET routes", () => {
  beforeAll(async () => {
    await connectDB();
  }, 60000);

  afterAll(async () => {
    await closeDb();
  }, 60000);

  test("GET /users returns 200", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /users/:id returns 200 for an existing user", async () => {
    const listRes = await request(app).get("/users");
    expect(listRes.statusCode).toBe(200);
    expect(listRes.body.length).toBeGreaterThan(0);

    const userId = listRes.body[0]._id;

    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", userId);
  });

  test("GET /users/:id returns 404 for a valid but missing user", async () => {
    const res = await request(app).get("/users/507f1f77bcf86cd799439011");
    expect(res.statusCode).toBe(404);
  });

  test("GET /users/:id returns 400 for an invalid user id", async () => {
    const res = await request(app).get("/users/123");
    expect(res.statusCode).toBe(400);
  });
});