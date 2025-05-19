// This file is used to store global configuration that persists during the session
// In a production app, you would use a database or secure storage

declare global {
  var EXCHANGE_API_KEY: string | undefined
  var EXCHANGE_API_SECRET: string | undefined
  var EXCHANGE_TYPE: string | undefined
  var EXCHANGE_TEST_MODE: string | undefined
}

// Initialize global variables if they don't exist
if (typeof global.EXCHANGE_API_KEY === "undefined") {
  global.EXCHANGE_API_KEY = undefined
}
if (typeof global.EXCHANGE_API_SECRET === "undefined") {
  global.EXCHANGE_API_SECRET = undefined
}
if (typeof global.EXCHANGE_TYPE === "undefined") {
  global.EXCHANGE_TYPE = undefined
}
if (typeof global.EXCHANGE_TEST_MODE === "undefined") {
  global.EXCHANGE_TEST_MODE = undefined
}

export {}
