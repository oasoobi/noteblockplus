import { Block, BlockComponentTypes, BlockVolume, ItemStack, world } from "@minecraft/server";
import { Instruments } from "./Constants";
import { InstrumentsType } from "../@types";

export default class NoteBlock {
    static getScale(block: Block): number {
        let result = -1;
        if (block.typeId !== "minecraft:noteblock") throw new Error("音ブロックではないブロックです。");
        try {
            const tempBlock = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }) as Block;
            if (!tempBlock) throw new Error("ブロックが見つかりません。");

            const permutation = tempBlock.permutation;

            world.structureManager.place("__noteblocks", block.dimension, tempBlock.location);

            const container = tempBlock.getComponent(BlockComponentTypes.Inventory)?.container;
            if (!container) throw new Error("コンテナにアクセスできませんでした。");
            container.addItem(block.getItemStack(1, true) as ItemStack);

            for (let i: number = 0; i < container.size; i++) {
                const slot = container.getSlot(i);
                if (slot.amount > 1) {
                    result = i;
                    break;
                }
            }
            //fillblocksじゃないとブロックが出てくるので注意!!
            const volume = new BlockVolume(tempBlock.location, tempBlock.location);
            block.dimension.fillBlocks(volume, "minecraft:air");
            tempBlock.setPermutation(permutation);
        } catch (e) {
            throw e;
        }
        return result;
    }

    static getInstrument(block: Block): InstrumentsType {
        const underblock = block.below(1);
        if (!underblock) return "piano";
        const keys = Object.keys(Instruments) as unknown as (keyof typeof Instruments)[];
        for (const key of keys) {
            if (underblock.typeId.includes(key)) {
                return Instruments[key];
            }
        }
        return "piano";
    }
}