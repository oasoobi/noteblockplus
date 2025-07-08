import { Player } from "@minecraft/server";
import { DefaultConfig } from "../data";
export class PlayerData {

    /**
     * @private
     * @type {Player}
     */
    player;
    /**
     * 
     * @param {Player} player 
     */
    constructor(player) {
        this.player = player;
    }

    /**
     * 
     * @returns {en | ja}
     */
    getLang() {
        return this.player.getDynamicProperty("language") == "0" ? "en" : "ja";
    }

    /**
     * 
     * @returns {boolean}
     */
    isEnabled() {
        return this.player.getDynamicProperty("isEnable");
    }

    /**
     * 
     * @param { scaleDisplayStyle | isDisplayInstrument | isDisplayClickCount | isReverseEnabled | distance} type
     * @returns { string | number }
     */
    getConfig(type) {
        return this.player.getDynamicProperty(type);
    }

    /**
     * 
     * @param { scaleDisplayStyle | isDisplayInstrument | isDisplayClickCount | isReverseEnabled | distance }type
     * @param { string | number } value 
     */
    updateConfig(type, value) {
        this.player.setDynamicProperty(type, value);
    }

    initConfig() {
        if (this.player.getDynamicProperty("language") == undefined) {
            this.player.setDynamicProperty("language", DefaultConfig.language);
        }
        if (this.player.getDynamicProperty("scale_notation") == undefined) {
            this.player.setDynamicProperty("scale_notation", DefaultConfig.scale_notation);
        }
        if (this.player.getDynamicProperty("is_display_instrument") == undefined) {
            this.player.setDynamicProperty("is_display_instrument", DefaultConfig.is_display_instrument);
        }
        if (this.player.getDynamicProperty("is_display_click_count") == undefined) {
            this.player.setDynamicProperty("is_display_click_count", DefaultConfig.is_display_click_count);
        }
        if (this.player.getDynamicProperty("isEnable") == undefined) {
            this.player.setDynamicProperty("isEnable", true);
        }
        if (this.player.getDynamicProperty("isReverseNoteWithSneakEnabled") == undefined) {
            this.player.setDynamicProperty("isReverseNoteWithSneakEnabled", false);
        }
        if (this.player.getDynamicProperty("distance") == undefined) {
            this.player.setDynamicProperty("distance", 10);
        }
    }

    reset() {
        this.player.setDynamicProperty("scale_notation", DefaultConfig.scale_notation);
        this.player.setDynamicProperty("is_display_instrument", DefaultConfig.is_display_instrument);
        this.player.setDynamicProperty("is_display_click_count", DefaultConfig.is_display_click_count);
        this.player.setDynamicProperty("isEnable", DefaultConfig.is_enable);
        this.player.setDynamicProperty("isReverseNoteWithSneakEnabled", DefaultConfig.is_reverse_note_with_sneak_enabled);
        this.player.setDynamicProperty("distance", DefaultConfig.distance);
    }
}