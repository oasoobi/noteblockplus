import { Player, Vector3 } from "@minecraft/server";
import { ConfigType, Language } from "../@types";

export default class PlayerDataManager {

    static getLang(player: Player): Language {
        return (player.getDynamicProperty("language") as Language | null) ?? "en";
    }

    static setDisable(player:Player): void {
        return player.setDynamicProperty("isEnable", false);
    }

    static setEnable(player: Player): void {
        return player.setDynamicProperty("isEnable", true);
    }

    static getIsEnable(player: Player): boolean {
        return (player.getDynamicProperty("isEnable") as boolean) ?? true;
    }

    static getConfig(player: Player, configType: ConfigType): number | string | boolean | undefined | Vector3 {
        return player.getDynamicProperty(configType);
    }
}