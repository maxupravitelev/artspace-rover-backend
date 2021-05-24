///// request types

export interface requestBodyBase {
  password: string,
  username: string,
}

export type requestBody =
  | requestBodyBase

///// exhibition types

export type ExhibitionType = {
    artspace: string,
    rovers: any,
    description: string,
    openingDay: string,
    closingDay: string,
    title: string,
    bannerImage: string
}