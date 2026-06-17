var _ConfigManager_player;
import { system } from "@minecraft/server";
import PlayerDataManager from "./PlayerDataManager";
import { ModalFormData } from "@minecraft/server-ui";
import { DefaultConfig } from "./Constants";
class ConfigManager {
    constructor(player) {
        _ConfigManager_player.set(this, void 0);
        __classPrivateFieldSet(this, _ConfigManager_player, player, "f");
    }
    openConfig() {
        if (PlayerDataManager.getLang(__classPrivateFieldGet(this, _ConfigManager_player, "f")) === "ja") {
            new ModalFormData()
                .title("設定")
                .dropdown("\n言語", ["English", "日本語"], { defaultValueIndex: 1 })
                .dropdown("音階の表示形式", ["イタリア式(ドレミ)", "国際式(C,C#,D)"], {
                defaultValueIndex: PlayerDataManager.getConfig(__classPrivateFieldGet(this, _ConfigManager_player, "f"), "scaleDisplayStyle") ===
                    "international"
                    ? 1
                    : 0,
                tooltip: "音階の表示形式を変更します。",
            })
                .slider("距離", 1, 20, {
                defaultValue: PlayerDataManager.getConfig(__classPrivateFieldGet(this, _ConfigManager_player, "f"), "distance"),
                valueStep: 1,
                tooltip: "音ブロックの表示距離を設定します。",
            })
                .toggle("楽器を表示", {
                defaultValue: PlayerDataManager.getConfig(__classPrivateFieldGet(this, _ConfigManager_player, "f"), "isDisplayInstrument"),
                tooltip: "楽器の表示/非表示を切り替えます。重い場合は無効にすると軽くなる場合があります。",
            })
                .toggle("クリック数を表示", {
                defaultValue: PlayerDataManager.getConfig(__classPrivateFieldGet(this, _ConfigManager_player, "f"), "isDisplayClickCount"),
                tooltip: "クリック数の表示/非表示を切り替えます。",
            })
                .toggle("しゃがみながら右クリックで音階を一つ下げる", {
                defaultValue: PlayerDataManager.getConfig(__classPrivateFieldGet(this, _ConfigManager_player, "f"), "isReverseEnabled"),
                tooltip: "しゃがみ + 右クリックで音階を一つ下げる機能を有効にします。",
            })
                .label("* この機能は実験的なものです。使用は自己責任でお願いします。")
                .toggle("デフォルトに戻す", {
                defaultValue: false,
                tooltip: "デフォルトに戻すを選択すると、言語以外の設定が初期化されます。",
            })
                .submitButton("適用")
                .show(__classPrivateFieldGet(this, _ConfigManager_player, "f"))
                .then((res) => {
                if (res.canceled || !res.formValues)
                    return;
                if (res.formValues[7]) {
                    this.reset();
                }
                else {
                    this.update(res);
                }
                system.run(() => {
                    __classPrivateFieldGet(this, _ConfigManager_player, "f").sendMessage(PlayerDataManager.getLang(__classPrivateFieldGet(this, _ConfigManager_player, "f"))
                        ? "§e設定を変更しました。"
                        : "§eThe settings have been changed.");
                });
            });
        }
        else {
            new ModalFormData()
                .title("Settings")
                .dropdown("\nLanguage", ["English", "日本語"], { defaultValueIndex: 0 })
                .dropdown("Scale Display Style", ["Solfege (Do, Re, Mi)", "International (C, C#, D)"], {
                defaultValueIndex: PlayerDataManager.getConfig(__classPrivateFieldGet(this, _ConfigManager_player, "f"), "scaleDisplayStyle") ===
                    "international"
                    ? 1
                    : 0,
                tooltip: "Sets the display distance for note blocks.",
            })
                .slider("Distance", 1, 20, {
                defaultValue: PlayerDataManager.getConfig(__classPrivateFieldGet(this, _ConfigManager_player, "f"), "distance"),
                valueStep: 1,
                tooltip: "Sets the display distance for note blocks.",
            })
                .toggle("Display Instruments", {
                defaultValue: PlayerDataManager.getConfig(__classPrivateFieldGet(this, _ConfigManager_player, "f"), "isDisplayInstrument"),
                tooltip: "Toggle the display of instruments.",
            })
                .toggle("Display Click Count", {
                defaultValue: PlayerDataManager.getConfig(__classPrivateFieldGet(this, _ConfigManager_player, "f"), "isDisplayClickCount"),
                tooltip: "Toggle the display of click count.",
            })
                .toggle("Lower pitch by one step with Sneak + Right Click", {
                defaultValue: PlayerDataManager.getConfig(__classPrivateFieldGet(this, _ConfigManager_player, "f"), "isReverseEnabled"),
                tooltip: "Enables lowering the note pitch by one step when sneaking and right-clicking.",
            })
                .label("* This is an experimental feature. Use at your own risk.")
                .toggle("Restore Default Settings", {
                defaultValue: false,
                tooltip: "If selected, all settings except language will be reset.",
            })
                .submitButton("Apply")
                .show(__classPrivateFieldGet(this, _ConfigManager_player, "f"))
                .then((res) => {
                if (res.canceled || !res.formValues)
                    return;
                if (res.formValues[7]) {
                    this.reset();
                }
                else {
                    this.update(res);
                }
                system.run(() => {
                    __classPrivateFieldGet(this, _ConfigManager_player, "f").sendMessage(PlayerDataManager.getLang(__classPrivateFieldGet(this, _ConfigManager_player, "f"))
                        ? "§e設定を変更しました。"
                        : "§eThe settings have been changed.");
                });
            });
        }
    }
    init() {
        if (__classPrivateFieldGet(this, _ConfigManager_player, "f").getDynamicProperty("language") === undefined) {
            __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("language", DefaultConfig.language);
        }
        if (__classPrivateFieldGet(this, _ConfigManager_player, "f").getDynamicProperty("scaleDisplayStyle") === undefined) {
            __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("scaleDisplayStyle", DefaultConfig.scaleDisplayStyle);
        }
        if (__classPrivateFieldGet(this, _ConfigManager_player, "f").getDynamicProperty("isDisplayInstrument") === undefined) {
            __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("isDisplayInstrument", DefaultConfig.isDisplayInstrument);
        }
        if (__classPrivateFieldGet(this, _ConfigManager_player, "f").getDynamicProperty("isDisplayClickCount") === undefined) {
            __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("isDisplayClickCount", DefaultConfig.isDisplayClickCount);
        }
        if (__classPrivateFieldGet(this, _ConfigManager_player, "f").getDynamicProperty("isEnable") === undefined) {
            __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("isEnable", true);
        }
        if (__classPrivateFieldGet(this, _ConfigManager_player, "f").getDynamicProperty("isReverseEnabled") === undefined) {
            __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("isReverseEnabled", false);
        }
        if (__classPrivateFieldGet(this, _ConfigManager_player, "f").getDynamicProperty("distance") === undefined) {
            __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("distance", 10);
        }
    }
    reset() {
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("scaleDisplayStyle", DefaultConfig.scaleDisplayStyle);
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("isDisplayInstrument", DefaultConfig.isDisplayInstrument);
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("isDisplayClickCount", DefaultConfig.isDisplayClickCount);
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("isEnable", DefaultConfig.isEnable);
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("isReverseEnabled", DefaultConfig.isReverseEnabled);
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("distance", DefaultConfig.distance);
    }
    update(res) {
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("language", res.formValues[0] === 0 ? "en" : "ja");
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("scaleDisplayStyle", res.formValues[1] === 0 ? "solfege" : "international");
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("distance", res.formValues[2]);
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("isDisplayInstrument", res.formValues[3]);
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("isDisplayClickCount", res.formValues[4]);
        __classPrivateFieldGet(this, _ConfigManager_player, "f").setDynamicProperty("isReverseEnabled", res.formValues[5]);
    }
}
_ConfigManager_player = new WeakMap();
export default ConfigManager;
//# sourceMappingURL=ConfigManager.js.map