import { InstrumentsTranslateKey } from './utils/Data';
import { system, world } from "@minecraft/server";
import PlayerDataManager from "./utils/PlayerDataManager";
import { NoteBlockPitches, NoteBlockSounds, Scales, VERSION } from "./utils/Data";
import NoteBlock from "./utils";
import { Instruments } from './utils/Data';
world.afterEvents.playerSpawn.subscribe(e => {
    if (!e.initialSpawn)
        return;
    if (world.getAllPlayers().length < 2)
        e.player.sendMessage(`\n§l§eNoteblock+ v${VERSION} created by oasobi\n§r§p---------------------\nNoteBlockPlus v${VERSION}が正常に読み込まれました。\nこのメッセージが表示されなくなった場合は、以下のリンクにアクセスしてください。\nhttps://go.oasoobi.net/NoteBlockPlus\n\nNoteBlockPlus v${VERSION} has been loaded successfully!\nIf you no longer see this message, please check for updates at https://go.oasoobi.net/NoteBlockPlus.§r`);
});
world.beforeEvents.playerInteractWithBlock.subscribe(e => {
    const { block, player } = e;
    if (block.typeId !== "minecraft:noteblock" || !player.isSneaking || !PlayerDataManager.getIsEnable(player) || !PlayerDataManager.getConfig(player, "isReverseEnabled"))
        return;
    e.cancel = true;
    system.run(async () => {
        const scale = await NoteBlock.getScale(block);
        const instrument = NoteBlock.getInstrument(block);
        if (!scale)
            return console.error("音階の取得に失敗しました。");
        if (!instrument)
            return console.error("楽器の取得に失敗しました。");
        world.structureManager.place(`${scale - 1 < 0 ? 24 : scale - 1}`, block.dimension, block.location);
        player.dimension.playSound(NoteBlockSounds[instrument], block.location, { pitch: NoteBlockPitches[scale - 1 < 0 ? 24 : scale - 1], volume: 100 });
    });
});
system.runInterval(async () => {
    world.getAllPlayers().filter(player => PlayerDataManager.getIsEnable(player)).forEach(player => {
        const viewRange = PlayerDataManager.getConfig(player, "distance") + 1;
        const viewBlock = player.getBlockFromViewDirection({ maxDistance: viewRange })?.block;
        if (!viewBlock || viewBlock.typeId !== "minecraft:noteblock")
            return;
        let actionBarMessage = "";
        (async () => {
            //音階のindexを取得して対応するscaleセットを取得
            const scaleIndex = await NoteBlock.getScale(viewBlock);
            const scales = Scales[PlayerDataManager.getConfig(player, "scaleDisplayStyle")];
            actionBarMessage += PlayerDataManager.getConfig(player, "language") == "ja" ? "scale: " : "音階: ";
            //表示スタイルに応じで取得のやり方を変更
            actionBarMessage += PlayerDataManager.getConfig(player, "scaleDisplayStyle") == "international" ? scales[scaleIndex] : scales[PlayerDataManager.getConfig(player, "language")][scaleIndex];
            if (PlayerDataManager.getConfig(player, "isDisplayClickCount"))
                actionBarMessage += " click: " + scaleIndex;
        });
        const instrument = NoteBlock.getInstrument(viewBlock);
        if (PlayerDataManager.getConfig(player, "isDisplayInstrument"))
            actionBarMessage += PlayerDataManager.getConfig(player, "language") == "ja" ? " instrument: " : " 楽器: " + InstrumentsTranslateKey[PlayerDataManager.getConfig(player, "language")][Instruments[instrument]];
        player.onScreenDisplay.setActionBar(actionBarMessage);
    });
}, 1);
