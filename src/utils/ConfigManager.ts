import { Player } from "@minecraft/server";
import PlayerDataManager from "./PlayerDataManager";
import { ModalFormData } from "@minecraft/server-ui";
import { system } from "@minecraft/server";
import { DefaultConfig } from "./Data";

export default class ConfigManager {
    #player: Player;
    constructor(player: Player) {
        this.#player = player;
    }

    openConfig() {
        const playerLang = PlayerDataManager.getConfig(this.#player, "language");
        if (playerLang == "ja") {
            new ModalFormData()
                .title("設定")
                .dropdown("\n言語", ["English", "日本語"], { defaultValueIndex: 1 })
                .dropdown("音階の表示形式", ["イタリア式(ドレミ)", "国際式(C,C#,D)"], { defaultValueIndex: PlayerDataManager.getConfig(this.#player, "scaleDisplayStyle") == "international" ? 1 : 0, tooltip: "音階の表示形式を変更します。" })
                .slider("距離", 1, 20, { defaultValue: PlayerDataManager.getConfig(this.#player, "distance") as number, valueStep: 1, tooltip: "音ブロックの表示距離を設定します。" })
                .toggle("楽器を表示", { defaultValue: PlayerDataManager.getConfig(this.#player, "isDisplayInstrument") as boolean, tooltip: "楽器の表示/非表示を切り替えます。重い場合は無効にすると軽くなる場合があります。" },)
                .toggle("クリック数を表示", { defaultValue: PlayerDataManager.getConfig(this.#player, "isDisplayClickCount") as boolean, tooltip: "クリック数の表示/非表示を切り替えます。" })
                .toggle("しゃがみながら右クリックで音階を一つ下げる", { defaultValue: PlayerDataManager.getConfig(this.#player, "isReverseEnabled") as boolean, tooltip: "しゃがみ + 右クリックで音階を一つ下げる機能を有効にします。" })
                .label("* この機能は実験的なものです。使用は自己責任でお願いします。")
                .toggle("デフォルトに戻す", { defaultValue: false, tooltip: "デフォルトに戻すを選択すると、言語以外の設定が初期化されます。" })
                .submitButton("適用")
                .show(this.#player).then(res => {
                    if (res.canceled || !res.formValues) return;
                    if (res.formValues[7]) {
                        this.reset();
                    } else {
                        this.update(res);
                    }
                    system.run(() => {
                        this.#player.sendMessage(playerLang ? "§e設定を変更しました。" : "§eThe settings have been changed.");
                    })
                })
        } else {
            new ModalFormData()
                .title("Settings")
                .dropdown("\nLanguage", ["English", "日本語"], { defaultValueIndex: 0 })
                .dropdown("Scale Display Style", ["Solfege (Do, Re, Mi)", "International (C, C#, D)"], { defaultValueIndex: PlayerDataManager.getConfig(this.#player, "scaleDisplayStyle") == "international" ? 1 : 0, tooltip: "Sets the display distance for note blocks." })
                .slider("Distance", 1, 20, { defaultValue: PlayerDataManager.getConfig(this.#player, "distance") as number, valueStep: 1, tooltip: "Sets the display distance for note blocks." })
                .toggle("Display Instruments", { defaultValue: PlayerDataManager.getConfig(this.#player, "isDisplayInstrument") as boolean, tooltip: "Toggle the display of instruments." },)
                .toggle("Display Click Count", { defaultValue: PlayerDataManager.getConfig(this.#player, "isDisplayClickCount") as boolean, tooltip: "Toggle the display of click count." })
                .toggle("Lower pitch by one step with Sneak + Right Click", { defaultValue: PlayerDataManager.getConfig(this.#player, "isReverseEnabled") as boolean, tooltip: "Enables lowering the note pitch by one step when sneaking and right-clicking." })
                .label("* This is an experimental feature. Use at your own risk.")
                .toggle("Restore Default Settings", { defaultValue: false, tooltip: "If selected, all settings except language will be reset." })
                .submitButton("Apply")
                .show(this.#player).then(res => {
                    if (res.canceled || !res.formValues) return;
                    if (res.formValues[7]) {
                        this.reset();
                    } else {
                        this.update(res);
                    }
                    system.run(() => {
                        this.#player.sendMessage(playerLang ? "§e設定を変更しました。" : "§eThe settings have been changed.");
                    })
                })
        }
    }

    init() {
        if (this.#player.getDynamicProperty("language") == undefined) {
            this.#player.setDynamicProperty("language", DefaultConfig.language);
        }
        if (this.#player.getDynamicProperty("scaleDisplayStyle") == undefined) {
            this.#player.setDynamicProperty("scaleDisplayStyle", DefaultConfig.scale_notation);
        }
        if (this.#player.getDynamicProperty("isDisplayInstrument") == undefined) {
            this.#player.setDynamicProperty("isDisplayInstrument", DefaultConfig.is_display_instrument);
        }
        if (this.#player.getDynamicProperty("isDisplayClickCount") == undefined) {
            this.#player.setDynamicProperty("isDisplayClickCount", DefaultConfig.is_display_click_count);
        }
        if (this.#player.getDynamicProperty("isEnable") == undefined) {
            this.#player.setDynamicProperty("isEnable", true);
        }
        if (this.#player.getDynamicProperty("isReverseEnabled") == undefined) {
            this.#player.setDynamicProperty("isReverseEnabled", false);
        }
        if (this.#player.getDynamicProperty("distance") == undefined) {
            this.#player.setDynamicProperty("distance", 10);
        }
    }

    reset() {
        this.#player.setDynamicProperty("scaleDisplayStyle", DefaultConfig.scale_notation);
        this.#player.setDynamicProperty("isDisplayInstrument", DefaultConfig.is_display_instrument);
        this.#player.setDynamicProperty("isDisplayClickCount", DefaultConfig.is_display_click_count);
        this.#player.setDynamicProperty("isEnable", DefaultConfig.is_enable);
        this.#player.setDynamicProperty("isReverseEnabled", DefaultConfig.is_reverse_note_with_sneak_enabled);
        this.#player.setDynamicProperty("distance", DefaultConfig.distance);
    }

    update(res: any) {
        this.#player.setDynamicProperty("language", res.formValues[0]);
        this.#player.setDynamicProperty("scale_notation", res.formValues[1])
        this.#player.setDynamicProperty("distance", res.formValues[2])
        this.#player.setDynamicProperty("is_display_instrument", res.formValues[3])
        this.#player.setDynamicProperty("is_display_click_count", res.formValues[4])
        this.#player.setDynamicProperty("isReverseNoteWithSneakEnabled", res.formValues[5])
    }
}