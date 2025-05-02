import { Block, BlockComponentTypes, BlockTypes, BlockVolume, Player, system, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { Instruments, InstrumentsTranslateKey, NoteBlockPitches, NoteBlockSounds, Scales, VERSION } from "./datalist.js";

const DefaultConfig = {
    scale_notation: 1,
    is_display_instrument: true,
    is_display_click_count: true,
    language: 0
}

world.afterEvents.playerSpawn.subscribe(e => {
    if (e.initialSpawn) { }
    if (e.player.getDynamicProperty("language") == undefined) {
        e.player.setDynamicProperty("language", DefaultConfig.language);
    }
    if (e.player.getDynamicProperty("scale_notation") == undefined) {
        e.player.setDynamicProperty("scale_notation", DefaultConfig.scale_notation);
    }
    if (e.player.getDynamicProperty("is_display_instrument") == undefined) {
        e.player.setDynamicProperty("is_display_instrument", DefaultConfig.is_display_instrument);
    }
    if (e.player.getDynamicProperty("is_display_click_count") == undefined) {
        e.player.setDynamicProperty("is_display_click_count", DefaultConfig.is_display_click_count);
    }
    if (e.player.getDynamicProperty("isEnable") == undefined) {
        e.player.setDynamicProperty("isEnable", true);
    }
    if (e.player.getDynamicProperty("isReverseNoteWithSneakEnabled") == undefined) {
        e.player.setDynamicProperty("isReverseNoteWithSneakEnabled", false);
    }
    if (e.player.getDynamicProperty("distance") == undefined) {
        e.player.setDynamicProperty("distance", 10);
    }
})

world.afterEvents.playerSpawn.subscribe(() => {
    if (world.getAllPlayers().length < 2) {
        system.run(() => {
            world.sendMessage(`\n§l§eNoteblock+ v${VERSION} created by oasobi\n§r§p---------------------\nNoteBlockPlus v${VERSION}が正常に読み込まれました。\nこのメッセージが表示されなくなった場合は、以下のリンクにアクセスしてください。\nhttps://go.oasoobi.net/NoteBlockPlus\n\nNoteBlockPlus v${VERSION} has been loaded successfully!\nIf you no longer see this message, please check for updates at https://go.oasoobi.net/NoteBlockPlus.§r`);
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
        if (sourceEntity.getDynamicProperty("language") == 1) {
            new ModalFormData()
                .title("設定")
                .dropdown("\n言語", ["English", "日本語"], sourceEntity.getDynamicProperty("language"))
                .dropdown("音階の表示形式", ["イタリア式(ドレミ)", "国際式(C,C#,D)"], sourceEntity.getDynamicProperty("scale_notation"))
                .slider("距離", 1, 20, 1, sourceEntity.getDynamicProperty("distance"))
                .toggle("楽器を表示する", sourceEntity.getDynamicProperty("is_display_instrument"))
                .toggle("クリック数を表示する", sourceEntity.getDynamicProperty("is_display_click_count"))
                .toggle("しゃがみながら右クリックで音階を一つ戻る", sourceEntity.getDynamicProperty("isReverseNoteWithSneakEnabled"))
                .label("* この機能は実験的なものです。使用は自己責任でお願いします。")
                .toggle("デフォルトに戻す")
                .label("* デフォルトに戻すを選択すると、言語以外の設定が初期化されます。")
                .submitButton("適用")
                .show(sourceEntity).then(res => {
                    if (res.canceled) return;
                    if (res.formValues[6]) {
                        initializeConfig(sourceEntity);
                    } else {
                        //設定の変更
                        sourceEntity.setDynamicProperty("language", res.formValues[0]);
                        sourceEntity.setDynamicProperty("scale_notation", res.formValues[1])
                        sourceEntity.setDynamicProperty("distance", res.formValues[2])
                        sourceEntity.setDynamicProperty("is_display_instrument", res.formValues[3])
                        sourceEntity.setDynamicProperty("is_display_click_count", res.formValues[4])
                        sourceEntity.setDynamicProperty("isReverseNoteWithSneakEnabled", res.formValues[5])
                    }

                    system.run(() => {
                        sourceEntity.getDynamicProperty("language");
                        if (sourceEntity.getDynamicProperty("language") == 1) {
                            sourceEntity.sendMessage("§e設定を変更しました。");
                        } else {
                            sourceEntity.sendMessage("§eThe settings have been changed.");
                        }
                    })
                })
        } else {
            new ModalFormData()
                .title("Settings")
                .dropdown("\nLanguage", ["English", "日本語"], sourceEntity.getDynamicProperty("language"))
                .dropdown("Scale notation", ["solfege(do,re,mi)", "international(C,C#,D)"], sourceEntity.getDynamicProperty("scale_notation"))
                .slider("Distance", 1, 20, 1, sourceEntity.getDynamicProperty("distance"))
                .toggle("Display Instruments", sourceEntity.getDynamicProperty("is_display_instrument"))
                .toggle("Display clicks", sourceEntity.getDynamicProperty("is_display_click_count"))
                .toggle("Sneak + Right Click to decrease the scale by one step", sourceEntity.getDynamicProperty("isReverseNoteWithSneakEnabled"))
                .label("* This is an experimental feature. Use at your own risk.")
                .toggle("Restore settings")
                .label("* If you select Restore settings, all settings except language will be reset.")
                .submitButton("Apply")
                .show(sourceEntity).then(res => {
                    if (res.canceled) return;
                    if (res.formValues[6]) {
                        initializeConfig(sourceEntity);
                    } else {
                        sourceEntity.setDynamicProperty("language", res.formValues[0]);
                        sourceEntity.setDynamicProperty("scale_notation", res.formValues[1])
                        sourceEntity.setDynamicProperty("distance", res.formValues[2])
                        sourceEntity.setDynamicProperty("is_display_instrument", res.formValues[3])
                        sourceEntity.setDynamicProperty("is_display_click_count", res.formValues[4])
                        sourceEntity.setDynamicProperty("isReverseNoteWithSneakEnabled", res.formValues[5])
                    }

                    system.run(() => {
                        sourceEntity.getDynamicProperty("language");
                        if (sourceEntity.getDynamicProperty("language") == 1) {
                            sourceEntity.sendMessage("§e設定を変更しました。");
                        } else {
                            sourceEntity.sendMessage("§eThe settings have been changed.");
                        }
                    })
                })
        }

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

/**
 * 
 * @param {Player} player 
 */
function initializeConfig(player) {
    player.setDynamicProperty("scale_notation", DefaultConfig.scale_notation);
    player.setDynamicProperty("is_display_instrument", DefaultConfig.is_display_instrument);
    player.setDynamicProperty("is_display_click_count", DefaultConfig.is_display_click_count);
}

world.beforeEvents.playerInteractWithBlock.subscribe(e => {
    const { block, player } = e;
    if (block.typeId == "minecraft:noteblock" && player.isSneaking && player.getDynamicProperty("isReverseNoteWithSneakEnabled")) {
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
                        console.log(instrument);
                        player.playSound(NoteBlockSounds[instrument], {pitch: NoteBlockPitches[i - 1 < 0 ? 24 : i - 1]});
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

/**
 * 
 * @param {Block} block 
 * @returns {number}
 */
function getNoteClicks(block) {
    const permutation = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).permutation;
    world.structureManager.place(world.structureManager.get("__noteblocks"), block.dimension, { x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z });
    const chestInv = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).getComponent("minecraft:inventory").container;
    chestInv.addItem(block.getItemStack(1, true)); //音ブロックをデータ付きでチェストに追加
    let clickCount;
    for (let i = 0; i < chestInv.size; i++) {
        const slot = chestInv.getSlot(i);
        if (1 < slot.amount) { //アイテムが二個あるスロットを確認
            clickCount = i;
            break;
        }
    }
    system.run(() => {
        const volume = new BlockVolume({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }, { x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z });
        block.dimension.fillBlocks(volume, "minecraft:air");
        block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).setPermutation(permutation);
    })
    return clickCount;
}