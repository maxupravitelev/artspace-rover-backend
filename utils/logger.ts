export const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

export const error = (...params) => {
  // if (process.env.NODE_ENV !== "test") {
  console.log(...params)
  // }
}

// module.exports = {
//   info,
//   error,
// }
