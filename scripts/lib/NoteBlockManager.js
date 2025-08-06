import { BlockComponentTypes, BlockVolume, world } from "@minecraft/server";
import { Instruments } from "./Data";
export default class NoteBlock {
    static getScale(block) {
        let result = -1;
        if (block.typeId !== "minecraft:noteblock")
            throw new Error("音ブロックではないブロックです。");
        try {
            const tempBlock = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z });
            if (!tempBlock)
                throw new Error("ブロックが見つかりません。");
            const permutation = tempBlock.permutation;
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
            const volume = new BlockVolume(tempBlock.location, tempBlock.location);
            block.dimension.fillBlocks(volume, "minecraft:air");
            tempBlock.setPermutation(permutation);
        }
        catch (e) {
            throw e;
        }
        return result;
    }
    static getInstrument(block) {
        const underblock = block.below(1); //1ブロック下のブロックを取得
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
