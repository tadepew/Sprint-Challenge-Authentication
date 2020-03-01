const request = require("supertest");
const server = require("../api/server");

describe("auth router", function() {
  describe("POST /api/auth/register", function() {
    it("should return a 500 with wrong data", function() {
      return request(server)
        .post("/api/auth/register")
        .send("something")
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });

  describe("POST /api/auth/register", function() {
    it("should return 500 with username already in use", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "test" })
        .then(res => {
          expect(res.status).toBe(500);
        });
    });
  });

  describe("POST /api/auth/login", function() {
    it("should return 401 with invalid credentials", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "bad" })
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });

  describe("POST /api/auth/login", function() {
    it("should return 200 with valid credentials", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "ing" })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });
});
