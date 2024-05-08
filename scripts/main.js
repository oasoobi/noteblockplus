import { system, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

const overworld = world.getDimension("overworld");

const DefaultConfig = {
    scale_notation: 1,
    show_instrument: true,
    show_click_count: true,
    language: 0
}

world.afterEvents.playerSpawn.subscribe(e => {
    if (e.initialSpawn) {
        if (e.player.getDynamicProperty("language") == undefined) {
            e.player.setDynamicProperty("language", DefaultConfig.language);
        }
        if (e.player.getDynamicProperty("scale_notation") == undefined) {
            e.player.setDynamicProperty("scale_notation", DefaultConfig.scale_notation);
        }
        if (e.player.getDynamicProperty("show_instrument") == undefined) {
            e.player.setDynamicProperty("show_instrument", DefaultConfig.show_instrument);
        }
        if (e.player.getDynamicProperty("show_click_count") == undefined) {
            e.player.setDynamicProperty("show_click_count", DefaultConfig.show_click_count);
        }
    }
})


const scales = {
    international: [
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#"
    ],
    solfege: {
        english: [
            "Fa#",
            "Sol",
            "Sol#",
            "La",
            "La#",
            "Si",
            "Do",
            "Do#",
            "Re",
            "Re#",
            "Mi",
            "Fa",
            "Fa#",
            "Sol",
            "Sol#",
            "La",
            "La#",
            "Si",
            "Do",
            "Do#",
            "Re",
            "Re#",
            "Mi",
            "Fa",
            "Fa#"
        ],
        japanese: [
            "ファ#",
            "ソ",
            "ソ#",
            "ラ",
            "ラ#",
            "シ",
            "ド",
            "ド#",
            "レ",
            "レ#",
            "ミ",
            "ファ",
            "ファ#",
            "ソ",
            "ソ#",
            "ラ",
            "ラ#",
            "シ",
            "ド",
            "ド#",
            "レ",
            "レ#",
            "ミ",
            "ファ",
            "ファ#",
        ]
    }
}

const instruments = {
    japanese: {
        "sand": "スネアドラム",
        "gravel": "スネアドラム",
        "sand": "スネアドラム",
        "red_concrete_powder": "スネアドラム",
        "black_concrete_powder": "スネアドラム",
        "green_concrete_powder": "スネアドラム",
        "brown_concrete_powder": "スネアドラム",
        "blue_concrete_powder": "スネアドラム",
        "purple_concrete_powder": "スネアドラム",
        "cyan_concrete_powder": "スネアドラム",
        "light_gray_concrete_powder": "スネアドラム",
        "gray_concrete_powder": "スネアドラム",
        "pink_concrete_powder": "スネアドラム",
        "lime_concrete_powder": "スネアドラム",
        "yellow_concrete_powder": "スネアドラム",
        "light_blue_concrete_powder": "スネアドラム",
        "magenta_concrete_powder": "スネアドラム",
        "orange_concrete_powder": "スネアドラム",
        "white_concrete_powder": "スネアドラム",

        "sea_lantern": "スティック",
        "beacon": "スティック",
        "glass": "スティック",
        "glass_pane": "スティック",
        "white_stained_glass": "スティック",
        "white_stained_glass_pane": "スティック",
        "orange_stained_glass": "スティック",
        "orange_stained_glass_pane": "スティック",
        "magenta_stained_glass": "スティック",
        "magenta_stained_glass_pane": "スティック",
        "light_blue_stained_glass": "スティック",
        "light_blue_stained_glass_pane": "スティック",
        "yellow_stained_glass": "スティック",
        "yellow_stained_glass_pane": "スティック",
        "lime_stained_glass": "スティック",
        "lime_stained_glass_pane": "スティック",
        "pink_stained_glass": "スティック",
        "pink_stained_glass_pane": "スティック",
        "gray_stained_glass": "スティック",
        "gray_stained_glass_pane": "スティック",
        "light_gray_stained_glass": "スティック",
        "light_gray_stained_glass_pane": "スティック",
        "cyan_stained_glass": "スティック",
        "cyan_stained_glass_pane": "スティック",
        "purple_stained_glass": "スティック",
        "purple_stained_glass_pane": "スティック",
        "blue_stained_glass": "スティック",
        "blue_stained_glass_pane": "スティック",
        "brown_stained_glass": "スティック",
        "brown_stained_glass_pane": "スティック",
        "green_stained_glass": "スティック",
        "green_stained_glass_pane": "スティック",
        "red_stained_glass": "スティック",
        "red_stained_glass_pane": "スティック",
        "black_stained_glass": "スティック",
        "black_stained_glass_pane": "スティック",

        "stone": "バスドラム",
        "blackstone": "バスドラム",
        "netherrack": "バスドラム",
        "crimson_nylium": "バスドラム",
        "warped_nylium": "バスドラム",
        "obsidian": "バスドラム",
        "quartz_block": "バスドラム",
        "quartz_bricks": "バスドラム",
        "quartz_ore": "バスドラム",
        "sandstone": "バスドラム",
        "sandstone_stairs": "バスドラム",
        "smooth_sandstone_stairs": "バスドラム",
        "red_sandstone": "バスドラム",
        "red_sandstone_stairs": "バスドラム",
        "smooth_red_sandstone_stairs": "バスドラム",
        "diamond_ore": "バスドラム",
        "iron_ore": "バスドラム",
        "gold_ore": "バスドラム",
        "coal_ore": "バスドラム",
        "copper_ore": "バスドラム",
        "lapis_ore": "バスドラム",
        "emerald_ore": "バスドラム",
        "redstone_ore": "バスドラム",
        "deepslate_diamond_ore": "バスドラム",
        "deepslate_iron_ore": "バスドラム",
        "deepslate_gold_ore": "バスドラム",
        "deepslate_coal_ore": "バスドラム",
        "deepslate_copper_ore": "バスドラム",
        "deepslate_lapis_ore": "バスドラム",
        "deepslate_emerald_ore": "バスドラム",
        "deepslate_redstone_ore": "バスドラム",
        "nether_gold_ore": "バスドラム",
        "brick_block": "バスドラム",
        "brick_block_stairs": "バスドラム",
        "chiseled_nether_bricks": "バスドラム",
        "cracked_deepslate_bricks": "バスドラム",
        "cracked_nether_bricks": "バスドラム",
        "cracked_polished_blackstone_bricks": "バスドラム",
        "deepslate_brick_slab": "バスドラム",
        "deepslate_brick_stairs": "バスドラム",
        "deepslate_brick_wall": "バスドラム",
        "deepslate_bricks": "バスドラム",
        "end_bricks_stairs": "バスドラム",
        "end_bricks": "バスドラム",
        "mossy_stone_brick_stairs": "バスドラム",
        "mud_brick_slab": "バスドラム",
        "mud_brick_stairs": "バスドラム",
        "mud_brick_wall": "バスドラム",
        "mud_bricks": "バスドラム",
        "nether_brick": "バスドラム",
        "nether_brick_fence": "バスドラム",
        "nether_brick_stairs": "バスドラム",
        "polished_blackstone_brick_slab": "バスドラム",
        "polished_blackstone_brick_stairs": "バスドラム",
        "polished_blackstone_brick_wall": "バスドラム",
        "polished_blackstone_bricks": "バスドラム",
        "prismarine_bricks_stairs": "バスドラム",
        "prismarine": "バスドラム",
        "prismarine_stairs": "バスドラム",
        "dark_prismarine_stairs": "バスドラム",
        "red_nether_brick": "バスドラム",
        "red_nether_brick_stairs": "バスドラム",
        "stone_brick_stairs": "バスドラム",
        "stone_brick": "バスドラム",
        "tube_coral": "バスドラム",
        "brain_coral": "バスドラム",
        "bubble_coral": "バスドラム",
        "fire_coral": "バスドラム",
        "horn_coral": "バスドラム",
        "dead_tube_coral": "バスドラム",
        "dead_brain_coral": "バスドラム",
        "dead_bubble_coral": "バスドラム",
        "dead_fire_coral": "バスドラム",
        "dead_horn_coral": "バスドラム",
        "coral_block": "バスドラム",
        "respawn_anchor": "バスドラム",
        "bedrock": "バスドラム",
        "observer": "バスドラム",
        "monster_spawner": "バスドラム",
        "white_concrete": "バスドラム",
        "orange_concrete": "バスドラム",
        "magenta_concrete": "バスドラム",
        "light_blue_concrete": "バスドラム",
        "yellow_concrete": "バスドラム",
        "lime_concrete": "バスドラム",
        "pink_concrete": "バスドラム",
        "gray_concrete": "バスドラム",
        "light_gray_concrete": "バスドラム",
        "cyan_concrete": "バスドラム",
        "purple_concrete": "バスドラム",
        "blue_concrete": "バスドラム",
        "brown_concrete": "バスドラム",
        "green_concrete": "バスドラム",
        "red_concrete": "バスドラム",
        "black_concrete": "バスドラム",

        "gold_block": "ベル(グロッケンシュピール)",

        "clay": "フルート",
        "honeycomb_block": "フルート",
        "monster_egg": "フルート",

        "packed_ice": "チャイム",

        "black_wool": "ギター",
        "blue_wool": "ギター",
        "brown_wool": "ギター",
        "cyan_wool": "ギター",
        "gray_wool": "ギター",
        "green_wool": "ギター",
        "light_blue_wool": "ギター",
        "light_gray_wool": "ギター",
        "lime_wool": "ギター",
        "magenta_wool": "ギター",
        "orange_wool": "ギター",
        "pink_wool": "ギター",
        "purple_wool": "ギター",
        "red_wool": "ギター",
        "white_wool": "ギター",
        "yellow_wool": "ギター",

        "bone_block": "木琴",

        "iron_block": "鉄琴",

        "soul_sand": "カウベル",

        "pumpkin": "ディジュリドゥ",
        "carved_pumpkin": "ディジュリドゥ",

        "emerald_block": "電子音",

        "hay_block": "バンジョー",

        "glow_stone": "電子ピアノ",
    },

    english: {
        "sand": "Snare Drum",
        "gravel": "Snare Drum",
        "sand": "Snare Drum",
        "red_concrete_powder": "Snare Drum",
        "black_concrete_powder": "Snare Drum",
        "green_concrete_powder": "Snare Drum",
        "brown_concrete_powder": "Snare Drum",
        "blue_concrete_powder": "Snare Drum",
        "purple_concrete_powder": "Snare Drum",
        "cyan_concrete_powder": "Snare Drum",
        "light_gray_concrete_powder": "Snare Drum",
        "gray_concrete_powder": "Snare Drum",
        "pink_concrete_powder": "Snare Drum",
        "lime_concrete_powder": "Snare Drum",
        "yellow_concrete_powder": "Snare Drum",
        "light_blue_concrete_powder": "Snare Drum",
        "magenta_concrete_powder": "Snare Drum",
        "orange_concrete_powder": "Snare Drum",
        "white_concrete_powder": "Snare Drum",

        "sea_lantern": "Clicks and Sticks",
        "beacon": "Clicks and Sticks",
        "glass": "Clicks and Sticks",
        "glass_pane": "Clicks and Sticks",
        "white_stained_glass": "Clicks and Sticks",
        "white_stained_glass_pane": "Clicks and Sticks",
        "orange_stained_glass": "Clicks and Sticks",
        "orange_stained_glass_pane": "Clicks and Sticks",
        "magenta_stained_glass": "Clicks and Sticks",
        "magenta_stained_glass_pane": "Clicks and Sticks",
        "light_blue_stained_glass": "Clicks and Sticks",
        "light_blue_stained_glass_pane": "Clicks and Sticks",
        "yellow_stained_glass": "Clicks and Sticks",
        "yellow_stained_glass_pane": "Clicks and Sticks",
        "lime_stained_glass": "Clicks and Sticks",
        "lime_stained_glass_pane": "Clicks and Sticks",
        "pink_stained_glass": "Clicks and Sticks",
        "pink_stained_glass_pane": "Clicks and Sticks",
        "gray_stained_glass": "Clicks and Sticks",
        "gray_stained_glass_pane": "Clicks and Sticks",
        "light_gray_stained_glass": "Clicks and Sticks",
        "light_gray_stained_glass_pane": "Clicks and Sticks",
        "cyan_stained_glass": "Clicks and Sticks",
        "cyan_stained_glass_pane": "Clicks and Sticks",
        "purple_stained_glass": "Clicks and Sticks",
        "purple_stained_glass_pane": "Clicks and Sticks",
        "blue_stained_glass": "Clicks and Sticks",
        "blue_stained_glass_pane": "Clicks and Sticks",
        "brown_stained_glass": "Clicks and Sticks",
        "brown_stained_glass_pane": "Clicks and Sticks",
        "green_stained_glass": "Clicks and Sticks",
        "green_stained_glass_pane": "Clicks and Sticks",
        "red_stained_glass": "Clicks and Sticks",
        "red_stained_glass_pane": "Clicks and Sticks",
        "black_stained_glass": "Clicks and Sticks",
        "black_stained_glass_pane": "Clicks and Sticks",

        "stone": "Bass Drum",
        "blackstone": "Bass Drum",
        "netherrack": "Bass Drum",
        "crimson_nylium": "Bass Drum",
        "warped_nylium": "Bass Drum",
        "obsidian": "Bass Drum",
        "quartz_block": "Bass Drum",
        "quartz_bricks": "Bass Drum",
        "quartz_ore": "Bass Drum",
        "sandstone": "Bass Drum",
        "sandstone_stairs": "Bass Drum",
        "smooth_sandstone_stairs": "Bass Drum",
        "red_sandstone": "Bass Drum",
        "red_sandstone_stairs": "Bass Drum",
        "smooth_red_sandstone_stairs": "Bass Drum",
        "diamond_ore": "Bass Drum",
        "iron_ore": "Bass Drum",
        "gold_ore": "Bass Drum",
        "coal_ore": "Bass Drum",
        "copper_ore": "Bass Drum",
        "lapis_ore": "Bass Drum",
        "emerald_ore": "Bass Drum",
        "redstone_ore": "Bass Drum",
        "deepslate_diamond_ore": "Bass Drum",
        "deepslate_iron_ore": "Bass Drum",
        "deepslate_gold_ore": "Bass Drum",
        "deepslate_coal_ore": "Bass Drum",
        "deepslate_copper_ore": "Bass Drum",
        "deepslate_lapis_ore": "Bass Drum",
        "deepslate_emerald_ore": "Bass Drum",
        "deepslate_redstone_ore": "Bass Drum",
        "nether_gold_ore": "Bass Drum",
        "brick_block": "Bass Drum",
        "brick_block_stairs": "Bass Drum",
        "chiseled_nether_bricks": "Bass Drum",
        "cracked_deepslate_bricks": "Bass Drum",
        "cracked_nether_bricks": "Bass Drum",
        "cracked_polished_blackstone_bricks": "Bass Drum",
        "deepslate_brick_slab": "Bass Drum",
        "deepslate_brick_stairs": "Bass Drum",
        "deepslate_brick_wall": "Bass Drum",
        "deepslate_bricks": "Bass Drum",
        "end_bricks_stairs": "Bass Drum",
        "end_bricks": "Bass Drum",
        "mossy_stone_brick_stairs": "Bass Drum",
        "mud_brick_slab": "Bass Drum",
        "mud_brick_stairs": "Bass Drum",
        "mud_brick_wall": "Bass Drum",
        "mud_bricks": "Bass Drum",
        "nether_brick": "Bass Drum",
        "nether_brick_fence": "Bass Drum",
        "nether_brick_stairs": "Bass Drum",
        "polished_blackstone_brick_slab": "Bass Drum",
        "polished_blackstone_brick_stairs": "Bass Drum",
        "polished_blackstone_brick_wall": "Bass Drum",
        "polished_blackstone_bricks": "Bass Drum",
        "prismarine_bricks_stairs": "Bass Drum",
        "prismarine": "Bass Drum",
        "prismarine_stairs": "Bass Drum",
        "dark_prismarine_stairs": "Bass Drum",
        "red_nether_brick": "Bass Drum",
        "red_nether_brick_stairs": "Bass Drum",
        "stone_brick_stairs": "Bass Drum",
        "stone_brick": "Bass Drum",
        "tube_coral": "Bass Drum",
        "brain_coral": "Bass Drum",
        "bubble_coral": "Bass Drum",
        "fire_coral": "Bass Drum",
        "horn_coral": "Bass Drum",
        "dead_tube_coral": "Bass Drum",
        "dead_brain_coral": "Bass Drum",
        "dead_bubble_coral": "Bass Drum",
        "dead_fire_coral": "Bass Drum",
        "dead_horn_coral": "Bass Drum",
        "coral_block": "Bass Drum",
        "respawn_anchor": "Bass Drum",
        "bedrock": "Bass Drum",
        "observer": "Bass Drum",
        "monster_spawner": "Bass Drum",
        "white_concrete": "Bass Drum",
        "orange_concrete": "Bass Drum",
        "magenta_concrete": "Bass Drum",
        "light_blue_concrete": "Bass Drum",
        "yellow_concrete": "Bass Drum",
        "lime_concrete": "Bass Drum",
        "pink_concrete": "Bass Drum",
        "gray_concrete": "Bass Drum",
        "light_gray_concrete": "Bass Drum",
        "cyan_concrete": "Bass Drum",
        "purple_concrete": "Bass Drum",
        "blue_concrete": "Bass Drum",
        "brown_concrete": "Bass Drum",
        "green_concrete": "Bass Drum",
        "red_concrete": "Bass Drum",
        "black_concrete": "Bass Drum",

        "gold_block": "Bells",

        "clay": "Flute",
        "honeycomb_block": "Flute",
        "monster_egg": "Flute",

        "packed_ice": "Chimes",

        "black_wool": "Guitar",
        "blue_wool": "Guitar",
        "brown_wool": "Guitar",
        "cyan_wool": "Guitar",
        "gray_wool": "Guitar",
        "green_wool": "Guitar",
        "light_blue_wool": "Guitar",
        "light_gray_wool": "Guitar",
        "lime_wool": "Guitar",
        "magenta_wool": "Guitar",
        "orange_wool": "Guitar",
        "pink_wool": "Guitar",
        "purple_wool": "Guitar",
        "red_wool": "Guitar",
        "white_wool": "Guitar",
        "yellow_wool": "Guitar",

        "bone_block": "Xylophone",

        "iron_block": "Iron Xylophone",

        "soul_sand": "Cow Bell",

        "pumpkin": "Didgeridoo",
        "carved_pumpkin": "Didgeridoo",

        "emerald_block": "Bit",

        "hay_block": "Banjo",

        "glow_stone": "Pling",
    }

}

world.beforeEvents.itemUseOn.subscribe(e => {
    const { source, itemStack, block } = e;
    if (source.isSneaking) {
        e.cancel = true;
    }
    if (itemStack.typeId == "note:note_stick" && block.typeId == "minecraft:noteblock") {
        const blocklocation = block.location;
        system.run(() => {
            overworld.runCommandAsync(`structure load __noteblocks ${blocklocation.x} 319 ${blocklocation.z}`);
            system.run(() => {
                const chestInv = overworld.getBlock({ x: blocklocation.x, y: 319, z: blocklocation.z }).getComponent("minecraft:inventory").container;
                chestInv.addItem(block.getItemStack(1, true));
                for (let i = 0; i < chestInv.size; i++) {
                    const item = chestInv.getSlot(i);
                    if (1 < item.amount) {
                        let instrument;
                        if (source.getDynamicProperty("show_instrument")) { //音の種類を取得
                            const block = overworld.getBlock({ x: blocklocation.x, y: blocklocation.y - 1, z: blocklocation.z });
                            instrument = instruments[source.getDynamicProperty("language") === 0 ? "english" : "japanese"][block.typeId.replace("minecraft:", "")];
                            if (instrument == undefined) {
                                instrument = source.getDynamicProperty("language") === 0 ? "piano" : "ピアノ";
                            }
                        }
                        if (source.getDynamicProperty("language") == 0) { //言語を分ける
                            if (source.getDynamicProperty("scale_notation") == 1) { //形式が国際式か
                                source.onScreenDisplay.setActionBar(`scale: ${scales.international[i]} ${source.getDynamicProperty("show_click_count") ? `click: ${i}` : ""} ${source.getDynamicProperty("show_instrument") ? " instrument: " + instrument : ""}`);
                            } else {
                                source.onScreenDisplay.setActionBar(`scale: ${scales.solfege.english[i]} ${source.getDynamicProperty("show_click_count") ? `click: ${i}` : ""}`);
                            }
                        } else {
                            if (source.getDynamicProperty("scale_notation") == 1) {
                                source.onScreenDisplay.setActionBar(`音階: ${scales.solfege.japanese[i]} ${source.getDynamicProperty("show_click_count") ? `クリック: ${i}` : ""} ${source.getDynamicProperty("show_instrument") ? " 楽器: " + instrument : ""}`);
                            } else {
                                source.onScreenDisplay.setActionBar(`音階: ${scales.international[i]} ${source.getDynamicProperty("show_click_count") ? `クリック: ${i}` : ""}`);
                            }
                        }
                        break;
                    }
                }
                overworld.runCommandAsync(`setblock ${blocklocation.x} 319 ${blocklocation.z} air`);
            })
        })
    }
})

system.afterEvents.scriptEventReceive.subscribe(e => {
    const { id, sourceEntity } = e;
    if (id == "note:config") {
        if (sourceEntity.getDynamicProperty("language") == 1) {
            new ModalFormData()
                .title("設定")
                .dropdown("\n言語", ["English", "日本語"], sourceEntity.getDynamicProperty("language"))
                .dropdown("音階の表示形式", ["イタリア式(ドレミ)", "国際式(C,C#,D)"], sourceEntity.getDynamicProperty("scale_notation"))
                .toggle("楽器を表示する", sourceEntity.getDynamicProperty("show_instrument"))
                .toggle("クリック数を表示する", sourceEntity.getDynamicProperty("show_click_count"))
                .toggle("デフォルトに戻す")
                .submitButton("変更を適用")
                .show(sourceEntity).then(res => {
                    if (res.canceled) return;
                    if (res.formValues[4]) {
                        //デフォルトに戻す
                        sourceEntity.setDynamicProperty("scale_notation", DefaultConfig.scale_notation);
                        sourceEntity.setDynamicProperty("show_instrument", DefaultConfig.show_instrument);
                        sourceEntity.setDynamicProperty("show_click_count", DefaultConfig.show_click_count);
                    } else {
                        //設定の変更
                        sourceEntity.setDynamicProperty("language", res.formValues[0]);
                        sourceEntity.setDynamicProperty("scale_notation", res.formValues[1])
                        sourceEntity.setDynamicProperty("show_instrument", res.formValues[2])
                        sourceEntity.setDynamicProperty("show_click_count", res.formValues[3])
                    }
                })
        } else {
            new ModalFormData()
                .title("Settings")
                .dropdown("\nLanguage", ["English", "日本語"], sourceEntity.getDynamicProperty("language"))
                .dropdown("scale notation", ["solfege(do,re,mi)", "international(C,C#,D)"], sourceEntity.getDynamicProperty("scale_notation"))
                .toggle("Show instruments", sourceEntity.getDynamicProperty("show_instrument"))
                .toggle("Show number of clicks", sourceEntity.getDynamicProperty("show_click_count"))
                .toggle("Restore settings")
                .submitButton("Apply")
                .show(sourceEntity).then(res => {
                    if (res.canceled) return;
                    if (res.formValues[4]) {
                        //デフォルトに戻す
                        sourceEntity.setDynamicProperty("scale_notation", DefaultConfig.scale_notation);
                        sourceEntity.setDynamicProperty("show_instrument", DefaultConfig.show_instrument);
                        sourceEntity.setDynamicProperty("show_click_count", DefaultConfig.show_click_count);
                    } else {
                        //設定の変更
                        sourceEntity.setDynamicProperty("language", res.formValues[0]);
                        sourceEntity.setDynamicProperty("scale_notation", res.formValues[1])
                        sourceEntity.setDynamicProperty("show_instrument", res.formValues[2])
                        sourceEntity.setDynamicProperty("show_click_count", res.formValues[3])
                    }
                    sourceEntity.sendMessage("§e" + (sourceEntity.getDynamicProperty("language") == 0 ? "The settings have been changed." : "設定を変更しました。"));
                })
        }
    }
})