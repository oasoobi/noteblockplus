import { BlockVolume, Player, system, world, CommandPermissionLevel, CustomCommandParamType, CustomCommandStatus, CustomCommandOrigin } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { Instruments, InstrumentsTranslateKey, NoteBlockPitches, NoteBlockSounds, Scales, VERSION } from "./data.js";

const DefaultConfig = {
    scale_notation: 1,
    is_display_instrument: true,
    is_display_click_count: true,
    language: 0,
    is_enable: true,
    is_reverse_note_with_sneak_enabled: false,
    distance: 10
}

system.beforeEvents.startup.subscribe(e => {
    /**
     * @type {import ("@minecraft/server").CustomCommand}
     */
    const ntpCommand = {
        name: "ntp:ntp",
        description: "NoteBlock+に関するコマンド。",
        permissionLevel: CommandPermissionLevel.Any,
        mandatoryParameters: [{ type: CustomCommandParamType.Enum, name: "ntp:action" }]
    }
    e.customCommandRegistry.registerEnum("ntp:action", ["config", "toggle", "reset", "version", ]);

    e.customCommandRegistry.registerCommand(ntpCommand, ntpCommandFunc)
})
/**
 * 
 * @param {String} action 
 * @param {CustomCommandOrigin} origin 
 * @returns { import("@minecraft/server").CustomCommandResult }
 */
function ntpCommandFunc(origin, action) {
    if (action == "config") {
        if (origin.sourceEntity.typeId == "minecraft:player") {
            system.run(() => {
                new ConfigManager(origin.sourceEntity).openUI();
                return { status: CustomCommandStatus.Success };
            })
        }
    }
    if (action == "version") {
        if (origin.sourceEntity.typeId == "minecraft:player") {
            system.run(() => {
                origin.sourceEntity.sendMessage(`§eNoteBlock+ v${VERSION}`);
                return { status: CustomCommandStatus.Success };
            })
        }
    }
    if (action == "toggle") {
        if (origin.sourceEntity.typeId == "minecraft:player") {
            system.run(() => {
                origin.sourceEntity.setDynamicProperty("isEnable", !origin.sourceEntity.getDynamicProperty("isEnable"));
                system.run(() => {
                    if (origin.sourceEntity.getDynamicProperty("language") == 1) {
                        origin.sourceEntity.sendMessage(`${origin.sourceEntity.getDynamicProperty("isEnable") ? "§e音階表示を有効にしました。" : "§e音階表示を無効にしました。"}`);
                    } else {
                        origin.sourceEntity.sendMessage(`${origin.sourceEntity.getDynamicProperty("isEnable") ? "§eThe scale display has been enabled." : "§eThe scale display has been disabled."}`);
                    }
                })
                return { status: CustomCommandStatus.Success };
            })
        }
    }
    if (action == "reset") {
        if (origin.sourceEntity.typeId == "minecraft:player") {
            system.run(() => {
                new ConfigManager(origin.sourceEntity).reset();
                    origin.sourceEntity.sendMessage("§e設定を初期化しました。");
                return { status: CustomCommandStatus.Success };
            })
        }
    }
}

world.afterEvents.playerSpawn.subscribe((e) => {
    if (e.initialSpawn) {
        new ConfigManager(e.player).init();
    }
    if (world.getAllPlayers().length < 2) {
        system.run(() => {
            e.player.sendMessage(`\n§l§eNoteblock+ v${VERSION} created by oasobi\n§r§p---------------------\nNoteBlockPlus v${VERSION}が正常に読み込まれました。\nこのメッセージが表示されなくなった場合は、以下のリンクにアクセスしてください。\nhttps://go.oasoobi.net/NoteBlockPlus\n\nNoteBlockPlus v${VERSION} has been loaded successfully!\nIf you no longer see this message, please check for updates at https://go.oasoobi.net/NoteBlockPlus.§r`);
        })
    }
})

system.runInterval(() => {
    const ENGLISH = 0;
    const INTERNATIONAL = 1;
    world.getAllPlayers().filter(player => { return player.getDynamicProperty("isEnable") }).forEach(player => {

        const lang = player.getDynamicProperty("language");
        const scaleNotation = player.getDynamicProperty("scale_notation");
        const isDisplayClick = player.getDynamicProperty("is_display_click_count");
        const isDisplayInstrument = player.getDynamicProperty("is_display_instrument");
        const view = player.getBlockFromViewDirection({ maxDistance: player.getDynamicProperty("distance") + 1 });

        if (!view) return player.onScreenDisplay.setActionBar(" ");
        const block = view.block;

        if (block.typeId !== "minecraft:noteblock") return player.onScreenDisplay.setActionBar(" ");
        const permutation = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).permutation;
        world.structureManager.place(world.structureManager.get("__noteblocks"), block.dimension, { x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z });
        const chestInv = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).getComponent("minecraft:inventory").container;
        chestInv.addItem(block.getItemStack(1, true)); //音ブロックをデータ付きでチェストに追加
        for (let i = 0; i < chestInv.size; i++) {
            const slot = chestInv.getSlot(i);
            if (1 < slot.amount) { //アイテムが二個あるスロットを確認
                const clickCount = i;
                let resultMsg;
                //音階
                resultMsg = lang == ENGLISH ? "scale: " : "音階: ";
                if (scaleNotation == INTERNATIONAL) {
                    resultMsg += Scales.international[clickCount];
                } else {
                    resultMsg += Scales.solfege[lang == ENGLISH ? "en" : "ja"][clickCount];
                }

                //クリック数
                if (isDisplayClick) {
                    resultMsg += " click: " + clickCount;
                }
                //楽器を表示
                if (isDisplayInstrument) {
                    let instrument;
                    const underblock = block.below(1); //1ブロック下のブロックを取得
                    const keys = Object.keys(Instruments)
                    for (const key of keys) {
                        if (underblock.typeId.includes(key)) {
                            instrument = InstrumentsTranslateKey[lang == ENGLISH ? "en" : "ja"][Instruments[key]];
                            break;
                        }
                    }
                    if (!instrument) { //楽器が見つからなかったときにピアノに
                        instrument = lang == ENGLISH ? "Piano" : "ピアノ"
                    }
                    resultMsg += lang == ENGLISH ? " instrument: " + instrument : " 楽器: " + instrument;
                }
                player.onScreenDisplay.setActionBar(resultMsg);
                break;
            }
        }
        //ブロックをもとに戻す
        const volume = new BlockVolume({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }, { x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z });
        block.dimension.fillBlocks(volume, "minecraft:air");
        block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).setPermutation(permutation);
    })
})

system.afterEvents.scriptEventReceive.subscribe(e => {
    const { id, sourceEntity } = e;
    if (id == "note:config") {
        new ConfigManager(sourceEntity).openUI();
    } else if (id == "note:toggle") {
        sourceEntity.setDynamicProperty("isEnable", !sourceEntity.getDynamicProperty("isEnable"));
        system.run(() => {
            if (sourceEntity.getDynamicProperty("language") == 1) {
                sourceEntity.sendMessage(`${sourceEntity.getDynamicProperty("isEnable") ? "§e音階表示を有効にしました。" : "§e音階表示を無効にしました。"}`);
            } else {
                sourceEntity.sendMessage(`${sourceEntity.getDynamicProperty("isEnable") ? "§eThe scale display has been enabled." : "§eThe scale display has been disabled."}`);
            }
        })
    } else if (id == "note:version") {
        sourceEntity.sendMessage(`§eNoteBlock+ v${VERSION}`);
    }
})

world.beforeEvents.playerInteractWithBlock.subscribe(e => {
    const { block, player } = e;
    if (block.typeId == "minecraft:noteblock" && player.isSneaking && player.getDynamicProperty("isReverseNoteWithSneakEnabled") && player.getDynamicProperty("isEnable")) {
        e.cancel = true;
        system.run(() => {
            const permutation = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).permutation;
            world.structureManager.place(world.structureManager.get("__noteblocks"), block.dimension, { x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z });
            const chestInv = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).getComponent("minecraft:inventory").container;
            chestInv.addItem(block.getItemStack(1, true)); //音ブロックをデータ付きでチェストに追加
            for (let i = 0; i < chestInv.size; i++) {
                const slot = chestInv.getSlot(i);
                if (1 < slot.amount) { //アイテムが二個あるスロットを確認
                    system.run(() => {
                        world.structureManager.place(world.structureManager.get(`${i - 1 < 0 ? 24 : i - 1}`), block.dimension, block.location);
                        let instrument = "piano";
                        const underblock = block.below(1); //1ブロック下のブロックを取得
                        const keys = Object.keys(Instruments)
                        for (const key of keys) {
                            if (underblock.typeId.includes(key)) {
                                instrument = Instruments[key];
                                break;
                            }
                        }
                        player.dimension.playSound(NoteBlockSounds[instrument], block.location, { pitch: NoteBlockPitches[i - 1 < 0 ? 24 : i - 1], volume: 100 });
                    })
                    break;
                }
            }
            const volume = new BlockVolume({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }, { x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z });
            block.dimension.fillBlocks(volume, "minecraft:air");
            block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).setPermutation(permutation);
        })
    }
})

class ConfigManager {
    /**
     * 
     * @param {Player} player 
     */
    constructor(player) {
        this.player = player;
    }

    openUI() {
        if (this.player.getDynamicProperty("language") == 1) {
            new ModalFormData()
                .title("設定")
                .dropdown("\n言語", ["English", "日本語"], { defaultValueIndex: this.player.getDynamicProperty("language") })
                .dropdown("音階の表示形式", ["イタリア式(ドレミ)", "国際式(C,C#,D)"], { defaultValueIndex: this.player.getDynamicProperty("scale_notation") })
                .slider("距離", 1, 20, { defaultValue: this.player.getDynamicProperty("distance"), valueStep: 1, tooltip: "音ブロックの表示距離を設定します。" })
                .toggle("楽器を表示", { defaultValue: this.player.getDynamicProperty("is_display_instrument"), tooltip: "楽器の表示/非表示を切り替えます。" },)
                .toggle("クリック数を表示", { defaultValue: this.player.getDynamicProperty("is_display_click_count"), tooltip: "クリック数の表示/非表示を切り替えます。" })
                .toggle("しゃがみながら右クリックで音階を一つ下げる", { defaultValue: this.player.getDynamicProperty("isReverseNoteWithSneakEnabled"), tooltip: "しゃがみ + 右クリックで音階を一つ下げる機能を有効にします。" })
                .label("* この機能は実験的なものです。使用は自己責任でお願いします。")
                .toggle("デフォルトに戻す", { defaultValue: false, tooltip: "デフォルトに戻すを選択すると、言語以外の設定が初期化されます。" })
                .submitButton("適用")
                .show(this.player).then(res => {
                    if (res.canceled) return;
                    if (res.formValues[7]) {
                        this.reset();
                    } else {
                        this.update(res);
                    }
                    system.run(() => {
                        this.player.getDynamicProperty("language");
                        if (this.player.getDynamicProperty("language") == 1) {
                            this.player.sendMessage("§e設定を変更しました。");
                        } else {
                            this.player.sendMessage("§eThe settings have been changed.");
                        }
                    })
                })
        } else {
            new ModalFormData()
                .title("Settings")
                .dropdown("\nLanguage", ["English", "日本語"], { defaultValueIndex: this.player.getDynamicProperty("language") })
                .dropdown("Scale notation", ["Solfege (Do, Re, Mi)", "International (C, C#, D)"], { defaultValueIndex: this.player.getDynamicProperty("scale_notation") })
                .slider("Distance", 1, 20, {
                    defaultValue: this.player.getDynamicProperty("distance"),
                    valueStep: 1,
                    tooltip: "Sets the display distance for note blocks."
                })
                .toggle("Display Instruments", {
                    defaultValue: this.player.getDynamicProperty("is_display_instrument"),
                    tooltip: "Toggle the display of instruments."
                })
                .toggle("Display Click Count", {
                    defaultValue: this.player.getDynamicProperty("is_display_click_count"),
                    tooltip: "Toggle the display of click count."
                })
                .toggle("Lower pitch by one step with Sneak + Right Click", {
                    defaultValue: this.player.getDynamicProperty("isReverseNoteWithSneakEnabled"),
                    tooltip: "Enables lowering the note pitch by one step when sneaking and right-clicking."
                })
                .label("* This is an experimental feature. Use at your own risk.")
                .toggle("Restore Default Settings", {
                    defaultValue: false,
                    tooltip: "If selected, all settings except language will be reset."
                })
                .submitButton("Apply")
                .show(this.player).then(res => {
                    if (res.canceled) return;
                    if (res.formValues[7]) {
                        this.reset();
                    } else {
                        this.update(res);
                    }

                    system.run(() => {
                        if (this.player.getDynamicProperty("language") == 1) {
                            this.player.sendMessage("§e設定を変更しました。");
                        } else {
                            this.player.sendMessage("§eThe settings have been changed.");
                        }
                    });
                });

        }
    }

    init() {
        if (this.player.getDynamicProperty("language") == undefined) {
            this.player.setDynamicProperty("language", DefaultConfig.language);
        }
        if (this.player.getDynamicProperty("scale_notation") == undefined) {
            this.player.setDynamicProperty("scale_notation", DefaultConfig.scale_notation);
        }
        if (this.player.getDynamicProperty("is_display_instrument") == undefined) {
            this.player.setDynamicProperty("is_display_instrument", DefaultConfig.is_display_instrument);
        }
        if (this.player.getDynamicProperty("is_display_click_count") == undefined) {
            this.player.setDynamicProperty("is_display_click_count", DefaultConfig.is_display_click_count);
        }
        if (this.player.getDynamicProperty("isEnable") == undefined) {
            this.player.setDynamicProperty("isEnable", true);
        }
        if (this.player.getDynamicProperty("isReverseNoteWithSneakEnabled") == undefined) {
            this.player.setDynamicProperty("isReverseNoteWithSneakEnabled", false);
        }
        if (this.player.getDynamicProperty("distance") == undefined) {
            this.player.setDynamicProperty("distance", 10);
        }
    }

    reset() {
        this.player.setDynamicProperty("scale_notation", DefaultConfig.scale_notation);
        this.player.setDynamicProperty("is_display_instrument", DefaultConfig.is_display_instrument);
        this.player.setDynamicProperty("is_display_click_count", DefaultConfig.is_display_click_count);
        this.player.setDynamicProperty("isEnable", DefaultConfig.is_enable);
        this.player.setDynamicProperty("isReverseNoteWithSneakEnabled", DefaultConfig.is_reverse_note_with_sneak_enabled);
        this.player.setDynamicProperty("distance", DefaultConfig.distance);
    }

    update(res) {
        this.player.setDynamicProperty("language", res.formValues[0]);
        this.player.setDynamicProperty("scale_notation", res.formValues[1])
        this.player.setDynamicProperty("distance", res.formValues[2])
        this.player.setDynamicProperty("is_display_instrument", res.formValues[3])
        this.player.setDynamicProperty("is_display_click_count", res.formValues[4])
        this.player.setDynamicProperty("isReverseNoteWithSneakEnabled", res.formValues[5])
    }
}