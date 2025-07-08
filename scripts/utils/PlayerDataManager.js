export default class PlayerDataManager {
    #player;
    constructor(player) {
        this.#player = player;
    }
    getLang() {
        return this.#player.getDynamicProperty("lang") ?? "en";
    }
    isEnable() {
        return this.#player.getDynamicProperty("isEnable") ?? true;
    }
    setDisable() {
        return this.#player.setDynamicProperty("isEnable", false);
    }
    setEnable() {
        return this.#player.setDynamicProperty("isEnable", true);
    }
    static getIsEnable(player) {
        return player.getDynamicProperty("isEnable") ?? true;
    }
    static getConfig(player, configType) {
        return player.getDynamicProperty(configType);
    }
}
