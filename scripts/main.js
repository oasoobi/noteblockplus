import { BlockTypes, BlockVolume, Player, system, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import {Instruments, InstrumentsTranslateKey, Scales} from "./datalist.js";

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
})

world.beforeEvents.playerInteractWithBlock.subscribe(e => {
    const { block, player, isFirstEvent, itemStack } = e;

    const lang = player.getDynamicProperty("language");
    const ENGLISH = 0;
    const INTERNATIONAL = 1;
    const scaleNotation = player.getDynamicProperty("scale_notation");
    const isDisplayClick = player.getDynamicProperty("is_display_click_count");
    const isDisplayInstrument = player.getDynamicProperty("is_display_instrument");
    if (!(block.typeId == "minecraft:noteblock" && isFirstEvent) || !player.getDynamicProperty("isEnable")) return;
    if (player.isSneaking) {
        if (itemStack !== undefined && BlockTypes.get(itemStack.typeId) !== undefined) {
            return;
        } else {
            e.cancel = true;
        }
    }
    system.run(() => {
        const permutation = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).permutation;
        block.dimension.runCommand(`structure load __noteblocks ${block.location.x} ${block.dimension.heightRange.max - 1} ${block.location.z}`);
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
                .toggle("楽器を表示する", sourceEntity.getDynamicProperty("is_display_instrument"))
                .toggle("クリック数を表示する", sourceEntity.getDynamicProperty("is_display_click_count"))
                .toggle("デフォルトに戻す")
                .submitButton("変更を適用")
                .show(sourceEntity).then(res => {
                    if (res.canceled) return;
                    if (res.formValues[4]) {
                        initializeConfig(sourceEntity);
                    } else {
                        //設定の変更
                        sourceEntity.setDynamicProperty("language", res.formValues[0]);
                        sourceEntity.setDynamicProperty("scale_notation", res.formValues[1])
                        sourceEntity.setDynamicProperty("is_display_instrument", res.formValues[2])
                        sourceEntity.setDynamicProperty("is_display_click_count", res.formValues[3])
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
                .toggle("Display Instruments", sourceEntity.getDynamicProperty("is_display_instrument"))
                .toggle("Display clicks", sourceEntity.getDynamicProperty("is_display_click_count"))
                .toggle("Restore settings")
                .submitButton("Apply")
                .show(sourceEntity).then(res => {
                    if (res.canceled) return;
                    if (res.formValues[4]) {
                        initializeConfig(sourceEntity);
                    } else {
                        sourceEntity.setDynamicProperty("language", res.formValues[0]);
                        sourceEntity.setDynamicProperty("scale_notation", res.formValues[1])
                        sourceEntity.setDynamicProperty("is_display_instrument", res.formValues[2])
                        sourceEntity.setDynamicProperty("is_display_click_count", res.formValues[3])
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
            sourceEntity.playSound("random.orb");
        })
    } else if (id == "note:version") {
        if (sourceEntity.getDynamicProperty("language") == 1) {
            sourceEntity.sendMessage("§eNoteBlock+のバージョンは 2.0.4 です。");
        } else {
            sourceEntity.sendMessage("§eNoteBlock+ is at version 2.0.4.");
        }
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
