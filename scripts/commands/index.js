import { CustomCommandSource, CustomCommandStatus, system } from "@minecraft/server";
import PlayerDataManager from "../utils/PlayerDataManager";
import { VERSION } from "../utils/Data";
import ConfigManager from "../utils/ConfigManager";
export function commandFunc(origin, control) {
    if (origin.sourceType !== CustomCommandSource.Entity && origin.sourceEntity?.typeId !== "minecraft:player")
        return { status: CustomCommandStatus.Failure };
    const player = origin.sourceEntity;
    const playerData = new PlayerDataManager(player);
    if (control == "config") {
        system.runTimeout(() => {
            new ConfigManager(player).openConfig();
        });
        return { status: CustomCommandStatus.Success };
    }
    if (control == "reset") {
        system.runTimeout(() => {
            new ConfigManager(player).reset();
        });
        return { status: CustomCommandStatus.Success, message: playerData.getLang() == "ja" ? "§e設定を初期化しました。" : "§eSettings have been reset." };
    }
    if (control == "toggle") {
        system.runTimeout(() => {
            if (playerData.isEnable()) {
                playerData.setDisable();
            }
            else {
                playerData.setEnable();
            }
        });
        if (playerData.getLang() == "ja")
            return { status: CustomCommandStatus.Success, message: `${PlayerDataManager.getIsEnable(player) ? "§e音階表示を有効にしました。" : "§e音階表示を無効にしました。"}` };
        if (playerData.getLang() == "en")
            return { status: CustomCommandStatus.Success, message: `${PlayerDataManager.getIsEnable(player) ? "§eThe scale display has been enabled." : "§eThe scale display has been disabled."}` };
    }
    if (control == "version") {
        return { status: CustomCommandStatus.Success, message: `§eNoteBlock+ v${VERSION}` };
    }
    return { status: CustomCommandStatus.Failure, message: playerData.getLang() == "ja" ? `${control} は無効です。` : `${control} is not valid.` };
}
