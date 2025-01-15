import request from "supertest";
import { app } from "../app.js";
import { describe, it, expect } from "vitest";

describe("Rate Limiting Tests", () => {
  it("should allow up to 5 requests", async () => {
    for (let i = 0; i < 5; i++) {
      const res = await request(app).get("/");
      expect(res.status).toBe(200);
    }
  });

  it("should block the 6th request", async () => {
    for (let i = 0; i < 5; i++) {
      await request(app).get("/");
    }
    const res = await request(app).get("/");
    expect(res.status).toBe(429);
    expect(res.body).toEqual({
      message: "Too many requests, please try again later.",
    });
  });
});
