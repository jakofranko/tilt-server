export type Beer = {
    "beer": string,
    "slug": string,
    "temp": number,
    "sg": number,
    "color": string,
    "comment": string,
    "timepoint": number
}
export type TiltEvent = {
    "Beer": string,
    "Temp": number,
    "SG": number,
    "Color": string,
    "Comment": string,
    "Timepoint": number
}

export type BeerRow = {
    "beer": string,
    "slug": string,
    "temp": number,
    "sg": number,
    "color": string,
    "comment": string,
    "timepoint": number,
    "timestamp": string
}
export type TiltDataRow = {
    "Beer": string,
    "Temp": number,
    "SG": number,
    "Color": string,
    "Comment": string,
    "Timepoint": number,
    "Timestamp": string
}
