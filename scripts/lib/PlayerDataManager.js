export default class PlayerDataManager {
    static getLang(player) {
        return player.getDynamicProperty("language") ?? "en";
    }
    static setDisable(player) {
        return player.setDynamicProperty("isEnable", false);
    }
    static setEnable(player) {
        return player.setDynamicProperty("isEnable", true);
    }
    static getIsEnable(player) {
        return player.getDynamicProperty("isEnable") ?? true;
    }
    static getConfig(player, configType) {
        return player.getDynamicProperty(configType);
    }
}
