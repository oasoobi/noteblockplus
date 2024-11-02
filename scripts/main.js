import { BlockVolume, Player, system, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

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
        "lit_pumpkin": "ピアノ", //上書き回避用
        "carved_pumpkin": "ピアノ", //上書き回避用
        "redstone_block": "ピアノ", //上書き回避用
        "_leaves": "ピアノ", //葉系
        "note_block": "バス",
        "bookshelf": "バス",
        "oak": "バス", //オークの木材系
        "spruce": "バス", //トウヒ系
        "birch": "バス", //樺系
        "jungle": "バス", //ジャングル系
        "acacia": "バス", //アカシア系
        "dark_oak": "バス", //ダークオーク系
        "cherry": "バス", //桜系
        "bamboo": "バス", //竹系
        "crimson": "バス", //クリムゾン系
        "warped": "バス", //歪んだ系
        "mangrove": "バス", //マングローブ系
        "chest": "バス", //チェスト系
        "crafting_table": "バス",
        "jukebox": "バス",
        "mushroom": "バス", //キノコ系
        "banner": "バス", //旗系
        "daylight_detector": "バス",
        "loom": "バス",
        "barrel": "バス",
        "cartography_table": "バス",
        "lectern": "バス",
        "smithing_table": "バス",
        "fletching_table": "バス",
        "campfire": "バス", //焚き火系
        "composter": "バス",
        "bee_nest": "バス",
        "beehive": "バス",
        "amethyst_block": "バスドラム", //アメジスト系
        "soul_sand": "カウベル",
        "glass": "スティック", //ガラス系
        "sea_lantern": "スティック",
        "beacon": "スティック",
        "infested_": "フルート", //虫食いブロック系
        "glowstone": "電子ピアノ",
        "stone": "バスドラム", //石系
        "andesite": "バスドラム", //安山岩系
        "granite": "バスドラム", //花崗岩系
        "diorite": "バスドラム", //閃緑岩系
        "basalt": "バスドラム", //玄武岩系
        "calcite": "バスドラム",
        "purpur": "バスドラム", //プルプァ系
        "terracotta": "バスドラム", //色付き、彩釉テラコッタ系
        "quartz": "バスドラム", //クォーツブロック系
        "tuff": "バスドラム", //凝灰岩系
        "blackstone": "バスドラム", //ブラックストーン系
        "netherrack": "バスドラム",
        "nylium": "バスドラム", //ナイリウム系
        "obsidian": "バスドラム", //黒曜石系
        "sandstone": "バスドラム", //砂岩系
        "_ore": "バスドラム", //鉱石系
        "deepslate": "バスドラム", //深層岩系
        "clay": "バスドラム",
        "raw_": "バスドラム", //原石ブロック系
        "brick": "バスドラム", //レンガ系
        "prismarine": "バスドラム", //プリズマリン系
        "coral": "バスドラム", //サンゴ系
        "respawn_anchor": "バスドラム",
        "bedrock": "バスドラム",
        "observer": "バスドラム",
        "monster_spawner": "バスドラム",
        "concrete_powder": "スネアドラム", //コンクリートパウダー系 powderの優先度を上げる
        "concrete": "バスドラム", //コンクリート系
        "gold_block": "ベル(グロッケンシュピール)",
        "honeycomb_block": "フルート",
        "monster_egg": "フルート",
        "infested": "フルート",
        "packed_ice": "チャイム",
        "wool": "ギター",
        "bone_block": "木琴",
        "iron_block": "鉄琴",
        "pumpkin": "ディジュリドゥ",
        "emerald_block": "電子音",
        "hay_block": "バンジョー",
        "sand": "スネアドラム", //砂、赤砂、怪しげな砂
        "gravel": "スネアドラム", //砂利、怪しげな砂利
    },

    english: {
        "lit_pumpkin": "Piano",
        "carved_pumpkin": "Piano",
        "redstone_block": "Piano",
        "_leaves": "Piano",
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
        "amethyst_block": "Bass Drum",
        "soul_sand": "Cow Bell",
        "glass": "Clicks and Sticks",
        "sea_lantern": "Clicks and Sticks",
        "beacon": "Clicks and Sticks",
        "infested_": "Flute",
        "glowstone": "Pling Piano",
        "stone": "Bass Drum",
        "andesite": "Bass Drum",
        "granite": "Bass Drum",
        "diorite": "Bass Drum",
        "basalt": "Bass Drum",
        "calcite": "Bass Drum",
        "purpur": "Bass Drum",
        "terracotta": "Bass Drum",
        "quartz": "Bass Drum",
        "tuff": "Bass Drum",
        "blackstone": "Bass Drum",
        "netherrack": "Bass Drum",
        "nylium": "Bass Drum",
        "obsidian": "Bass Drum",
        "sandstone": "Bass Drum",
        "_ore": "Bass Drum",
        "deepslate": "Bass Drum",
        "clay": "Bass Drum",
        "raw_": "Bass Drum",
        "brick": "Bass Drum",
        "prismarine": "Bass Drum",
        "coral": "Bass Drum",
        "respawn_anchor": "Bass Drum",
        "bedrock": "Bass Drum",
        "observer": "Bass Drum",
        "monster_spawner": "Bass Drum",
        "concrete_powder": "Snare Drum",
        "concrete": "Bass Drum",
        "gold_block": "Bells",
        "honeycomb_block": "Flute",
        "monster_egg": "Flute",
        "infested": "Flute",
        "packed_ice": "Chimes",
        "wool": "Guitar",
        "bone_block": "Xylophone",
        "iron_block": "Iron Xylophone",
        "pumpkin": "Didgeridoo",
        "emerald_block": "Bit",
        "hay_block": "Banjo",
        "sand": "Snare Drum",
        "gravel": "Snare Drum"
    }
}


world.beforeEvents.itemUseOn.subscribe(e => {
    const { source, itemStack, block } = e;
    const lang = source.getDynamicProperty("language");
    const ENGLISH = 0;
    const INTERNATIONAL = 1;
    const scaleNotation = source.getDynamicProperty("scale_notation");
    const showClick = source.getDynamicProperty("show_click_count");
    const showInstrument = source.getDynamicProperty("show_instrument");
    const noteStick = "note:note_stick";
    const noteBlock = "minecraft:noteblock";
    if (!(itemStack.typeId == noteStick && block.typeId == noteBlock)) return;
    if (source.isSneaking) {
        e.cancel = true;
    }
    const permutation = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).permutation;
    block.dimension.runCommandAsync(`structure load __noteblocks ${block.location.x} ${block.dimension.heightRange.max - 1} ${block.location.z}`);
    system.run(() => {
        const chestInv = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }).getComponent("minecraft:inventory").container;
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
                    const underblock = source.dimension.getBlock({ x: block.location.x, y: block.location.y - 1, z: block.location.z });
                    const keys = Object.keys(instruments?.[lang == ENGLISH ? "english" : "japanese"])
                    for (const key of keys) {
                        if (underblock.typeId.includes(key)) {
                            instrument = instruments?.[lang == ENGLISH ? "english" : "japanese"][key];
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
                .toggle("楽器を表示する", sourceEntity.getDynamicProperty("show_instrument"))
                .toggle("クリック数を表示する", sourceEntity.getDynamicProperty("show_click_count"))
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
                        sourceEntity.setDynamicProperty("show_instrument", res.formValues[2])
                        sourceEntity.setDynamicProperty("show_click_count", res.formValues[3])
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
                .dropdown("scale notation", ["solfege(do,re,mi)", "international(C,C#,D)"], sourceEntity.getDynamicProperty("scale_notation"))
                .toggle("Show instruments", sourceEntity.getDynamicProperty("show_instrument"))
                .toggle("Show number of clicks", sourceEntity.getDynamicProperty("show_click_count"))
                .toggle("Restore settings")
                .submitButton("Apply")
                .show(sourceEntity).then(res => {
                    if (res.canceled) return;
                    if (res.formValues[4]) {
                        initializeConfig(sourceEntity);
                    } else {
                        sourceEntity.setDynamicProperty("language", res.formValues[0]);
                        sourceEntity.setDynamicProperty("scale_notation", res.formValues[1])
                        sourceEntity.setDynamicProperty("show_instrument", res.formValues[2])
                        sourceEntity.setDynamicProperty("show_click_count", res.formValues[3])
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

    }
})

/**
 * 
 * @param {Player} player 
 */
function initializeConfig(player) {
    player.setDynamicProperty("scale_notation", DefaultConfig.scale_notation);
    player.setDynamicProperty("show_instrument", DefaultConfig.show_instrument);
    player.setDynamicProperty("show_click_count", DefaultConfig.show_click_count);    
}