import { CustomCommandSource, CustomCommandStatus, system } from "@minecraft/server";
import PlayerDataManager from "../lib/PlayerDataManager";
import { VERSION } from "../lib/Constants";
import ConfigManager from "../lib/ConfigManager";
export function commandFunc(origin, control) {
    if (origin.sourceType !== CustomCommandSource.Entity && origin.sourceEntity?.typeId !== "minecraft:player")
        return { status: CustomCommandStatus.Failure };
    const player = origin.sourceEntity;
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
        return { status: CustomCommandStatus.Success, message: PlayerDataManager.getLang(player) == "ja" ? "§e設定を初期化しました。" : "§eSettings have been reset." };
    }
    if (control == "toggle") {
        system.runTimeout(() => {
            if (PlayerDataManager.getIsEnable(player)) {
                PlayerDataManager.setDisable(player);
            }
            else {
                PlayerDataManager.setEnable(player);
            }
        });
        if (PlayerDataManager.getLang(player))
            return { status: CustomCommandStatus.Success, message: `${PlayerDataManager.getIsEnable(player) ? "§e音階表示を有効にしました。" : "§e音階表示を無効にしました。"}` };
        if (PlayerDataManager.getLang(player))
            return { status: CustomCommandStatus.Success, message: `${PlayerDataManager.getIsEnable(player) ? "§eThe scale display has been enabled." : "§eThe scale display has been disabled."}` };
    }
    if (control == "version") {
        return { status: CustomCommandStatus.Success, message: `§eNoteBlock+ v${VERSION}` };
    }
    return { status: CustomCommandStatus.Failure, message: PlayerDataManager.getLang(player) == "ja" ? `${control} は無効です。` : `${control} is not valid.` };
}
