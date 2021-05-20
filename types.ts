export interface requestBodyBase {
  password: string,
  username: string,
}

export type requestBody =
  | requestBodyBase