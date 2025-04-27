import supertest from "supertest";
import { expect, test } from "vitest";
import app from "../app";

test("app returns hello on root", async () => {
  const agent = supertest(app);
  const res = await agent.get("/");

  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual("Hello, World!");
});
