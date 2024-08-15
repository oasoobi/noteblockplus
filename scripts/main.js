import { system, world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";

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

const instruments2 = {
    japanese: {

        "note_block": "バス",
        "bookshelf": "バス",
        "oak": "バス",
        "spruce": "バス",
        "birch": "バス",
        "jungle": "バス",
        "acacia": "バス",
        "dark_oak": "バス",
        "cherry": "バス",
        "bamboo": "バス",
        "crimson": "バス",
        "warped": "バス",
        "mangrove": "バス",
        "chest": "バス",
        "crafting_table": "バス",
        "jukebox": "バス",
        "mushroom": "バス",
        "banner": "バス",
        "daylight_detector": "バス",
        "loom": "バス",
        "barrel": "バス",
        "cartography_table": "バス",
        "lectern": "バス",
        "smithing_table": "バス",
        "fletching_table": "バス",
        "campfire": "バス",
        "composter": "バス",
        "bee_nest": "バス",
        "beehive": "バス",


        "concrete_powder": "スネアドラム",
        "sand": "スネアドラム",
        "gravel": "スネアドラム",

        "glass": "スティック",
        "sea_lantern": "スティック",
        "beacon": "スティック",

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
        "infested": "フルート",

        "packed_ice": "チャイム",

        "wool": "ギター",

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
        "note_block": "Bass",
        "bookshelf": "Bass",
        "oak": "Bass",
        "spruce": "Bass",
        "birch": "Bass",
        "jungle": "Bass",
        "acacia": "Bass",
        "dark_oak": "Bass",
        "cherry": "Bass",
        "bamboo": "Bass",
        "crimson": "Bass",
        "warped": "Bass",
        "mangrove": "Bass",
        "chest": "Bass",
        "crafting_table": "Bass",
        "jukebox": "Bass",
        "mushroom": "Bass",
        "banner": "Bass",
        "daylight_detector": "Bass",
        "loom": "Bass",
        "barrel": "Bass",
        "cartography_table": "Bass",
        "lectern": "Bass",
        "smithing_table": "Bass",
        "fletching_table": "Bass",
        "campfire": "Bass",
        "composter": "Bass",
        "bee_nest": "Bass",
        "beehive": "Bass",

        "concrete_powder": "Snare Drum",
        "sand": "Snare Drum",
        "gravel": "Snare Drum",

        "glass": "Clicks and Sticks",
        "sea_lantern": "Clicks and Sticks",
        "beacon": "Clicks and Sticks",

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
        "infested": "Flute",

        "packed_ice": "Chimes",

        "wool": "Guitar",

        "bone_block": "Xylophone",

        "iron_block": "Iron Xylophone",

        "soul_sand": "Cow Bell",

        "pumpkin": "Didgeridoo",
        "carved_pumpkin": "Didgeridoo",

        "emerald_block": "Bit",

        "hay_block": "Banjo",

        "glow_stone": "Pling"
    }

}


world.beforeEvents.itemUseOn.subscribe(e => {
    const { source, itemStack, block } = e;
    const lang = source.getDynamicProperty("language");
    const JAPANESE = 1;
    const ENGLISH = 0;
    const INTERNATIONAL = 1;
    const SOLFEGE = 0;
    const scaleNotation = source.getDynamicProperty("scale_notation");
    const showClick = source.getDynamicProperty("show_click_count");
    const showInstrument = source.getDynamicProperty("show_instrument");
    const noteStick = "note:note_stick";
    const noteBlock = "minecraft:noteblock";
    if (!(itemStack.typeId == noteStick && block.typeId == noteBlock)) return; //すぐに返す
    if (source.isSneaking) {
        e.cancel = true;
    }
    overworld.runCommandAsync(`structure load __noteblocks ${block.location.x} -40 ${block.location.z}`);
    system.run(() => {
        const chestInv = overworld.getBlock({ x: block.location.x, y: -40, z: block.location.z }).getComponent("minecraft:inventory").container;
        chestInv.addItem(block.getItemStack(1, true)); //音ブロックをデータ付きでチェストに追加
        for (let i = 0; i < chestInv.size; i++) {
            const slot = chestInv.getSlot(i);
            if (1 < slot.amount) { //アイテムが二個あるスロットを確認
                const clickCount = i;

                let resultMsg;
                //音階を表示
                resultMsg = lang == ENGLISH ? "scale: " : "音階: ";
                resultMsg += scaleNotation == INTERNATIONAL ? scales.international[clickCount] : scales.solfege[lang == ENGLISH ? "english" : "japanese"][clickCount];
                //クリック回数を表示
                resultMsg += showClick ? lang == ENGLISH ? " click: " + clickCount : " クリック: " + clickCount : "";
                //楽器を表示
                if (showInstrument) {
                    let instrument;
                    const underblock = overworld.getBlock({ x: block.location.x, y: block.location.y - 1, z: block.location.z });
                    const keys = Object.keys(instruments2?.[lang == ENGLISH ? "english" : "japanese"])
                    for (const key of keys) {
                        if (underblock.typeId.includes(key)) {
                            instrument = instruments2?.[lang == ENGLISH ? "english" : "japanese"][key];
                            break;
                        }
                    }
                    if (!instrument) { //楽器が見つからなかったときの処理
                        instrument = lang == ENGLISH ? "piano" : "ピアノ"
                    }
                    resultMsg += lang == ENGLISH ? " instrument: " + instrument : " 楽器: " + instrument;
                }
                source.onScreenDisplay.setActionBar(resultMsg);
                break;
            }
        }
        overworld.runCommandAsync(`setblock ${block.location.x} -40 ${block.location.z} air`);
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
                    sourceEntity.sendMessage("§e設定を変更しました。");
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
                    sourceEntity.sendMessage("§eThe settings have been changed.");
                })
        }
    }
})