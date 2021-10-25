export type Beer = {
    "beer": string,
    "temp": number,
    "sg": number,
    "color": string,
    "comment": string,
    "timepoint": number
}
export type TiltEvent = {
    "parameter": {
        "Beer": string,
        "Temp": number,
        "SG": number,
        "Color": string,
        "Comment": string,
        "Timepoint": number
    }
}
