// tests/tasks.test.js

import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app"; // tu servidor Express

describe("POST /tasks", () => {
  it("rechaza crear una tarea con titulo vacío", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "" });

    expect(res.status).toBe(400);
  });

  it("rechaza crear una tarea con solo espacios", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "      " });

    expect(res.status).toBe(400);
  });

  it("crea una tarea válida", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Hacer laboratorio" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Hacer laboratorio");
  });
});