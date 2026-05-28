import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Tasks API Endpoints", () => {
  it("should create a new task successfully with status 201", async () => {
    const validTaskData = {
      title: "Write Clean JavaScript",
      content: "Separate tests folder from production source code architecture",
      tag: ["Backend", "DevOps"],
    };

    const response = await request(app).post("/api/tasks").send(validTaskData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe(validTaskData.title);
    expect(response.body.content).toBe(validTaskData.content);
    expect(response.body.tag).toContain("Backend");
  });

  it("should return 400 if validation fails (content too short)", async () => {
    const invalidTaskData = {
      title: "Fix bug",
      content: "Short",
      tag: ["Frontend"],
    };

    const response = await request(app)
      .post("/api/tasks")
      .send(invalidTaskData);

    expect(response.status).toBe(400);
  });
});
