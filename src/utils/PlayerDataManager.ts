import { Player, Vector3 } from "@minecraft/server";
import { ConfigType, Language } from "../@types";

export default class PlayerDataManager {
    #player: Player;
    constructor(player: Player) {
        this.#player = player;
    }

    getLang(): Language {
        return (this.#player.getDynamicProperty("language") as Language | null) ?? "en";
    }

    isEnable(): boolean {
        return (this.#player.getDynamicProperty("isEnable") as boolean) ?? true;
    }

    setDisable():void {
        return this.#player.setDynamicProperty("isEnable", false);
    }

    setEnable():void {
        return this.#player.setDynamicProperty("isEnable", true);
    }

    static getIsEnable(player:Player): boolean {
        return (player.getDynamicProperty("isEnable") as boolean) ?? true;
    }

    static getConfig(player: Player, configType: ConfigType): number | string | boolean | undefined | Vector3 {
        return player.getDynamicProperty(configType);
    }
}