export default class PlayerDataManager {
    static getLang(player) {
        return player.getDynamicProperty("language") ?? "en";
    }
    static setDisable(player) {
        player.setDynamicProperty("isEnable", false);
    }
    static setEnable(player) {
        player.setDynamicProperty("isEnable", true);
    }
    static getIsEnable(player) {
        return player.getDynamicProperty("isEnable") ?? true;
    }
    static getConfig(player, configType) {
        return player.getDynamicProperty(configType);
    }
}
//# sourceMappingURL=PlayerDataManager.js.map