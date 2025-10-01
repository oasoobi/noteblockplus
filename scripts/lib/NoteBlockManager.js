import { BlockComponentTypes, StructureSaveMode, world } from "@minecraft/server";
import { Instruments } from "./Constants";
export default class NoteBlock {
    static getScale(block) {
        const tempId = "ntp:tempblock";
        let result = -1;
        if (block.typeId !== "minecraft:noteblock")
            throw new Error("音ブロックではないブロックです。");
        try {
            const tempBlock = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z });
            world.structureManager.createFromWorld(tempId, block.dimension, { x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }, { x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }, { saveMode: StructureSaveMode.Memory });
            if (!tempBlock)
                throw new Error("ブロックが見つかりません。");
            world.structureManager.place("__noteblocks", block.dimension, tempBlock.location);
            const container = tempBlock.getComponent(BlockComponentTypes.Inventory)?.container;
            if (!container)
                throw new Error("コンテナにアクセスできませんでした。");
            container.addItem(block.getItemStack(1, true));
            for (let i = 0; i < container.size; i++) {
                const slot = container.getSlot(i);
                if (slot.amount > 1) {
                    result = i;
                    break;
                }
            }
            world.structureManager.place(tempId, block.dimension, { x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z });
            world.structureManager.delete(tempId);
        }
        catch (e) {
            throw e;
        }
        return result;
    }
    static getInstrument(block) {
        const underblock = block.below(1);
        if (!underblock)
            return "piano";
        const keys = Object.keys(Instruments);
        for (const key of keys) {
            if (underblock.typeId.includes(key)) {
                return Instruments[key];
            }
        }
        return "piano";
    }
}
