require('dotenv').config()

export const PORT = process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI

// if (process.env.NODE_ENV === 'test') {
//   MONGODB_URI = process.env.TEST_MONGODB_URI
// }

// module.exports = {
//   MONGODB_URI,
//   PORT
// }

