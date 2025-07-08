import { Block, BlockComponentTypes, BlockVolume, ItemStack, system, world } from "@minecraft/server";
import { Instruments } from "./Data";
import { InstrumentsType } from "../@types";

export default class NoteBlock {
    static getScale(block: Block): Promise<number> {
        return new Promise((resolve, reject) => {
            if (block.typeId !== "minecraft:noteblock") return reject("音ブロックではないブロックです。");
            system.run(() => {
                try {
                    const tempBlock = block.dimension.getBlock({ x: block.location.x, y: block.dimension.heightRange.max - 1, z: block.location.z }) as Block;
                    if (!tempBlock) return reject("ブロックが見つかりません");

                    const permutation = tempBlock.permutation;

                    world.structureManager.place("__noteblocks", block.dimension, tempBlock.location);

                    const container = tempBlock.getComponent(BlockComponentTypes.Inventory)?.container;
                    if (!container) return reject("コンテナにアクセスできませんでした。");
                    container.addItem(block.getItemStack(1, true) as ItemStack);
                    for (let i: number = 0; i < container.size; i++) {
                        const slot = container.getSlot(i);
                        if (slot.amount < 2) break;
                        return resolve(i);
                    }
                    const volume = new BlockVolume(tempBlock.location, tempBlock.location);
                    block.dimension.fillBlocks(volume, "minecraft:air");
                    tempBlock.setPermutation(permutation);
                } catch (e) {
                    reject(e);
                }
            })
        })
    }

    static getInstrument(block: Block): InstrumentsType {
        const underblock = block.below(1); //1ブロック下のブロックを取得
        if (!underblock) return "piano";
        const keys = Object.keys(Instruments)
        for (const key of keys) {
            if (underblock.typeId.includes(key)) {
                return Instruments[key];
            }
        }
        return "piano";
    }
}