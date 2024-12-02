import { BlockTypes, BlockVolume, Player, system, world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

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
        en: [
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
        ja: [
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

const instrumentsTranslateKey = {
    ja: {
        "piano": "ピアノ",
        "bass": "バス",
        "bass_drum": "バスドラム",
        "cow_bell": "カウベル",
        "clicks_and_sticks": "スティック",
        "flute": "フルート",
        "pling_piano": "電子ピアノ",
        "snare_drum": "スネアドラム",
        "bells": "ベル",
        "chimes": "チャイム",
        "guitar": "ギター",
        "xylophone": "木琴",
        "iron_xylophone": "鉄琴",
        "didgeridoo": "ディジュリドゥ",
        "bit": "電子音",
        "banjo": "バンジョー"
    },
    en: {
        "piano": "Piano",
        "bass": "Bass",
        "bass_drum": "Bass Drum",
        "cow_bell": "Cow Bell",
        "clicks_and_sticks": "Clicks and Sticks",
        "flute": "Flute",
        "pling_piano": "Pling Piano",
        "snare_drum": "Snare",
        "bells": "Bells",
        "chimes": "Chimes",
        "guitar": "Guitar",
        "xylophone": "Xylophone",
        "iron_xylophone": "Iron Xylophone",
        "didgeridoo": "Didgeridoo",
        "bit": "Bit",
        "banjo": "Banjo"
    }
}

const instruments = {
    "lit_pumpkin": "piano", //上書き回避用
    "carved_pumpkin": "piano", //上書き回避用
    "redstone_block": "piano", //上書き回避用
    "_leaves": "piano", //葉系
    "noteblock": "bass",
    "bookshelf": "bass",
    "creaking_heart": "bass", //クリーキングの心臓
    "pale_oak": "bass", //ペールオーク系
    "oak": "bass", //オークの木材系
    "spruce": "bass", //トウヒ系
    "birch": "bass", //樺系
    "jungle": "bass", //ジャングル系
    "acacia": "bass", //アカシア系
    "dark_oak": "bass", //ダークオーク系
    "cherry": "bass", //桜系
    "bamboo": "bass", //竹系
    "crimson": "bass", //クリムゾン系
    "warped": "bass", //歪んだ系
    "mangrove": "bass", //マングローブ系
    "chest": "bass", //チェスト系
    "crafting_table": "bass",
    "jukebox": "bass",
    "mushroom": "bass", //キノコ系
    "banner": "bass", //旗系
    "daylight_detector": "bass",
    "loom": "bass",
    "barrel": "bass",
    "cartography_table": "bass",
    "lectern": "bass",
    "smithing_table": "bass",
    "fletching_table": "bass",
    "campfire": "bass", //焚き火系
    "composter": "bass",
    "bee_nest": "bass",
    "beehive": "bass",
    "amethyst_block": "bass_drum", //アメジスト系
    "soul_sand": "cow_bell",
    "glass": "clicks_and_sticks", //ガラス系
    "sea_lantern": "clicks_and_sticks",
    "beacon": "clicks_and_sticks",
    "infested_": "flute", //虫食いブロック系
    "glowstone": "pling_piano",
    "end_portal_frame": "bass_drum",
    "stone": "bass_drum", //石系
    "andesite": "bass_drum", //安山岩系
    "granite": "bass_drum", //花崗岩系
    "diorite": "bass_drum", //閃緑岩系
    "basalt": "bass_drum", //玄武岩系
    "calcite": "bass_drum",
    "purpur": "bass_drum", //プルプァ系
    "terracotta": "bass_drum", //色付き、彩釉テラコッタ系
    "quartz": "bass_drum", //クォーツブロック系
    "tuff": "bass_drum", //凝灰岩系
    "blackstone": "bass_drum", //ブラックストーン系
    "netherrack": "bass_drum",
    "nylium": "bass_drum", //ナイリウム系
    "obsidian": "bass_drum", //黒曜石系
    "sandstone": "bass_drum", //砂岩系
    "_ore": "bass_drum", //鉱石系
    "deepslate": "bass_drum", //深層岩系
    "hardened_clay": "bass_drum", //通常のテラコッタ
    "clay": "flute", //粘土
    "raw_": "bass_drum", //原石ブロック系
    "brick": "bass_drum", //レンガ系
    "prismarine": "bass_drum", //プリズマリン系
    "coral": "bass_drum", //サンゴ系
    "respawn_anchor": "bass_drum",
    "bedrock": "bass_drum",
    "observer": "bass_drum",
    "monster_spawner": "bass_drum",
    "concrete_powder": "snare_drum", //コンクリートパウダー系 上書き回避のため、コンクリートより優先度を上げる
    "concrete": "bass_drum", //コンクリート系
    "gold_block": "bells",
    "honeycomb_block": "flute",
    "monster_egg": "flute",
    "infested": "flute",
    "resin": "flute", //レジン系
    "packed_ice": "chimes",
    "wool": "guitar",
    "bone_block": "xylophone",
    "iron_block": "iron_xylophone",
    "pumpkin": "didgeridoo",
    "emerald_block": "bit",
    "hay_block": "banjo",
    "sand": "snare_drum", //砂、赤砂、怪しげな砂
    "gravel": "snare_drum" //砂利、怪しげな砂利
}

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
                    resultMsg += scales.international[clickCount];
                } else {
                    resultMsg += scales.solfege[lang == ENGLISH ? "en" : "ja"][clickCount];
                }

                //クリック数
                if (isDisplayClick) {
                    resultMsg += " click: " + clickCount;
                }
                //楽器を表示
                if (isDisplayInstrument) {
                    let instrument;
                    const underblock = block.below(1); //1ブロック下のブロックを取得
                    const keys = Object.keys(instruments)
                    for (const key of keys) {
                        if (underblock.typeId.includes(key)) {
                            instrument = instrumentsTranslateKey[lang == ENGLISH ? "en" : "ja"][instruments[key]];
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
                .toggle("Display instruments", sourceEntity.getDynamicProperty("is_display_instrument"))
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
            sourceEntity.sendMessage("§eNoteBlock+のバージョンは 2.0.3 です。");
        } else {
            sourceEntity.sendMessage("§eNoteBlock+ is at version 2.0.3.");
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
