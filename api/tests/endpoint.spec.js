import request from "supertest";
import app from "../src/app.js";

describe("urlShortner Test Suits", () => {
  it("GET /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  it("POST /submit", async () => {
    const data = JSON.stringify({
      longUrl: "aaaa.com",
      shortUrl: "aaaa",
    });
    const response = await request(app)
      .post("/submit", { json: true, body: data })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("POST /submit fail", async () => {
    const data = {
      longUrl: "",
      shortUrl: "",
    };
    const response = await request(app)
      .post("/submit", { json: true, body: data })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("GET /:url?", async () => {
    await request(app).get("/fake").expect(301);
  });

  it("GET /:url?/stats", async () => {
    const response = await request(app)
      .get("/fake/stats")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
