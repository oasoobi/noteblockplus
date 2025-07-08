import { CommandPermissionLevel, CustomCommandParamType, CustomCommandSource, CustomCommandStatus, system } from "@minecraft/server";
import PlayerDataManager from "../utils/PlayerDataManager";
import { VERSION } from "../utils/Data";
system.beforeEvents.startup.subscribe(e => {
    const noteBlockPlusCommand = {
        name: "ntp",
        description: "NoteBlock+を管理するコマンド。 / NoteBlockPlus Control Commands.",
        permissionLevel: CommandPermissionLevel.Any,
        mandatoryParameters: [{ type: CustomCommandParamType.Enum, name: "ntp:control" }],
        cheatsRequired: false
    };
    e.customCommandRegistry.registerEnum("ntp:control", ["config", "toggle", "reset", "version"]);
    e.customCommandRegistry.registerCommand(noteBlockPlusCommand, commandFunc);
});
function commandFunc(origin, control) {
    if (origin.sourceType !== CustomCommandSource.Entity && origin.sourceEntity?.typeId !== "minecraft:player")
        return { status: CustomCommandStatus.Failure };
    const player = origin.sourceEntity;
    const playerData = new PlayerDataManager(player);
    if (control == "config") {
        system.run(() => {
            //open config logic
            return { status: CustomCommandStatus.Success };
        });
    }
    if (control == "reset") {
        system.run(() => {
            //restore config logic
            return { status: CustomCommandStatus.Success, message: playerData.getLang() == "ja" ? "§e設定を初期化しました。" : "§eSettings have been reset." };
        });
    }
    if (control == "toggle") {
        system.run(() => {
            if (playerData.isEnable()) {
                playerData.setDisable();
            }
            else {
                playerData.setEnable();
            }
            if (playerData.getLang() == "ja")
                return { status: CustomCommandStatus.Success, message: `${player.getDynamicProperty("isEnable") ? "§e音階表示を有効にしました。" : "§e音階表示を無効にしました。"}` };
            if (playerData.getLang() == "en")
                return { status: CustomCommandStatus.Success, message: `${player.getDynamicProperty("isEnable") ? "§eThe scale display has been enabled." : "§eThe scale display has been disabled."}` };
        });
    }
    if (control == "version") {
        system.run(() => {
            return { status: CustomCommandStatus.Success, message: `§eNoteBlock+ v${VERSION}` };
        });
    }
    return { status: CustomCommandStatus.Failure, message: `${control} は無効です。\n${control} is not valid.` };
}
