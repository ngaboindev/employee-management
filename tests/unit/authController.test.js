const authController = require("../../controllers/authController");
const Employee = require("../../models/Employee");
const httpMocks = require("node-mocks-http");
const newManager = require("../mock-data/new-manager.json");

jest.mock("../../models/Employee");

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

// Describe block for authController.registerManager
describe("authController.registerManager", () => {
  it("Should have registerManager function", () => {
    expect(typeof authController.registerManager).toBe("function");
  });
});
