import request from "supertest";
import app from "../app.js";
import connectDB, { closeDb } from "../db/conn.js";

describe("Projects GET routes", () => {
  beforeAll(async () => {
    await connectDB();
  }, 30000);

  afterAll(async () => {
    await closeDb();
  }, 30000);

  test("GET /projects returns 200", async () => {
    const res = await request(app).get("/projects");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("GET /projects/:id returns 200 for an existing project", async () => {
    const listRes = await request(app).get("/projects");
    expect(listRes.statusCode).toBe(200);
    expect(listRes.body.data.length).toBeGreaterThan(0);

    const projectId = listRes.body.data[0]._id;

    const res = await request(app).get(`/projects/${projectId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("_id", projectId);
  });

  test("GET /projects/:id returns 404 for a valid but missing project", async () => {
    const res = await request(app).get("/projects/507f1f77bcf86cd799439011");
    expect(res.statusCode).toBe(404);
  });
});