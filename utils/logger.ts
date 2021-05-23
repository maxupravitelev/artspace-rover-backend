export const info = (...params: any) => {
  // if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  // }
}

export const log_error = (...params: any) => {
  // if (process.env.NODE_ENV !== "test") {
  console.log(...params)
  // }
}

// module.exports = {
//   info,
//   error,
// }
