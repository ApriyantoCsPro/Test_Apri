const {dateComparison} = require("../utils/functions");

test("test dateComparison util", () => {
  const mockup = {
    time1: new Date().toISOString(),
    time2: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString()
  };

  const comparedDate = dateComparison(mockup.time1, mockup.time2);
  expect(comparedDate.date).toBe(2);
});