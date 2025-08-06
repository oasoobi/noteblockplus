import { system, world, CommandPermissionLevel, CustomCommand, CustomCommandParamType, BlockTypes, MolangVariableMap } from "@minecraft/server";
import PlayerDataManager from "./lib/PlayerDataManager";
import { NoteBlockPitches, NoteBlockSounds, InternationalScales, SolfegeScales, VERSION, InstrumentsTranslateKey, colors } from "./lib/Constants";
import NoteBlock from "./lib/NoteBlockManager";
import { Language, ScaleDisplayStyle } from "./@types";
import { commandFunc } from "./commands/index";
import ConfigManager from "./lib/ConfigManager";

system.beforeEvents.startup.subscribe(e => {

    const noteBlockPlusCommand: CustomCommand = {
        name: "ntp:ntp",
        description: "NoteBlock+を管理するコマンド。 / NoteBlockPlus Control Commands.",
        permissionLevel: CommandPermissionLevel.Any,
        mandatoryParameters: [{ type: CustomCommandParamType.Enum, name: "ntp:control" }],
        cheatsRequired: false
    }
    e.customCommandRegistry.registerEnum("ntp:control", ["config", "toggle", "reset", "version"]);
    e.customCommandRegistry.registerCommand(noteBlockPlusCommand, commandFunc);
})

world.afterEvents.playerSpawn.subscribe(e => {
    if (!e.initialSpawn) return;
    new ConfigManager(e.player).init();

    if (world.getAllPlayers().length < 2) e.player.sendMessage(`\n§l§eNoteblock+ v${VERSION} created by oasobi\n§r§p---------------------\nNoteBlockPlus v${VERSION}が正常に読み込まれました。\nこのメッセージが表示されなくなった場合は、以下のリンクにアクセスしてください。\nhttps://go.oasoobi.net/NoteBlockPlus\n\nNoteBlockPlus v${VERSION} has been loaded successfully!\nIf you no longer see this message, please check for updates at https://go.oasoobi.net/NoteBlockPlus.§r`)
})

world.beforeEvents.playerInteractWithBlock.subscribe(e => {
    const { block, player, itemStack } = e;
    if (!e.isFirstEvent) {
        e.cancel = true;
    }

    if (block.typeId !== "minecraft:noteblock" || !player.isSneaking || !PlayerDataManager.getIsEnable(player) || !PlayerDataManager.getConfig(player, "isReverseEnabled") || (itemStack && BlockTypes.get(itemStack?.typeId) !== undefined)) return;
    e.cancel = true;
    system.run(() => {
        const scale = NoteBlock.getScale(block);

        const instrument = NoteBlock.getInstrument(block);
        if (!instrument) return console.error("楽器の取得に失敗しました。");
        const index = typeof scale === 'number' && scale - 1 >= 0 ? scale - 1 : 24;
        const molangVariables = new MolangVariableMap();

        molangVariables.setColorRGB("variable.note_color", colors[index]);

        world.structureManager.place(`${index}`, block.dimension, block.location);
        if (!block.above(1)?.isAir) return;
        player.dimension.playSound(NoteBlockSounds[instrument], block.location, { pitch: NoteBlockPitches[index], volume: 100 });
        player.dimension.spawnParticle("minecraft:note_particle", { x: block.location.x + 0.5, y: block.location.y + 1.2, z: block.location.z + 0.5 }, molangVariables);
    })
})

system.runInterval(() => {

    world.getAllPlayers().filter(player => PlayerDataManager.getIsEnable(player)).forEach(player => {

        const viewRange = (PlayerDataManager.getConfig(player, "distance") as number) + 1;
        const viewBlock = player.getBlockFromViewDirection({ maxDistance: viewRange ?? 10 })?.block;

        if (!viewBlock || viewBlock.typeId !== "minecraft:noteblock") return;
        let actionBarMessage = "";

        const scaleIndex = NoteBlock.getScale(viewBlock);
        const scaleSet = PlayerDataManager.getConfig(player, "scaleDisplayStyle") as ScaleDisplayStyle == "international" ? InternationalScales : SolfegeScales[PlayerDataManager.getLang(player)]
        actionBarMessage += PlayerDataManager.getConfig(player, "language") == "en" ? "scale: " : "音階: "

        actionBarMessage += scaleSet[scaleIndex];

        if (PlayerDataManager.getConfig(player, "isDisplayClickCount")) actionBarMessage += " click: " + scaleIndex;

        const instrument = NoteBlock.getInstrument(viewBlock);
        if (PlayerDataManager.getConfig(player, "isDisplayInstrument")) actionBarMessage += (PlayerDataManager.getConfig(player, "language") == "en" ? " instrument: " : " 楽器: ") + InstrumentsTranslateKey[PlayerDataManager.getConfig(player, "language") as Language][instrument];
        player.onScreenDisplay.setActionBar(actionBarMessage);
    })
}, 1)

