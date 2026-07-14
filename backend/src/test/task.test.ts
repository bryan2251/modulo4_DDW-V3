import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../app";

describe("POST /tasks", () => {
  it("rechaza un título vacío", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("El título es obligatorio");
  });

  it("rechaza un título con espacios", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "      " });

    expect(res.status).toBe(400);
  });

  it("crea una tarea válida", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Laboratorio 3" });


    console.log(res.status);
    console.log(res.body);
    console.log(res.text);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Laboratorio 3");
  });
});