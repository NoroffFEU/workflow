import { getItem } from "./api.js";

const TEST_ID = 1;
const TEST_BAD_ID = "banana";
const TEST_ITEM = { id: TEST_ID, name: "Test Item" };

/**
 * A mock fetch function that fetches successfully
 * @returns {Promise<object>} A promise that resolves to the test item
 * @example
 * global.fetch = jest.fn(() => fetchSuccess())
 */
function fetchSuccess() {
  return Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve(TEST_ITEM)
  })
}

/**
 * A mock fetch function that fetches unsuccessfully
 * @param {number} status The status code to return
 * @param {string} statusText The status text to return
 * @returns {Promise<object>} A promise that resolves to the test item
 * @example
 * global.fetch = jest.fn(() => fetchFailure(500, "Internal Server Error"))
 */
function fetchFailure(status = 404, statusText = "Not Found") {
  return Promise.resolve({
    ok: false,
    status,
    statusText
  })
}

describe("getItem", () => {
  it("Returns a valid item object when provided with a valid ID", async () => {
    global.fetch = jest.fn(() => fetchSuccess())
    const item = await getItem(1);
    expect(item).toEqual(TEST_ITEM)
  })

  it("Returns undefined when an HTTP 404 error is received", async () => {
    global.fetch = jest.fn(() => fetchFailure());
    const item = await getItem(1);
    expect(item).toEqual(undefined)
  })

  it("Returns undefined when an HTTP 500 error is received", async () => {
    global.fetch = jest.fn(() => fetchFailure(500, "Internal Server Error"));
    const item = await getItem(1);
    expect(item).toEqual(undefined)
  })

  it("Returns undefined when the input is invalid", async () => {
    const item = await getItem(TEST_BAD_ID);
    expect(item).toEqual(undefined)
  })

  it("Returns undefined when the input is not provided", async () => {
    const item = await getItem();
    expect(item).toEqual(undefined)
  })
})