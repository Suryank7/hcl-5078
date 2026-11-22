import { isEligible } from "./student.js";

describe("Attendance Eligibility Testing", () => {
  test("should return true if attendance is 75 or above", () => {
    expect(isEligible(80)).toBe(true);
  });

  test("should return false if attendance is below 75", () => {
    expect(isEligible(60)).toBe(false);
  });

  test("should throw error for invalid attendance", () => {
    expect(() => isEligible(110)).toThrow("Invalid attendance value");
  });
});
