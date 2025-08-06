import { Instruments } from "../lib/Data";

export type Language = "ja" | "en";

export type ScaleDisplayStyle = "solfege" | "international";

export type ConfigData = {
    language: Language
    scaleDisplayStyle: ScaleDisplayStyle
    isDisplayInstrument: boolean
    isDisplayClickCount: boolean
    isReverseEnabled: boolean
    distance: number
}

export type ConfigType = "language" | "scaleDisplayStyle" | "isDisplayInstrument" | "isDisplayClickCount" | "isReverseEnabled" | "distance"

export type InstrumentsType = typeof Instruments[keyof typeof Instruments]