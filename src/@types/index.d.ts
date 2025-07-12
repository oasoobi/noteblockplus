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

export type InstrumentsType = "piano" | "bass" | "bass_drum" | "cow_bell" | "clicks_and_sticks" | "flute" | "pling_piano" | "snare_drum" | "bells" | "chimes" | "guitar" | "xylophone" | "iron_xylophone" | "didgeridoo" | "bit" | "banjo"